import { useState, useEffect } from "react";
import "./App.css"

function useBookCollection(storageKey) {
  const [books, setBooks] = useState(() => {
    const saved = localStorage.getItem(storageKey);
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem(storageKey, JSON.stringify(books));
  }, [books, storageKey]);

  function add(book) {
    if (!books.some((b) => b.key === book.key)) {
      setBooks([...books, book]);
    }
  }
  function remove(key) {
    setBooks(books.filter((b) => b.key !== key));
  }

  return { books, add, remove }
}

function BookList() {
  const [books, setBooks] = useState([]);
  const [input, setInput] = useState('');
  const [query, setQuery] = useState('');
  const [showSearch, setShowSearch] = useState(false);
  const { books: readingList, add: addBook, remove: removeBook } = useBookCollection("dogear-reading-list");
  const { books: wishlist, add: addToWishList, remove: removeFromWishlist } = useBookCollection("dogear-wishlist");

  useEffect(() => {
    async function fetchBooks() {
      const response = await fetch(
        `https://openlibrary.org/search.json?q=${encodeURIComponent(query)}`
      );
      const json = await response.json();
      setBooks(json.docs ?? []);
    }
    fetchBooks();
  }, [query]);

  return (
    <div>
      <h2> My Reading List</h2>
      <ul>
        {readingList.map((book) => (
          <li key={book.key}>
            {book.title} - {(book.author_name ?? []).join(", ")}
            <button onClick={() => removeBook(book.key)}>Remove</button>
          </li>
        ))}
      </ul>
{/* modal for search engine feature*/}
      <button onClick={() => setShowSearch(true)}>Search books</button>
      {showSearch && (
        <div className="modal-backdrop" onClick={() => setShowSearch(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Search books..."
            />
            <button onClick={() => setQuery(input)}> Search </button>
            <button onClick={() => setShowSearch(false)}>Close</button>
            <ul>
              {books.map((book) => (
                <li key={book.key}>
                  {book.title} - {(book.author_name ?? []).join(", ")}
                  <button onClick={() => addBook(book)}>Add</button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}

function App() {
    return (
      <div>
        <h1>Dogear</h1>
        <BookList />
      </div>
    );
  }


export default App;

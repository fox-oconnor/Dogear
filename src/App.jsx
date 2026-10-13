import { useState, useEffect } from "react";
import "./App.css"

function BookList() {
  const [books, setBooks] = useState([]);
  const [input, setInput] = useState('');
  const [query, setQuery] = useState('');
  const [showSearch, setShowSearch] = useState(false);
  const [readingList, setReadingList] = useState(() => {
    const saved = localStorage.getItem("dogear-reading-list");
    return saved ? JSON.parse(saved) : [];
  });

  function addBook(book) {
    if (!readingList.some((b) => b.key === book.key)) {
      setReadingList([...readingList, book]);
    }
  }

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

  useEffect(() => {
    localStorage.setItem("dogear-reading-list", JSON.stringify(readingList));
  }, [readingList]);

  return (
    <div>
      <h2> My Reading List</h2>
      <ul>
        {readingList.map((book) => (
          <li key={book.key}>
            {book.title}
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
                  {book.title}
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

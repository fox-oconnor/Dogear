import { useState, useEffect } from "react";
import "./index.css"
import "./App.css"
import { circlePlus, heart, circleMinus, circleXmark, book, bookBookmark } from "./icons.js";
import logo from "./logo.png";

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

function ListModal({ title, books, onRemove, onClose }) {
  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <h2>{title}</h2>
        <button className="icon-button" onClick={onClose}>
          <img src={circleXmark} className="icon" alt="close button" />
        </button>
        <ul>
          {books.map((book) => (
            <li key={book.key}>
              {book.title} - {(book.author_name ?? []).join(", ")}
              <button className="icon-button" onClick={() => onRemove(book.key)}>
                <img src={circleMinus} className="icon" alt="remove from list" />
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function BookList() {
  const [books, setBooks] = useState([]);
  const [input, setInput] = useState('');
  const [query, setQuery] = useState('');
  const [openModal, setOpenModal] = useState(null);
  const { books: readingList, add: addBook, remove: removeBook } = useBookCollection("dogear-reading-list");
  const { books: wishlist, add: addToWishList, remove: removeFromWishlist } = useBookCollection("dogear-wishlist");

  function toggleModal(name) {
    setOpenModal(openModal === name ? null : name);
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

  return (
    <div>
      <div className="button-bar">
        <button onClick={() => toggleModal('reading')}>Reading List</button>
        <button onClick={() => toggleModal('wishlist')}>Wishlist</button>
        <button onClick={() => toggleModal('search')}>Search Books</button>
      </div>
      {openModal === 'reading' && (
        <ListModal title="My Reading List" books={readingList} onRemove={removeBook} onClose={() => setOpenModal(null)} />
      )}
      {openModal === 'wishlist' && (
        <ListModal title="Wishlist" books={wishlist} onRemove={removeFromWishlist} onClose={() => setOpenModal(null)} />
      )}
      {openModal === 'search' && (
        <div className="modal-backdrop" onClick={() => setOpenModal(null)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Search books..."
            />
            <button onClick={() => setQuery(input)}>Search</button>
            <button onClick={() => setOpenModal(null)}>Close</button>
            <ul>
              {books.map((book) => (
                <li key={book.key}>
                  {book.title} - {(book.author_name ?? []).join(", ")}
                  <button onClick={() => addBook(book)}>⊕ Reading List</button>
                  <button onClick={() => addToWishList(book)}>⊕ Wishlist</button>
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
        <h1>
          <img src={logo} className="logo" alt="dogear logo - a book page with a happy face" />
        </h1>
        <BookList />
      </div>
    );
  }


export default App;

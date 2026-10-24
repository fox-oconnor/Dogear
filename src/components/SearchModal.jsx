import { useState, useEffect } from 'react'
import { bookBookmark, heart, circleXmark } from '../icons.js'
import { searchOpenLibrary, searchGutenberg } from './search.jsx'



function SearchModal({ onClose, onAddBook, onAddToWishlist }) {
  const [books, setBooks] = useState([]);
  const [input, setInput] = useState('');
  const [query, setQuery] = useState('');
  const [source, setSource] = useState('openlibrary');
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function fetchBooks() {
      if (!query.trim()) {
        setBooks([]);
        return;
      }
      setIsLoading(true);
      setError(null);
      try {
        const results = source === 'gutenberg'
          ? await searchGutenberg(query)
          : await searchOpenLibrary(query);
        setBooks(results);
      } catch (e) {
        setError('Search failed - the book service may be down. Please try again in a bit.')
      } finally {
        setIsLoading(false);
      }
    }
    fetchBooks();
  }, [query, source]);

  function handleSearchSubmit(e) {
    e.preventDefault();
    setQuery(input);
  }

  return (
    <div className='modal-backdrop' onClick={onClose}>
      <div className='modal' onClick={(e) => e.stopPropagation()}>
        <button className='icon-button modal-close' onClick={onClose}>
          <img src={circleXmark} className='icon' alt='close button' />
        </button>
        <form onSubmit={handleSearchSubmit}>
          <label htmlFor='book-search'>
            Search Books
          </label>
          <input
            id='book-search'
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder='Search books...'
          />
          <button type='submit'>
            Search
          </button>
        </form>
        <div className='source-toggle'>
          <button
            className={source === 'openlibrary' ? 'active' : ''}
            onClick={() => setSource('openlibrary')}
          >
            Open Library
          </button>
          <button
            className={source === 'gutenberg' ? 'active' : ''}
            onClick={() => setSource('gutenberg')}
          >
            Gutenberg Project
          </button>
        </div>
        {error && <p className='error'>{error}</p>}
        {isLoading && <p className='loading'>Searching...</p>}
        <button onClick={onClose}>Close</button>
        <ul>
          {books.map((book) => (
            <li key={book.key}>
              <div className='bookTab'>
                <h2>
                  {book.title} - {(book.author_name ?? []).join(', ')}
                </h2>
                <button
                  className='reading-btn'
                  onClick={() => onAddBook(book)}>
                  <img src={bookBookmark} className='icon' title='Add to reading list' alt='a book icon' />
                </button>
                <button
                  className='wish-btn'
                  onClick={() => onAddToWishlist(book)}>
                  <img src={heart} className='icon' title='a heart icon' />
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export { SearchModal };

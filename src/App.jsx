import { useState } from 'react';
import './index.css'
import './App.css'
import logo from './logo.png';
import { SearchModal } from './components/SearchModal'
import { ListModal } from './components/ListModal.jsx'
import { useBookCollection } from './components/BookCollection.jsx'
import { BookDetail } from './components/BookDetail.jsx'

function BookList() {
  const [openModal, setOpenModal] = useState(null);
  const [selectedBook, setSelectedBook] = useState(null);
  const { books: readingList, add: addBook, remove: removeBook } = useBookCollection('dogear-reading-list');
  const { books: wishlist, add: addToWishList, remove: removeFromWishlist } = useBookCollection('dogear-wishlist');

  function toggleModal(name) {
    setOpenModal(openModal === name ? null : name);
  }

  function removeSelectedBook(key) {
    removeBook(key);
    removeFromWishlist(key);
    setSelectedBook(null);
  }

    return (
    <div>
      <div className='button-bar'>
        <button onClick={() => toggleModal('reading')}>Reading List</button>
        <button onClick={() => toggleModal('wishlist')}>Wishlist</button>
        <button onClick={() => toggleModal('search')}>Search Books</button>
      </div>
      {openModal === 'reading' && (
          <ListModal title="My Reading List" books={readingList} onRemove={removeBook} onSelect={setSelectedBook}  onClose={() => setOpenModal(null)} />
      )}
      {openModal === 'wishlist' && (
          <ListModal title="Wishlist" books={wishlist} onRemove={removeFromWishlist} onSelect={setSelectedBook}  onClose={() => setOpenModal(null)} />
      )}
      {openModal === 'search' && (
        <SearchModal
          onClose={() => setOpenModal(null)}
          onAddBook={addBook}
          onAddToWishlist={addToWishList}
        />
      )}
      {selectedBook && (
          <BookDetail book={selectedBook} onClose={() => setSelectedBook(null)} onRemoveBook={removeSelectedBook} />
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

import { useState, useEffect } from 'react';
import './index.css';
import './App.css';
import logo from './logo.png';
import { SearchModal } from './components/SearchModal';
import { ListModal } from './components/ListModal.jsx';
import { useBookCollection } from './components/BookCollection.jsx';
import { BookDetail } from './components/BookDetail.jsx';
import { getActiveProfile, listProfiles, migrateLegacyData } from './profiles.js';
import { WelcomeModal } from './components/WelcomeModal.jsx';
import { ProfileModal } from './components/ProfileModal.jsx';

function BookList({ onProfileChange, onModalChange }) {
  const [openModal, setOpenModal] = useState(null);
  const [selectedBook, setSelectedBook] = useState(null);
  const activeProfile = getActiveProfile();
  const readingKey = activeProfile ? `dogear:${activeProfile.id}:reading-list` : 'dogear-reading-list';
  const wishlistKey = activeProfile ? `dogear:${activeProfile.id}:wishlist` : 'dogear-wishlist';
  const { books: readingList, add: addBook, remove: removeBook } = useBookCollection(readingKey);
  const { books: wishlist, add: addToWishList, remove: removeFromWishlist } = useBookCollection(wishlistKey);

  useEffect(() => {
    onModalChange(openModal !== null || selectedBook !== null);
  }, [openModal, selectedBook, onModalChange]);

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
        <button onClick={() => toggleModal('profiles')}>{activeProfile ? activeProfile.name : 'Profiles'}</button>
      </div>
      {openModal === 'reading' && (
          <ListModal
            title="My Reading List"
            books={readingList}
            onRemove={removeBook}
            onSelect={setSelectedBook}
            onClose={() => setOpenModal(null)} />
      )}
      {openModal === 'wishlist' && (
          <ListModal
            title="Wishlist"
            books={wishlist}
            onRemove={removeFromWishlist}
            onSelect={setSelectedBook}
            onClose={() => setOpenModal(null)} />
      )}
      {openModal === 'search' && (
          <SearchModal
            onClose={() => setOpenModal(null)}
            onAddBook={addBook}
            onAddToWishlist={addToWishList}
        />
        )}
        {openModal === 'profiles' && (
          <ProfileModal
            onClose={() => setOpenModal(null)}
            onProfileChange={onProfileChange} />
        )}
        {selectedBook && (
          <BookDetail book={selectedBook} onClose={() => setSelectedBook(null)} onRemoveBook={removeSelectedBook} />
        )}
    </div>
  );
}

function App() {
  const [activeId, setActiveId] = useState(() => {
    const active = getActiveProfile();
    return active ? active.id : null;
  });
  const [showWelcome, setShowWelcome] = useState(() => listProfiles().length === 0);
  const [anyModalOpen, setAnyModalOpen] = useState(false);

  function handleProfileChange() {
    const active = getActiveProfile();
    setActiveId(active ? active.id : null);
  }

  function handleWelcomeComplete(name) {
    migrateLegacyData(name);
    const active = getActiveProfile();
    setActiveId(active ? active.id : null);
    setShowWelcome(false);
  }

  if (showWelcome) {
    return <WelcomeModal onComplete={handleWelcomeComplete} />;
  }

  return (
    <div>
      <h1 className={anyModalOpen ? 'logo-hidden' : ''}>
        <img src={logo} className='logo' alt='dogear logo - a book page with a happy face.' />
      </h1>
      <BookList
        key={activeId}
        onProfileChange={handleProfileChange}
        onModalChange={setAnyModalOpen}
      />
    </div>
  );
}

export default App;

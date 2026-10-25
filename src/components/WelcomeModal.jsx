import { useState } from 'react';

function WelcomeModal({ onComplete }) {
  const [name, setName] = useState('');
  const [bio, setBio] = useState('');
  const [location, setLocation] = useState('');


  function handleSubmit(e) {
    e.preventDefault();
    if (!name.trim()) return;
    onComplete(name.trim(), bio.trim(), location.trim());
  }

  return (
    <div className='modal-backdrop'>
      <div className='modal'>
        <h2> Welcome to dogear!</h2>
        <p> dogear is your personal reading list, and literary companion featuring the adorable Reynard our mascot and logo. </p>
        <p> Dogearians are able to search for books to devour courtesy of the always amazing Gutenberg Project and Open Library, save their reading lists, create a wishlist for books they want, but don't yet have.</p>
        <form onSubmit={handleSubmit}>
          <label htmlFor='screen-name'>
            What should dogear call you?
          </label>
          <input
            id='screen-name'
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder='Milo'
          />
          <label htmlFor='bio'>Bio:</label>
          <input
            id='bio'
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            placeholder='The best fox-friend you will ever need. :)'
          />
          <label htmlFor='location'>Location:</label>
          <input
            id='location'
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder='In a cozy fox den somewhere in Valdemar.'
          />
          <button type='submit'>
            Start Reading!
          </button>
        </form>
      </div>
    </div>
  );
}

export { WelcomeModal };

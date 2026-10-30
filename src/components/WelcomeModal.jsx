import { useState } from 'react';
import logo from '../assets/logo.png';
import Carousel from './Carousel.jsx';
import { companions } from '../data/companions.js';

function WelcomeModal({ onComplete }) {
  const [name, setName] = useState('');
  const [bio, setBio] = useState('');
  const [location, setLocation] = useState('');
  const [selectedCompanionId, setSelectedCompanionId] = useState('milo');


  function handleSubmit(e) {
    e.preventDefault();
    if (!name.trim()) return;
    onComplete(name.trim(), bio.trim(), location.trim(), selectedCompanionId);
  }

  return (
    <div className='modal-backdrop'>
      <div className='modal'>
        <h2><span className='greeting'> Welcome Friend!</span></h2>
        <div className='choose-companion'>
          <h3> Choose your reading companion </h3>
          <Carousel
            companions={companions}
            selectedCompanionId={selectedCompanionId}
            onSelect={setSelectedCompanionId}
            />
        </div>
        <p> dogear is your personal reading list, and literary companion featuring five adorable mascots to help you choose your next favorite book. </p>
        <p> Dogearians are able to search for books to devour courtesy of the always amazing Project Gutenberg and Open Library, save their reading lists, create a wishlist for books they want, but don't yet have.</p>
        <form onSubmit={handleSubmit}>
          <label htmlFor='screen-name'>
            What would you like to be called?
          </label>
          <input
            id='screen-name'
            className='welcome-input'
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder='Milo'
          />
          <label htmlFor='bio'>What is your story?</label>
          <input
            id='bio'
            className='welcome-input'
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            placeholder='The best fox-friend you will ever need. :)'
          />
          <label htmlFor='location'>Where are you at?</label>
          <input
            id='location'
            className='welcome-input'
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder='In a cozy fox den somewhere in Valdemar.'
          />
          <button type='submit'>
            Start Reading!
          </button>
        </form>
        <div className='directions'>
          <h3>How it works</h3>
          <ul>
            <li> Tap or click on the search button and select either Open Library or Project Gutenberg.</li>
            <li>Enter your search query, either author, title or subject. Then tap/click search.</li>
            <li>Add the book you're looking for to your reading list or wishlist.</li>
            <li>Once added to your lists you can then see the books details by selecting it in your reading or  wish lists.</li>
            <li>You can create as many profiles as you would like. At this time we have not implemented user accounts.</li>
            <li>No user accounts, and no backend means your profile and your data stay locally on your device.</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export { WelcomeModal };

import { useState } from 'react';
import { listProfiles, getActiveProfile, createProfile, switchProfile, deleteProfile, updateProfile } from '../profiles.js';
import { ToggleVisibility } from './ToggleVisibility.jsx';

function countBooks(storageKey) {
  try {
    const raw = localStorage.getItem(storageKey);
    if (!raw) return 0;
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed.length : 0;
  } catch {
    return 0;
  }
}

function memberSince(isoDate) {
  if (!isoDate) return null;
  const date = new Date(isoDate);
  if (Number.isNaN(date.getTime())) return null;
  return date.toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' });
}

function ProfileSwitcher({ onProfileChange }) {
  const [profiles, setProfiles] = useState(listProfiles());
  const [newName, setNewName] = useState('');
  const [newBio, setNewBio] = useState('');
  const [newLocation, setNewLocation] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [nameValue, setNameValue] = useState('');
  const [bioValue, setBioValue] = useState('');
  const [locationValue, setLocationValue] = useState('');
  const active = getActiveProfile();


  function handleSwitch(id) {
    if (switchProfile(id)) {
      setProfiles(listProfiles());
      onProfileChange();
    }
  }

  function handleDelete(id, name) {
    if (window.confirm(`Are you sure? Deleting ${name} will also delete your Reading List and Wishlist.`)) {
      deleteProfile(id);
      setProfiles(listProfiles());
      onProfileChange();
    }
  }

  function handleEditStart(profile) {
    setEditingId(profile.id);
    setNameValue(profile.name);
    setBioValue(profile.bio || '');
    setLocationValue(profile.location || '');
  }

  function handleEditSave(e, id) {
    e.preventDefault();
    if (updateProfile(id, { name: nameValue, bio: bioValue, location: locationValue })) {
      setProfiles(listProfiles());
      setEditingId(null);
      onProfileChange();
    }
  }

  function handleCreate(e) {
    e.preventDefault();
    if (!newName.trim()) return;
    createProfile(newName, newBio, newLocation);
    setProfiles(listProfiles());
    setNewName('');
    setNewBio('');
    setNewLocation('');
    onProfileChange();
  }

  return (
    <div className='profile-switcher'>
      {profiles.map((p) => {
        const since = memberSince(p.createdAt);
        const readingCount = countBooks(`dogear:${p.id}:reading-list`);
        const wishlistCount = countBooks(`dogear:${p.id}:wishlist`);
        return (
          <div key={p.id} className='profile-row'>
            {editingId === p.id ? (
              <form onSubmit={(e) => handleEditSave(e, p.id)}>
                <input
                  value={nameValue}
                  onChange={(e) => setNameValue(e.target.value)}
                />
                <input
                  value={bioValue}
                  onChange={(e) => setBioValue(e.target.value)}
                  placeholder='A short bio'
                />
                <input
                  value={locationValue}
                  onChange={(e) => setLocationValue(e.target.value)}
                  placeholder='Valdemar'
                />
                <button type='submit'>
                  Save
                </button>
                <button type='button' onClick={() => setEditingId(null)}>
                  Cancel
                </button>
              </form>
            ) : (
              <>
                <button
                  key={p.id}
                  className={active && active.id === p.id ? 'profile-name active' : 'profile-name'}
                  onClick={() => handleSwitch(p.id)}
                >
                  {p.name}
                </button>
                <button
                  className='profile-rename'
                  aria-label={`Edit ${p.name}`}
                  onClick={() => handleEditStart(p)}
                >
                  Edit
                </button>
                <button
                  className='profile-delete'
                  aria-label={`Delete ${p.name}`}
                  onClick={() => handleDelete(p.id, p.name)}
                >
                  Delete Profile
                </button>
              </>
            )}
            <div className='profile-info'>
              {p.bio ? <p>Bio : {p.bio}</p> : null}
              {p.location ? <p>Location : {p.location}</p> : null}
              {since ? <p>Member since {since}</p> : null}
              <p>{readingCount} books on reading list · {wishlistCount} books on wishlist </p>
            </div>
          </div>
        );
      })}
      <ToggleVisibility>
      <form onSubmit={handleCreate} className='submit-profile'>
        Username:
        <input
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
          placeholder='New profile name'
        />
        Bio:
        <input
          value={newBio}
          onChange={(e) => setNewBio(e.target.value)}
          placeholder='A most amazing mage and causer of chaos!'
        />
        Location:
        <input
          value={newLocation}
          onChange={(e) => setNewLocation(e.target.value)}
          placeholder='Valdemar or Amber'
        />
        <button type='submit'>
          Create
        </button>
        </form>
      </ToggleVisibility>
    </div>
  );
}

export { ProfileSwitcher };

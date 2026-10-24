import { useState } from 'react';
import { listProfiles, getActiveProfile, createProfile, switchProfile } from '../profiles.js';

function ProfileSwitcher({ onProfileChange }) {
  const [profiles, setProfiles] = useState(listProfiles());
  const [newName, setNewName] = useState('');
  const active = getActiveProfile();

  function handleSwitch(id) {
    if (switchProfile(id)) {
      setProfiles(listProfiles());
      onProfileChange();
    }
  }

  function handleCreate(e) {
    e.preventDefault();
    if (!newName.trim()) return;
    createProfile(newName);
    setProfiles(listProfiles());
    setNewName('');
    onProfileChange();
  }

  return (
    <div className='profile-switcher'>
      {profiles.map((p) => (
        <button
          key={p.id}
          className={active && active.id === p.id ? 'active' : ''}
          onClick={() => handleSwitch(p.id)}
        >
          {p.name}
        </button>
      ))}
      <form onSubmit={handleCreate}>
        <input
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
          placeholder='New profile name'
        />
        <button type='submit'>
          Add profile
        </button>
      </form>
    </div>
  );
}

export { ProfileSwitcher };

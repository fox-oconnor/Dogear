import { circleXmark } from '../icons.js';
import { ProfileSwitcher } from './ProfileSwitcher.jsx';

function ProfileModal({ onClose, onProfileChange }) {
  return (
    <div className='modal-backdrop' onClick={onClose}>
      <div className='modal' onClick={(e) => e.stopPropagation()}>
        <button className='icon-button modal-close' onClick={onClose}>
          <img src={circleXmark} className='icon' alt='close button' />
        </button>
        <h2>Profiles</h2>
        <ProfileSwitcher onProfileChange={onProfileChange} />
      </div>
    </div>
  );
}

export { ProfileModal };

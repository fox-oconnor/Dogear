import React, { useState } from 'react';

const ToggleVisibility = ({ children }) => {
  const [show, setShow] = useState(false);

  return (
    <React.Fragment>
      {show && children}
      <button onClick={() => setShow(!show)}>
        {!show ? 'Add Profile' : 'Cancel'}
      </button>
    </React.Fragment >
    );
}

export { ToggleVisibility };

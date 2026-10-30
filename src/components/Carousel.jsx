import { useState } from 'react';

const Carousel = ({ companions, selectedCompanionId, onSelect }) => {
  const [index, setIndex] = useState(0);
  const companion = companions[index];

  function previous() {
    setIndex((current) => (current - 1 + companions.length) % companions.length);
  }

  function next() {
    setIndex((current) => (current + 1) % companions.length);
  }

  return (
    <div>
      <div key={companion.id}>
        <img src={companion.image} alt={companion.name} width='50%'/>
        <h2>{companion.name}</h2>
        <p>{companion.theme}</p>
        <button type='button' onClick={() => onSelect(companion.id)}>
          {selectedCompanionId === companion.id ? 'Selected' : `Choose ${companion.name}`}
        </button>
      </div>
      <button type='button' onClick={previous}>
        Previous
      </button>
      <button type='button' onClick={next}>
        Next
      </button>
    </div>
  );
};

export default Carousel;

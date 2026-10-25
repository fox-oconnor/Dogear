import { useState, useEffect } from 'react';
import { circleXmark } from '../icons.js';

function BookDetail({ book, onClose, onRemoveBook }) {
  const [workDescription, setWorkDescription] = useState(null);
  const [workSubjects, setWorkSubjects] = useState(null);

  useEffect(() => {
    if (!book || book.source !== 'OL' || (book.description && book.subjects && book.subjects.length > 0)) return;
    setWorkDescription(null);
    setWorkSubjects(null);
    let cancelled = false;
    async function fetchDescription() {
      try {
        const response = await fetch(`https://openlibrary.org${book.key}.json`);
        const json = await response.json();
        const description = typeof json.description === 'string'
          ? json.description
          : json.description?.value ?? null;
        const subjects = Array.isArray(json.subjects) ? json.subjects.slice(0, 5) : null;
        if (!cancelled) {
          setWorkDescription(description);
          setWorkSubjects(subjects);
        }
      } catch {
        // Description stays absent if the fetch fails.
      }
    }
    fetchDescription();
    return () => {
      cancelled = true;
    };
  }, [book]);

  if (!book) return null;

  const sourceLink = book.source === 'GP'
    ? `https://www.gutenberg.org/ebooks/${book.gutenberg_id}`
    : `https://openlibrary.org${book.key}`;
  const sourceName = book.source === 'GP' ? 'Gutenberg Project' : 'Open Library';
  const description = book.description ?? workDescription;
  const subjects = book.subjects && book.subjects.length > 0 ? book.subjects : workSubjects;

  return (
    <div className='modal-backdrop' onClick={onClose}>
      <div className='modal' onClick={(e) => e.stopPropagation()}>
        <button className='icon-button modal-close' onClick={onClose}>
          <img src={circleXmark} className='icon' alt='close button' />
        </button>
        {book.cover_url && (
          <img src={book.cover_url} className='book-cover' alt={`Cover of ${book.title}`} />
        )}
        <hr />
        <h2> {book.title} </h2>
        <p className='book-authors'>{(book.author_name ?? []).join(', ')}</p>
        {book.first_publish_year && (
          <p className='book-year'> First published {book.first_publish_year}</p>
        )}
        {description && (
          <p className='book-description'>
            <span className='title'>Description: </span>
            {description}
          </p>
        )}
        {subjects && subjects.length > 0 && (
          <p className='book-subjects'>
            <span className='title'>Subjects: </span>
            {subjects.join(', ')}
          </p>
        )}
        <div className='book-footer'>
          <a href={sourceLink} target='_blank' rel='noreferrer'>
            View on {sourceName}
          </a>
          <button className='icon-button book-remove' onClick={() => onRemoveBook(book.key)}>
            Remove from List
          </button>
        </div>
      </div>
    </div>
  );
}

export { BookDetail };

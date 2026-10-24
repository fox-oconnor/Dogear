import { circleXmark, circleMinus } from '../icons.js';

function BookDetail({ book, onClose, onRemoveBook }) {
  if (!book) return null;

  const sourceLink = book.source === 'GP'
    ? `https://www.gutenberg.org/ebooks/${book.gutenberg_id}`
    : `https://openlibrary.org${book.key}`;
  const sourceName = book.source === 'GP' ? 'Gutenberg Project' : 'Open Library';

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
        <p className='book-authors'>{(book.author_name ?? []).join(',')}</p>
        <button className="icon-button book-remove" onClick={() => onRemoveBook(book.key)}>
          <img src={circleMinus} className="icon" alt="remove from list" /> Remove from List
        </button>
        {book.first_publish_year && (
          <p className='book-year'> First published {book.first_publish_year}</p>
        )}
        {book.description && (
          <p className='book-description'>{book.description}</p>
        )}
        {book.subjects && book.subjects.length > 0 && (
          <p className='book-subjects'>{book.subjects.join(', ')}</p>
        )}
        <a href={sourceLink} target='_blank' rel='noreferrer'>
          View on {sourceName}
        </a>
      </div>
    </div>
  );
}

export { BookDetail };

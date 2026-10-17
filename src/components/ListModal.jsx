import { circlePlus, heart, circleMinus, circleXmark, book, bookBookmark } from "../icons.js";

function ListModal({ title, books, onRemove, onClose }) {
  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <h2>{title}</h2>
        <button className="icon-button" onClick={onClose}>
          <img src={circleXmark} className="icon" alt="close button" />
        </button>
        <ul>
          {books.map((book) => (
            <li key={book.key}>
              {book.source && <span className="source-label">{book.source}</span>} -
              {book.title} - {(book.author_name ?? []).join(", ")}
              <button className="icon-button" onClick={() => onRemove(book.key)}>
                <img src={circleMinus} className="icon" alt="remove from list" />
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export { ListModal };

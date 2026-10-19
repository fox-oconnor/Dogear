import { circlePlus, heart, circleMinus, circleXmark, book, bookBookmark } from "../icons.js";

function ListModal({ title, books, onRemove, onSelect, onClose }) {
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
              <button className="book-title" onClick={() => onSelect(book)}>
                {book.title} - {(book.author_name ?? []).join(", ")}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export { ListModal };

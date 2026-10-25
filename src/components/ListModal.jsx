import { circleXmark } from "../icons.js";

function ListModal({ title, books, onSelect, onClose }) {
  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <h2>{title}</h2>
        <button className="icon-button modal-close" onClick={onClose}>
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

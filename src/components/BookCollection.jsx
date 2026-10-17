import { useState, useEffect } from 'react'

function useBookCollection(storageKey) {
  const [books, setBooks] = useState(() => {
    const saved = localStorage.getItem(storageKey);
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem(storageKey, JSON.stringify(books));
  }, [books, storageKey]);

  function add(book) {
    if (!books.some((b) => b.key === book.key)) {
      setBooks([...books, book]);
    }
  }
  function remove(key) {
    setBooks(books.filter((b) => b.key !== key));
  }

  return { books, add, remove }
}

export { useBookCollection };

function flipName(name) {
  const parts = name.split(',').map(s => s.trim());
  return parts.length === 2 ? `${parts[1]} ${parts[0]}` : name;
}

async function searchOpenLibrary(query) {
  const response = await fetch(
    `https://openlibrary.org/search.json?q=${encodeURIComponent(query)}`
  );
  const json = await response.json();
  return (json.docs ?? []).map(doc => ({
    title: doc.title,
    author_name: doc.author_name ?? ['Unknown'],
    key: doc.key,
    source: 'OL',
    cover_url: doc.cover_i ? `https://covers.openlibrary.org/b/id/${doc.cover_i}-M.jpg` : null,
    first_publish_year: doc.first_publish_year ?? null,
    subjects: (doc.subject ?? []).slice(0, 5),
  }));
}

async function searchGutenberg(query) {
  const res = await fetch(
    `https://gutendex.com/books/?search=${encodeURIComponent(query)}`
  );
  const json = await res.json();
  return (json.results ?? []).map(g => ({
    title: g.title,
    author_name: g.authors.map(a => flipName(a.name)),
    key: `/gutenberg/${g.id}`,
    cover_url: g.formats['image/jpeg'] ?? null,
    gutenberg_id: g.id,
    description: g.summaries?.[0] ?? null,
    source: 'GP',
  }));
}

export { flipName, searchOpenLibrary, searchGutenberg };

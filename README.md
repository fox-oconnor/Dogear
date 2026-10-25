# DOGEAR - Free Reading App

dogear is a free literary app which allows users (lovingly called Dogearians) to search for books, add titles to a reading list or a wishlist.

## How to Run the App

dogear needs nothing but Node.js and npm — no account, no backend, and no database. Your profiles and lists are stored in your browser's local storage.

```bash
npm install
npm run dev
```

Then open the local address Vite prints in the terminal (usually http://localhost:5173).

To build a production copy:

```bash
npm run build
npm run preview
```

## Reading List and Wishlist
The Reading List is where the user will save the books that they have access to and want to read. Some books are available through Open Library while others can be found on Project Gutenberg. Users will have the opportunity to follow their literary passion to both sites where they can read the books.

The Wishlist is where users can store books that they would like but do not currently own or are able to borrow.

## Search Books
The user can select which API to use to search for books, either Open Library or Project Gutenberg. The search feature returns the twenty best matches for the search entry. This helps keep the bandwidth usage lower for the app, and keeps the user from doom-scrolling through hundreds or more of books while searching for the perfect one.

## Profiles
Upon first load of the app, the user is asked to enter a profile/user name, location and a short bio. Let your imagination run wild with this one. The username is whatever the user wishes to be called, the location is a quirky nod to the current book-world the user is in, and the bio can be whatever tickles the user's fancy.

Users are able to create more than one profile per account, each profile stores its own Reading list and Wishlist and are accessible under the profile listing. (The user's name on the far right of the navigation)

## Book Details
Once the user has added a book to their reading list or wishlist, they can view the details of the book by clicking/tapping on the title in their list. The book cover, title, author, short description and subjects are listed for the user as well as a link to that book on either Project Gutenberg or Open Library. If the user no longer wishes to have the book on their list, there is also a remove option in the book details.


# Future Implementations

## Reading List / Wishlist
Users will be able to read books directly from the reading list. They will also be able to share their reading list with others as well as import their reading lists from other platforms.

Users will be able to purchase books on their Wishlist (or Reading List) through ThriftBooks.com or Bookshop.org (dogear would earn a small commission on each of these purchases)

The reading list will be searchable by author or title, as well as have the ability to be sorted alphabetically by author's name, or titles.

## Search
User can automatically search both APIs at the same time without selecting one.
Implementation of pages for the search results so that the user will have more books to search through if wanted.

## Profiles
Customization - color schemes for the users.
List of top five favorite books.

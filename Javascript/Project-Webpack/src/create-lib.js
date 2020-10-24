function Book(title, author, pages, read) {
  this.title = title
  this.author = author
  this.pages = pages
  this.read = read
  this.info = () => title + author + pages + read;
}

function addBookToLibrary(myLibrary, book) {
  myLibrary.push(book);
}

let myLibrary = [];

let tbp = new Book('Three Body Problem', 'Cixin Liu', '300 ', true);
let foundation = new Book('Foundation Series', 'Azimov', '300 ', true);
let snowcrash = new Book('Snow Crash', 'Neal Stephenson', '300 ', true);

addBookToLibrary(myLibrary, tbp);
addBookToLibrary(myLibrary, foundation);
addBookToLibrary(myLibrary, snowcrash);

export {myLibrary, Book, addBookToLibrary};
import { myLibrary, Book, addBookToLibrary } from "./create-lib";

function handleSubmit() {
  //pay attention to how you select elements of a form.
  //NOT: title = document.querySelection("#title").textContent;
  const form = document.querySelector("form");
  const title = form.elements.title.value;
  const author = form.elements.author.value;
  const pages = form.elements.pages.value;
  const read = form.elements.read.value;
  const newBoi = new Book(title, author, pages, read);
  myLibrary = JSON.parse(localStorage.getItem("myLibrary"));
  addBookToLibrary(myLibrary, newBoi);
  localStorage.setItem("myLibrary", JSON.stringify(myLibrary));
}

export { handleSubmit };

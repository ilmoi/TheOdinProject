import { cleanTable } from "./delete-books";

function whatsInStore(myLibrary) {
  for (const i in myLibrary) {
    console.log(myLibrary[i]);
  }
}

function handleRead() {
  const myLibrary = JSON.parse(localStorage.getItem("myLibrary"));
  console.log(myLibrary);
  cleanTable();
  for (const i in myLibrary) {
    const table = document.querySelector("table");
    const tr = document.createElement("tr");
    const title = document.createElement("td");
    const author = document.createElement("td");
    const pages = document.createElement("td");
    const read = document.createElement("td");
    const btnHolder = document.createElement("td");
    const btn = document.createElement("button");
    title.textContent = myLibrary[i].title;
    author.textContent = myLibrary[i].author;
    pages.textContent = myLibrary[i].pages;
    read.textContent = myLibrary[i].read;
    btn.textContent = "delete me";
    btn.classList.add(`deleter-${i}`);
    btnHolder.appendChild(btn);
    tr.appendChild(title);
    tr.appendChild(author);
    tr.appendChild(pages);
    tr.appendChild(read);
    tr.appendChild(btnHolder);
    table.appendChild(tr);
  }
}

export { handleRead };

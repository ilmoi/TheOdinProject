import { handleSubmit } from "./add-books";
import { myLibrary } from "./create-lib";
import { handleRead } from "./show-books";
import "./doge_dreams.jpeg";
import "./style.css";

// run this once to reset the library in localStorage
// localStorage.setItem("myLibrary", JSON.stringify(myLibrary));

// create a table
const table = document.querySelector("table");

// make show button work
const showBtn = document.querySelector(".show");
showBtn.addEventListener("click", () => {
  handleRead(myLibrary);
});

// make the form work
const form = document.querySelector("form");
form.addEventListener("submit", handleSubmit);

// make the delete button work
table.addEventListener("click", (e) => {
  const cls = e.target.classList[0];
  if (cls.indexOf("deleter") > -1) {
    const idx = cls.slice(-1);
    console.log("about to!");
    myLibrary = JSON.parse(localStorage.getItem("myLibrary")); // refresh lib
    console.log("parsed!");
    myLibrary.splice(idx, 1); // do action
    console.log("spliced!");
    localStorage.setItem("myLibrary", JSON.stringify(myLibrary)); // push refreshed lib
    console.log("reset!");
    handleRead(myLibrary);
  }
});

// create doge image
const dogeImage = document.createElement("img");
// dogeImage.src = "<%=require('./doge_dreams.jpeg')%>";
dogeImage.src = "doge_dreams.jpeg";
document.body.appendChild(dogeImage);

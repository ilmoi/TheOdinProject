function cleanTable() {
  const rows = Array.from(document.querySelectorAll("tr"));
  console.log(rows);
  if (rows.length > 1) {
    console.log("yay");
    //pay attention: rows.length-1 and i>=1 (we don't want to delete the title hence not >=0)
    for (let i = rows.length - 1; i >= 1; i--) {
      rows[i].remove();
    }
  }
}

export { cleanTable };

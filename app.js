let addBtn = document.getElementById("addBtn");
let mainInput = document.getElementById("noteInput");
let alertTxt = document.getElementById("alertTxt");
let notes = localStorage.getItem("notes");

addBtn.addEventListener("click", () => {
  let notes = localStorage.getItem("notes");
  notes == null ? (notesObj = []) : (notesObj = JSON.parse(notes));
  mainInput.value == ""
    ? (alertTxt.style.display = "block")
    : notesObj.push(mainInput.value) && (alertTxt.style.display = "none");
  localStorage.setItem("notes", JSON.stringify(notesObj));
  mainInput.value = "";
  //    window.location.reload();
  show();
});

let show = () => {
  let notes = localStorage.getItem("notes");
  notes == null ? (notesObj = []) : (notesObj = JSON.parse(notes));
  let cardContent = "";
  notesObj.forEach((element, index) => {
    cardContent += `
        <div class="card noteCard my-2 mx-2" style="width: 18rem;">
    <div class="card-body  bg-light">
      <h5 class="card-title text-success">Note:${index + 1}</h5>
      <p class="card-text">${element}</p>
      <a id=${index} onclick="deleteNote(this.id)" class="btn btn-danger">Delete note</a>
    </div>    
  </div>
        `;
  });

  let cardContainer = document.getElementById("cardContainer");
  notesObj.length != 0
    ? (cardContainer.innerHTML = cardContent)
    : (cardContainer.innerHTML = `<h4 class="text-light fw-bold text-center my-3">You got nothing to show !</h4>`);
};

let deleteNote = (index) => {
  let notes = localStorage.getItem("notes");
  notes == null ? (notesObj = []) : (notesObj = JSON.parse(notes));
  notesObj.splice(index, 1);
  localStorage.setItem("notes", JSON.stringify(notesObj));
  show();
};
let search = document.getElementById("search");
search.addEventListener("input", () => {
  let searchTxt = search.value;
  let noteCards = document.getElementsByClassName("noteCard");
  Array.from(noteCards).forEach((element) => {
    let cardTxt = element.getElementsByTagName("p")[0].innerText;
    cardTxt.includes(searchTxt)
      ? (element.style.display = "block")
      : (element.style.display = "none");
  });
});

show();

// As someone open the website, we need to open the notes of that particular person
showNotes();

// If user adds a note, add it to the localStorage
let addBtn = document.getElementById("addBtn");

// Adding button the "click" event listener
addBtn.addEventListener("click", function (e) {

  // get addTxt by it's ID
  let addTxt = document.getElementById("addTxt");
  let addTitle = document.getElementById("addTitle");


  // Getting notes from the local storage
  let notes = localStorage.getItem("notes");

  // checking whether the notes are null or not......and taking theaction based on that.
  if (notes == null) {
    notesObj = [];
  } else {
    notesObj = JSON.parse(notes);
  }
  addObj = {
    title: addTitle.value,
    text: addTxt.value
  }
  // pushing the value of the addTxt to the notesObj array
  notesObj.push(addObj);

  // setting and stringfying the notesObj to the localstorage
  localStorage.setItem("notes", JSON.stringify(notesObj));

  // setting the addtxt value to length 0, so that it doesn't remain there when the note is added.
  addTxt.value = "";
  addTitle.value = "";

  //   console.log(notesObj);

  // showing the notes
  showNotes();
});

// Function to show elements from localStorage
function showNotes() {

  // getting the notes from the localstorage
  let notes = localStorage.getItem("notes");

  // checking whether the notes are null or not......and taking theaction based on that.
  if (notes == null) {
    notesObj = [];
  } else {
    notesObj = JSON.parse(notes);
  }
  // setting the html to nothing
  let html = "";

  // writing the function for the addition of the notes
  notesObj.forEach(function (element, index) {
    html += `
            <div class="noteCard my-2 mx-2 card" style="width: 18rem;background-color: cyan;">
                    <div class="card-body">
                        <h5 class="card-title">${element.title}</h5>
                        <p class="card-text"> ${element.text}</p> 
                        <button id="${index}"onclick="deleteNote(this.id)" class="btn btn-success">Delete Note</button>
                    </div>
                </div>`;
  });

  // getting the notes by it's ID
  let notesElm = document.getElementById("notes");

  // writing the innerHtml of the notesElm using the above defined things
  if (notesObj.length != 0) {
    notesElm.innerHTML = html;
  } else {
    notesElm.innerHTML = `<p style="color: white;">No Notes Yet</p>`;

  }
}

// Function to delete a note
function deleteNote(index) {
  //   console.log("I am deleting", index);

  // Same thing getting the notes
  let notes = localStorage.getItem("notes");

  // checking whether the notes are null or not......and taking theaction based on that.
  if (notes == null) {
    notesObj = [];
  } else {
    notesObj = JSON.parse(notes);
  }

  // deleting things from a particular index
  notesObj.splice(index, 1);

  // Adding the notes to the localStorage
  localStorage.setItem("notes", JSON.stringify(notesObj));
  showNotes();
}

// searching the elements

// using the searchTxt id for getting the search element
let search = document.getElementById('searchTxt');

// adding event "input" to search event
search.addEventListener("input", function () {

  // setting the inputVal equal to search text value
  let inputVal = search.value.toLowerCase();

  // console.log('Input event fired!', inputVal);

  // getting all notes from the window via noteCards
  let noteCards = document.getElementsByClassName('noteCard');

  // iterating the notecards by making an Array
  Array.from(noteCards).forEach(function (element) {

    // Getting the text written in the card
    let cardTitle = element.getElementsByTagName("h5")[0].innerText;

    // iterating the card for the cardTxt
    if (cardTitle.includes(inputVal)) {
      element.style.display = "block";
    }
    else {
      element.style.display = "none";
    }
  })
})

/*
Further Features that can be added to my app are as follows which I may add in the near future:
2. Mark a note as Important
3. Separate notes by user
4. Sync and host to web server 
*/

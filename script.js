let myLibrary = [];

let container = document.querySelector(".container");
let addBook = document.querySelector(".addBook");


function Book(title, author, pages, read, refNumber){
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = (read === "true");
  this.refNumber = refNumber;
  
  this.readOrNot = function(){
    return this.read == true ? "already read." : "not read.";
  };
  
  this.info = function(){
    let o = this.readOrNot();
    return `${this.title} by ${this.author}, ${this.pages} pages, ${o}`
  };
};

function addBookToLibrary(){
  let title = prompt("What is the title of the book?", "The Hobbit");
  let author = prompt("What is the name of the author?", "J.R.R. Tolkien");
  let pages = prompt("What is the amount of pages that the book has?", 295);
  let read = prompt("Have you read the book? Hint: say 'true' for yes and 'false' for no", false);
  let refNumber = Math.floor(Math.random() * 100000);
  
  let book = new Book(title, author, pages, read, refNumber);
  
  myLibrary.push(book);
}

function showerOfBooks(arr){
  container.innerHTML = "";
  //let counter = 1;
  for(let i of arr){
    let builder = document.createElement("p");
    builder.innerHTML = 
      `<div class = "card">
        <p>
          <strong>${(arr.indexOf(i))+1}º book:</strong> ${i.info()}
        </p>
        <p class = "refNum">
          ${i.refNumber}
        </p>
        <button class = "deleteThis" onclick="deleteCard(this)">Click here to delete me</button>
        <button onclick="toggleRead(this)">Read</button>
       </div>`;
    container.appendChild(builder);
    //counter++;
  };
  console.log(myLibrary);
};

addBook.addEventListener("click", () => {
  container.innerHTML = "";
  addBookToLibrary();
  showerOfBooks(myLibrary);
});


function deleteCard(elem){
  let selectParentElement = elem.parentElement;
  let ref = selectParentElement.getElementsByClassName("refNum")[0].textContent;
  
  container.innerHTML = "";
  myLibrary = myLibrary.filter((element) => element.refNumber != ref);
  showerOfBooks(myLibrary);
}

function toggleRead(elem){
  let selectParentElement = elem.parentElement;
  let ref = selectParentElement.getElementsByClassName("refNum")[0].textContent;
  for(let i = 0; i < myLibrary.length; i++){
    console.log("this is the object " + myLibrary[i]);
    if(myLibrary[i]["refNumber"] == ref){
      if(myLibrary[i].read == true){
        myLibrary[i].read = false;
      }else{
        myLibrary[i].read = true;
      };
    };
  };
  container.innerHTML = "";
  showerOfBooks(myLibrary);
}
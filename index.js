function createElement(type, className) {
  const element = document.createElement(type);
  function addClass(className) {
    return element.classList.add(className);
  }
  if (className) {
    addClass(className);
  }
  return element;
}

const body = document.querySelector("body");
const mainHeader = createElement("h1");
mainHeader.innerText = "Web Dev Courses I've Taken";
const mainDiv = createElement("div", "main-div");
[mainHeader, mainDiv].map(el => body.appendChild(el));

const form = createElement("form");
const formInputTitle = createElement("input");
const formInputYear = createElement("select");
const formInputStatus = createElement("input");
const formSubmitButton = createElement("button");
const booksList = createElement("div", "all-books");
formInputTitle.setAttribute("placeholder", "Comma-separated: title, year, status");
formInputStatus.setAttribute("type", "radio");
formSubmitButton.innerText = "Add";
formSubmitButton.setAttribute("type", "button");
[form, booksList].map(el => mainDiv.appendChild(el));
[formInputTitle, formInputYear, formInputStatus, formSubmitButton].map(el => form.appendChild(el));

const refreshButton = createElement("button", "refresh-button");

function Course(title, year, status) {
  this.title = title;
  this.year = year;
  this.status = status;
  this.info = function() {
    if (status === "completed") {
      return `${title}, ${status} in ${year}`;
    } else if (status === "in progress") {
      return `${title}, ${status} started in ${year}`;
    }
  };
}

let data = [
  {
    title: 'Beginner JavaScript, Wes Bos',
    year: 2020,
    status: 'completed'
  },
  {
    title: 'JavaScript fundamentals, Codecademy',
    year: 2019,
    status: 'completed'
  },
  {
    title: 'CS50, edX',
    year: 2019,
    status: 'in progress'
  },
];

const myCourses = data.map(item => new Course(item.title, item.year, item.status));


let inputText = "";
formInputTitle.addEventListener("keydown", e => {
  return inputText = e.target.value;
})

// function addBook(inputName, inputAuthor, inputPages) {
//   const newBook = new Book(inputName, inputAuthor, inputPages);
//   return newBook;
// }


// formSubmitButton.addEventListener("click", () => {
//   if (inputText.length > 0) {
//     const inputBits = inputText.split(", ");
//     const newBook = new Course(inputBits[0], inputBits[1], inputBits[2]);
//     myLibrary.push(newBook);
//   }
// })

function render(array) {
  array.map(el => {
    const newDiv = createElement("div", "book-div");
    booksList.appendChild(newDiv);
    const newPara = createElement("p", "book-para");
    newDiv.appendChild(newPara);
    newPara.innerText = el.info();
  })
}

render(myCourses);
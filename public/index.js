/* Mock database */
let data = [
  {
    title: 'Beginner JavaScript',
    issuer: 'Wes Bos',
    year: 2020,
    status: 'finished',
  },
  {
    title: 'JavaScript fundamentals',
    issuer: 'Codecademy',
    year: 2019,
    status: 'finished',
  },
  {
    title: 'Frontend Web Development',
    issuer: 'The Odin project',
    year: 2020,
    status: 'in progress',
  },
  {
    title: 'CS50 from Harvard',
    issuer: 'edX',
    year: 2019,
    status: 'in progress',
  },
];

/* Abstractions */
function createElementWithClass(type, className) {
  const element = document.createElement(type);
  className && element.classList.add(className);
  return element;
}

function Course(title, issuer, year, status) {
  this.title = title;
  this.issuer = issuer;
  this.year = year;
  this.status = status;
  this.toggleStatus = () => {
    if (this.status === "finished") {
      this.status = "in progress";
    } else {
      this.status = "finished";
    }
  };
}

function addCourse(title, issuer, year, status) {
  return new Course(title, issuer, year, status);
}

function createCard(course, courseList, array) {
  const wrapper = createElementWithClass("section", "course__section");
  courseList.appendChild(wrapper);
  const heading1 = createElementWithClass("h1", "course__heading1");
  heading1.innerText = course.title;
  const heading2 = createElementWithClass("h2", "course__heading2");
  heading2.innerText = course.issuer;
  const paragraph = createElementWithClass("p", "course__paragraph");
  paragraph.innerText = course.status === "finished" ? `${course.status} in ${course.year}` : course.status;
  const removeButton = createElementWithClass("button", "course-remove__button");
  removeButton.innerText = "Remove";
  removeButton.addEventListener("click", (event) => {
    array.splice(array.indexOf(course), 1);
    event.target.parentNode.remove();
  });
  const toggleStatusButton = createElementWithClass("button", "toggle-status__button");
  toggleStatusButton.innerText = 'Toggle status';
  toggleStatusButton.addEventListener("click", () => {
    course.toggleStatus();
    paragraph.innerText = course.status === "finished" ? `${course.status} in ${course.year}` : course.status;
  });
  [heading1, heading2, paragraph, toggleStatusButton, removeButton].forEach(element => wrapper.appendChild(element));
}

function render(array, section) {
  array.forEach(object => {
    const course = addCourse(object.title, object.issuer, object.year, object.status);
    createCard(course, section, array);
  });
}

/* LAYOUT */
/* Skeleton */
const body = document.querySelector("body");
const mainHeaderContainer = createElementWithClass("section", "main_headers__section");
const mainHeader = createElementWithClass("h1");
mainHeader.innerText = "Boast".toUpperCase() + "r";
const mainSubheader = createElementWithClass("h2");
mainSubheader.innerText = "My Online Courses";
const mainDiv = createElementWithClass("div", "main_div");
[mainHeader, mainSubheader].forEach(el => mainHeaderContainer.appendChild(el));
[mainHeaderContainer, mainDiv].forEach(el => body.appendChild(el));

const addNewCourseButton = createElementWithClass("button", "add-new-course_button");
addNewCourseButton.innerText = "Add a new course";
addNewCourseButton.setAttribute("type", "button");

/* Form */
const form = createElementWithClass("form", "course_form");
form.setAttribute("hidden", "");
const formInputTitle = createElementWithClass("input", "input-title");
formInputTitle.setAttribute("placeholder", "Course title");

const formInputIssuer = createElementWithClass("input", "input-issuer");
formInputIssuer.setAttribute("placeholder", "Source or issuer");

/* Year selector */
const formInputYear = createElementWithClass("select");
for (let year = new Date().getFullYear(); year >= 2010; year--) {
  const formInputYearOption = createElementWithClass("option");
  formInputYearOption.innerText = year;
  formInputYearOption.setAttribute("value", year);
  formInputYear.appendChild(formInputYearOption);
}

/* Status radio buttons */
const formInputStatusDiv = createElementWithClass("div", "status_div");
const statusData = [
  {
    id: "finished",
    label: "Finished"
  },
  {
    id: "in-progress",
    label: "in progress"
  },
];
for (let item of statusData) {
  const formInputStatusOption = createElementWithClass("input");
  formInputStatusOption.setAttribute("type", "radio");
  formInputStatusOption.setAttribute("id", item.id);
  formInputStatusOption.setAttribute("name", "status");
  const formInputStatusOptionLabel = createElementWithClass("label");
  formInputStatusOptionLabel.setAttribute("for", item.id);
  formInputStatusOptionLabel.innerText = item.label;
  formInputStatusDiv.appendChild(formInputStatusOption);
  formInputStatusDiv.appendChild(formInputStatusOptionLabel);
}

const formButtonsDiv = createElementWithClass("div", "form-buttons_div");
const formCancelButton = createElementWithClass("button", "close-form_button");
formCancelButton.innerText = "Cancel";
const formSubmitButton = createElementWithClass("button", "submit-course_button");
formSubmitButton.innerText = "Add";

const courseList = createElementWithClass("div", "all-courses");




/* Appending form to the page */
[formSubmitButton, formCancelButton].forEach(el => {
  el.setAttribute("type", "button");
  formButtonsDiv.appendChild(el);
});
[formInputTitle, formInputIssuer, formInputYear, formInputStatusDiv, formButtonsDiv].forEach(el => form.appendChild(el));
[addNewCourseButton, form, courseList].forEach(el => mainDiv.appendChild(el));

let inputText = "";
formInputTitle.addEventListener("keydown", e => {
  return inputText = e.target.value;
})

const overlay = createElementWithClass("div", "overlay");

function toggleOverlayWithForm() {
  if (form.hidden === true) {
    body.appendChild(overlay);
    form.removeAttribute("hidden");
  } else {
    body.removeChild(overlay);
    form.setAttribute("hidden", "");
  }
}

[addNewCourseButton, formCancelButton, overlay].forEach(el => el.addEventListener("click", toggleOverlayWithForm));


render(data, courseList);
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./LeadeboardManagement/Leaderboard.ts":
/*!*********************************************!*\
  !*** ./LeadeboardManagement/Leaderboard.ts ***!
  \*********************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
const QuizRepo_1 = __importDefault(__webpack_require__(/*! ../Repo/QuizRepo */ "./Repo/QuizRepo.ts"));
const quizRepo = new QuizRepo_1.default();
const Courses = quizRepo.getAllCourses();
const quizDropdown = document.getElementById("quizDropdown");
Courses.forEach(course => {
    const option = document.createElement("option");
    option.value = course.title;
    option.textContent = course.title;
    quizDropdown.appendChild(option);
});
const option = document.createElement("option");
option.value = "Select All";
option.textContent = "Select All";
quizDropdown.appendChild(option);
(_a = document.getElementById("showLeaderboardButton")) === null || _a === void 0 ? void 0 : _a.addEventListener('click', handleClick);
(_b = document.getElementById("submit-btn")) === null || _b === void 0 ? void 0 : _b.addEventListener('click', handle);
let index = -1;
let course = quizRepo.getCourse(Courses, quizDropdown.value);
let list = (course === null || course === void 0 ? void 0 : course.userAttempted) || [];
handleClick();
function handleClick() {
    if (quizDropdown.value === "Select All" || !quizDropdown.value) {
        const container = document.getElementById("leaderboard");
        container.innerHTML = '';
        Courses.forEach((val) => {
            console.log("Here");
            course = val;
            console.log(course);
            list = course.userAttempted || [];
            display(course, list);
        });
    }
    else {
        console.log(quizDropdown.value);
        course = quizRepo.getCourse(Courses, quizDropdown.value);
        console.log(course);
        list = (course === null || course === void 0 ? void 0 : course.userAttempted) || [];
        const container = document.getElementById("leaderboard");
        container.innerHTML = '';
        display(course, list);
    }
}
function display(course, list) {
    const container = document.getElementById("leaderboard");
    list.forEach((row, index) => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
                <td>${index + 1}</td>
                <td>${row.user.name}</td>
                <td>${course.title}</td>
                <td>${row.mark}</td>
                <td>${row.date}</td>
                <td><button class="edit-btn" data-index="${index}">Edit</button><button class="delete-btn" data-index="${index}">Delete</button></td>
            `;
        container.appendChild(tr);
    });
    const deleteButtons = container.getElementsByClassName("delete-btn");
    for (let i = 0; i < deleteButtons.length; i++) {
        const button = deleteButtons[i];
        button.addEventListener("click", function () {
            const index = parseInt(button.getAttribute("data-index"), 10);
            list.splice(index, 1);
            course.userAttempted = list;
            Courses.forEach((c) => { if (c.title === (course === null || course === void 0 ? void 0 : course.title))
                c.userAttempted = list; });
            quizRepo.updateCourse(Courses);
            handleClick();
        });
    }
    const editButtons = container.getElementsByClassName("edit-btn");
    for (let i = 0; i < editButtons.length; i++) {
        const button = editButtons[i];
        button.addEventListener('click', () => {
            index = parseInt(button.getAttribute("data-index"), 10);
            document.getElementById('username').value = list[index].user.name;
            document.getElementById('email').value = list[index].user.email;
            document.getElementById('score').value = String(list[index].mark);
            document.getElementById("userForm").style.display = "block";
        });
    }
}
function handle(event) {
    event.preventDefault();
    const regex = /.*@/;
    if (!regex.test(document.getElementById('email').value)) {
        document.getElementById("error").style.display = "block";
        return;
    }
    document.getElementById("error").style.display = "none";
    list[index].user.name = document.getElementById('username').value;
    list[index].user.email = document.getElementById('email').value;
    list[index].mark = parseInt(document.getElementById('score').value);
    document.getElementById("userForm").style.display = "none";
    list.sort((a, b) => b.mark - a.mark);
    course.userAttempted = list;
    Courses.forEach((c) => { if (c.title === (course === null || course === void 0 ? void 0 : course.title))
        c.userAttempted = list; });
    quizRepo.updateCourse(Courses);
    handleClick();
}


/***/ }),

/***/ "./Repo/QuizRepo.ts":
/*!**************************!*\
  !*** ./Repo/QuizRepo.ts ***!
  \**************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
class QuizRepo {
    createCourse(title, description, Questions, userAttempted) {
        const Course = {
            title: title,
            description: description,
            Questions: Questions,
            userAttempted: userAttempted,
        };
        const Courses = this.getAllCourses();
        Courses.push(Course);
        this.updateCourse(Courses);
    }
    updateCourse(Courses) {
        localStorage.setItem("Courses", JSON.stringify(Courses));
    }
    getCourse(Courses, name) {
        return Courses.find((course) => course.title === name);
    }
    getAllCourses() {
        if (!localStorage.getItem("Courses"))
            localStorage.setItem("Courses", "[]");
        return JSON.parse(localStorage.getItem("Courses") || "[]");
    }
}
exports["default"] = QuizRepo;


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = __webpack_require__("./LeadeboardManagement/Leaderboard.ts");
/******/ 	
/******/ })()
;
//# sourceMappingURL=Leaderboard.bundle.js.map
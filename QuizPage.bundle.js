/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./QuizPage/QuizPage.ts":
/*!******************************!*\
  !*** ./QuizPage/QuizPage.ts ***!
  \******************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
const QuizRepo_1 = __importDefault(__webpack_require__(/*! ../Repo/QuizRepo */ "./Repo/QuizRepo.ts"));
const quizRepo = new QuizRepo_1.default();
const courses = quizRepo.getAllCourses();
const current_course = sessionStorage.getItem("current-course") || "";
const course = quizRepo.getCourse(courses, current_course);
const questions = (course === null || course === void 0 ? void 0 : course.Questions) || [];
document.getElementById("course-name").textContent = current_course;
document.getElementById("user-name").textContent = sessionStorage.getItem("current-user") || "";
let id = 0;
const userOptions = [];
let currentOption = "";
// Function to display the question and options
function display(id) {
    var _a;
    const container = document.getElementById("question-container");
    const question = questions[id];
    if (question) {
        if (id === questions.length - 1) {
            container.innerHTML = `
                <p>${id + 1}. ${question.title}</p>
                <button class="options"  value="option1">A. ${question.option1}</button>
                <button class="options"  value="option2">B. ${question.option2}</button>
                <button class="options"  value="option3">C. ${question.option3}</button>
                <button class="options"  value="option4">D. ${question.option4}</button>
                <button id="action-btn">Submit</button>
            `;
        }
        else {
            container.innerHTML = `
                <p>${question.title}</p>
                <button class="options" value="option1">${question.option1}</button>
                <button class="options" value="option2">${question.option2}</button>
                <button class="options" value="option3">${question.option3}</button>
                <button class="options" value="option4">${question.option4}</button>
                <button id="action-btn">Next</button>
            `;
        }
    }
    (_a = document.getElementById("action-btn")) === null || _a === void 0 ? void 0 : _a.addEventListener('click', handleClick);
    document.querySelectorAll(".options").forEach((btn) => btn.addEventListener('click', handleOption));
}
function handleOption(e) {
    const btn = e.target;
    currentOption = btn.value;
}
function handleClick(e) {
    const btn = e.target;
    if (btn.textContent === "Next") {
        id++;
        userOptions.push(currentOption);
        display(id);
        updateProgressBar();
    }
    else {
        userOptions.push(currentOption);
        sessionStorage.setItem("userOptions", JSON.stringify(userOptions));
        location.href = "QuizSummary.html";
    }
}
// Function to update the progress bar
function updateProgressBar() {
    const progressBar = document.getElementById('progress-bar');
    const progress = (id / questions.length) * 100;
    progressBar.style.width = `${progress}%`;
}
let totalTime = 120 * questions.length;
let timeRemaining = totalTime;
function startTimer() {
    const timerElement = document.getElementById('time');
    const interval = setInterval(() => {
        const minutes = Math.floor(timeRemaining / 60);
        const seconds = timeRemaining % 60;
        timerElement.textContent = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
        if (timeRemaining <= 0) {
            clearInterval(interval);
            location.href = "QuizSummary.html";
        }
        else {
            timeRemaining--;
        }
    }, 1000);
}
startTimer();
display(0);


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
/******/ 	var __webpack_exports__ = __webpack_require__("./QuizPage/QuizPage.ts");
/******/ 	
/******/ })()
;
//# sourceMappingURL=QuizPage.bundle.js.map
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./CreateQuiz/CreateQuiz.ts":
/*!**********************************!*\
  !*** ./CreateQuiz/CreateQuiz.ts ***!
  \**********************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
const QuizRepo_1 = __importDefault(__webpack_require__(/*! ../Repo/QuizRepo */ "./Repo/QuizRepo.ts"));
const quizRepo = new QuizRepo_1.default();
const courses = quizRepo.getAllCourses();
let course = {};
const Questions = [];
(_a = document.getElementById("quiz-btn")) === null || _a === void 0 ? void 0 : _a.addEventListener('click', createQuiz);
(_b = document.getElementById('question-btn')) === null || _b === void 0 ? void 0 : _b.addEventListener('click', addQuestion);
function createQuiz(event) {
    const title = document.getElementById("quizTitle").value;
    const description = document.getElementById("description").value;
    const btn = event.target;
    if (btn.textContent === "Create Quiz") {
        if (quizRepo.getCourse(courses, title)) {
            alert("Course already exists");
        }
        else {
            course = {
                title,
                description
            };
            document.getElementById("createQuizForm").style.display = "block";
            btn.textContent = "Save Quiz";
        }
    }
    else {
        if (course) {
            course.Questions = Questions;
            course.userAttempted = [];
            courses.push(course);
            quizRepo.updateCourse(courses);
            window.location.href = "Admin.html";
        }
    }
}
// Function to add a question to the quiz
function addQuestion(event) {
    event.preventDefault();
    const title = document.getElementById("questionText").value;
    const op1 = document.getElementById("option1").value;
    const op2 = document.getElementById("option2").value;
    const op3 = document.getElementById("option3").value;
    const op4 = document.getElementById("option4").value;
    const correctOption = document.getElementById("correctAnswer").value;
    const mark = document.getElementById("questionMark").value;
    if (!correctOption || !title || !op1 || !op2 || !op3 || !op4 || !mark) {
        document.getElementById("error").style.display = "block";
        return;
    }
    document.getElementById("error").style.display = "none";
    const question = {
        title,
        option1: op1,
        option2: op2,
        option3: op3,
        option4: op4,
        "correct-option": correctOption,
        mark
    };
    Questions.push(question);
    document.getElementById("createQuizForm").reset();
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
/******/ 	var __webpack_exports__ = __webpack_require__("./CreateQuiz/CreateQuiz.ts");
/******/ 	
/******/ })()
;
//# sourceMappingURL=createQuiz.bundle.js.map
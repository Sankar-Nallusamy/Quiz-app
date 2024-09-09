/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./CourseSelection/CourseSelection.ts":
/*!********************************************!*\
  !*** ./CourseSelection/CourseSelection.ts ***!
  \********************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
const QuizRepo_1 = __importDefault(__webpack_require__(/*! ../Repo/QuizRepo */ "./Repo/QuizRepo.ts"));
const UserRepo_1 = __importDefault(__webpack_require__(/*! ../Repo/UserRepo */ "./Repo/UserRepo.ts"));
const userRepo = new UserRepo_1.default();
const quizRepo = new QuizRepo_1.default();
document.getElementById("user-name").textContent = sessionStorage.getItem("current-user") || "";
const Courses = quizRepo.getAllCourses();
const Users = userRepo.getAll();
const user = userRepo.getUser(Users, sessionStorage.getItem("current-mail"));
const container = document.getElementById("course-wrapper");
function handleClick(event) {
    const btn = event.target;
    const id = btn.getAttribute("data-id");
    if (id !== null) {
        sessionStorage.removeItem("current-course");
        sessionStorage.setItem("current-course", `${Courses[parseInt(id)].title}`);
        window.location.href = "QuizPage.html";
    }
}
// Render courses
for (let i = 0; i < Courses.length; i++) {
    const course = Courses[i];
    const node = document.createElement('div');
    node.innerHTML = `
        <h2>${course.title}</h2>
        <p>${course.description}</p>
        <button id="start-button" data-id="${i}" class="start-btn">Start Quiz</button>`;
    container.appendChild(node);
    node.className = 'course-card';
}
if (user) {
    const recent_course = user.CourseAttempted;
    const recent_container = document.getElementById("recent-quiz");
    recent_container.innerHTML = '';
    for (let i = 0; i < recent_course.length; i++) {
        const course = recent_course[i];
        const node = document.createElement('div');
        node.innerHTML = `
            <h2>${course}</h2>
            <button id="start-button" data-id="${i}" class="start-btn">Quick Start</button>`;
        recent_container.appendChild(node);
        node.className = 'course-card';
    }
}
document.querySelectorAll(".start-btn").forEach((btn) => btn.addEventListener('click', handleClick));


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


/***/ }),

/***/ "./Repo/UserRepo.ts":
/*!**************************!*\
  !*** ./Repo/UserRepo.ts ***!
  \**************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
class UserRepo {
    getAll() {
        if (!localStorage.getItem("Users"))
            localStorage.setItem("Users", "[]");
        return JSON.parse(localStorage.getItem("Users") || "[]");
    }
    getUser(Users, email) {
        return Users.find((user) => user.email === email);
    }
    updateUser(Users) {
        localStorage.setItem("Users", JSON.stringify(Users));
    }
    createUser(name, email, password, CourseAttempted) {
        const Users = this.getAll();
        const user = {
            name: name,
            email: email,
            password: password,
            CourseAttempted: CourseAttempted,
        };
        Users.push(user);
        this.updateUser(Users);
    }
}
exports["default"] = UserRepo;


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
/******/ 	var __webpack_exports__ = __webpack_require__("./CourseSelection/CourseSelection.ts");
/******/ 	
/******/ })()
;
//# sourceMappingURL=courseSelection.bundle.js.map
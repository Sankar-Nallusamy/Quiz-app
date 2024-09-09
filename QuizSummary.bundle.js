/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./QuizSummary/QuizSummary.ts":
/*!************************************!*\
  !*** ./QuizSummary/QuizSummary.ts ***!
  \************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
const QuizRepo_1 = __importDefault(__webpack_require__(/*! ../Repo/QuizRepo */ "./Repo/QuizRepo.ts"));
const UserRepo_1 = __importDefault(__webpack_require__(/*! ../Repo/UserRepo */ "./Repo/UserRepo.ts"));
const userRepo = new UserRepo_1.default();
const quizRepo = new QuizRepo_1.default();
const courses = quizRepo.getAllCourses();
const current_course = sessionStorage.getItem("current-course") || "";
const course = quizRepo.getCourse(courses, current_course);
const questions = (course === null || course === void 0 ? void 0 : course.Questions) || [];
const userOptions = JSON.parse(sessionStorage.getItem("userOptions") || "[]");
document.getElementById("course-name").textContent = current_course;
document.getElementById("user-name").textContent = sessionStorage.getItem("current-user") || "";
let userAttempted = (course === null || course === void 0 ? void 0 : course.userAttempted) || [];
const Users = userRepo.getAll();
const user = userRepo.getUser(Users, sessionStorage.getItem("current-mail"));
if (!user || !course)
    console.log(user);
let CourseAttempted = user.CourseAttempted;
let mark = 0;
function findMark() {
    let totalMark = 0;
    for (let i = 0; i < questions.length; i++) {
        if (userOptions[i] === questions[i]["correct-option"]) {
            mark += parseInt(questions[i].mark, 10);
        }
        totalMark += parseInt(questions[i].mark, 10);
    }
    document.getElementById("score-area").textContent = `Your Score: ${mark} out of ${totalMark}`;
}
findMark();
if (user) {
    userAttempted = userAttempted.filter((ele) => ele.user.email !== user.email);
    let date = new Date();
    userAttempted.push({ user, mark, date });
    userAttempted.sort((a, b) => b.mark - a.mark);
    console.log(userAttempted);
    CourseAttempted = CourseAttempted.filter((ele) => ele !== current_course);
    CourseAttempted.push(current_course);
    course.userAttempted = userAttempted;
    user.CourseAttempted = CourseAttempted;
    quizRepo.updateCourse(courses);
    userRepo.updateUser(Users);
}
(_a = document.getElementById("leaderboard-btn")) === null || _a === void 0 ? void 0 : _a.addEventListener("click", showLeaderboard);
function showLeaderboard() {
    const container = document.getElementById("leader-board-table");
    container.innerHTML = '';
    for (let i = 0; i < userAttempted.length; i++) {
        const row = userAttempted[i];
        if (row.user.email === sessionStorage.getItem("current-mail")) {
            container.innerHTML += `
                <tr style="background:black;color:white;">
                    <td>${i + 1}</td>
                    <td>${row.user.name}</td>
                    <td>${row.user.email}</td>
                    <td>${row.mark}</td>
                </tr>`;
        }
        else {
            container.innerHTML += `
                <tr>
                    <td>${i + 1}</td>
                    <td>${row.user.name}</td>
                    <td>${row.user.email}</td>
                    <td>${row.mark}</td>
                </tr>`;
        }
    }
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
/******/ 	var __webpack_exports__ = __webpack_require__("./QuizSummary/QuizSummary.ts");
/******/ 	
/******/ })()
;
//# sourceMappingURL=QuizSummary.bundle.js.map
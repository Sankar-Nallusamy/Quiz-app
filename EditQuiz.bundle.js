/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./EditQuiz/EditQuiz.ts":
/*!******************************!*\
  !*** ./EditQuiz/EditQuiz.ts ***!
  \******************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a, _b, _c, _d;
Object.defineProperty(exports, "__esModule", ({ value: true }));
const QuizRepo_1 = __importDefault(__webpack_require__(/*! ../Repo/QuizRepo */ "./Repo/QuizRepo.ts"));
const UserRepo_1 = __importDefault(__webpack_require__(/*! ../Repo/UserRepo */ "./Repo/UserRepo.ts"));
const userRepo = new UserRepo_1.default();
const quizRepo = new QuizRepo_1.default();
let index = -1;
let Courses = quizRepo.getAllCourses();
let Users = userRepo.getAll();
const quizDropdown = document.getElementById("quizDropdown");
Courses.forEach(course => {
    const option = document.createElement("option");
    option.value = course.title;
    option.textContent = course.title;
    quizDropdown.appendChild(option);
});
(_a = document.getElementById("editButton")) === null || _a === void 0 ? void 0 : _a.addEventListener('click', handleClick);
(_b = document.getElementById('addButton')) === null || _b === void 0 ? void 0 : _b.addEventListener('click', (event) => addQuestion('Add'));
(_c = document.getElementById('addForm')) === null || _c === void 0 ? void 0 : _c.addEventListener('click', addForm);
(_d = document.getElementById('updateForm')) === null || _d === void 0 ? void 0 : _d.addEventListener('click', updateForm);
console.log("Success");
let course = quizRepo.getCourse(Courses, quizDropdown.value);
let list = (course === null || course === void 0 ? void 0 : course.Questions) || [];
function handleClick() {
    if (quizDropdown.value === "Select a Quiz") {
        alert("Select a Quiz");
    }
    else {
        course = quizRepo.getCourse(Courses, quizDropdown.value);
        list = (course === null || course === void 0 ? void 0 : course.Questions) || [];
        const container = document.getElementById("questions");
        container.innerHTML = '';
        list.forEach((row, index) => {
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td>${index + 1}</td>
                <td>${row.title}</td>
                <td>${row.mark}</td>
                <td><button class="edit-btn" data-index="${index}">Edit</button><button class="delete-btn" data-index="${index}">Delete</button></td>
    
            `;
            container.appendChild(tr);
        });
        const deleteButtons = container.getElementsByClassName("delete-btn");
        for (let i = 0; i < deleteButtons.length; i++) {
            const button = deleteButtons[i];
            button.addEventListener("click", function () {
                console.log("I'm Here");
                const index = parseInt(button.getAttribute("data-index"), 10);
                list.splice(index, 1);
                course.Questions = list;
                Courses.forEach((c) => { if (c.title === (course === null || course === void 0 ? void 0 : course.title))
                    c.Questions = list; });
                quizRepo.updateCourse(Courses);
                handleClick();
            });
        }
        const editButtons = container.getElementsByClassName("edit-btn");
        for (let i = 0; i < editButtons.length; i++) {
            const button = editButtons[i];
            button.addEventListener('click', () => {
                index = parseInt(button.getAttribute("data-index"), 10);
                addQuestion("update");
            });
        }
    }
}
function addQuestion(s) {
    if (s === "Add") {
        document.getElementById("createQuestion").style.display = "flex";
    }
    else {
        document.getElementById("updateQuestion").style.display = "flex";
        document.getElementById("U-questionText").value = list[index].title;
        document.getElementById("U-option1").value = list[index].option1;
        document.getElementById("U-option2").value = list[index].option2;
        document.getElementById("U-option3").value = list[index].option3;
        document.getElementById("U-option4").value = list[index].option4;
        document.getElementById("U-correctAnswer").value = list[index]["correct-option"];
        document.getElementById("U-questionMark").value = list[index].mark;
    }
}
function addForm(event) {
    event.preventDefault();
    const title = document.getElementById("questionText").value;
    const op1 = document.getElementById("option1").value;
    const op2 = document.getElementById("option2").value;
    const op3 = document.getElementById("option3").value;
    const op4 = document.getElementById("option4").value;
    const correctOption = document.getElementById("correctAnswer").value;
    const mark = document.getElementById("questionMark").value;
    if (!correctOption || !title || !op1 || !op2 || !op3 || !op4 || !mark) {
        document.getElementById("add-error").style.display = "block";
        return;
    }
    const question = {
        title,
        option1: op1,
        option2: op2,
        option3: op3,
        option4: op4,
        "correct-option": correctOption,
        mark
    };
    list.push(question);
    course.Questions = list;
    quizRepo.updateCourse(Courses);
    document.getElementById("createQuestion").reset();
    document.getElementById("createQuestion").style.display = "none";
    handleClick();
}
function updateForm(event) {
    event.preventDefault();
    const title = document.getElementById("U-questionText").value;
    const op1 = document.getElementById("U-option1").value;
    const op2 = document.getElementById("U-option2").value;
    const op3 = document.getElementById("U-option3").value;
    const op4 = document.getElementById("U-option4").value;
    const correctOption = document.getElementById("U-correctAnswer").value;
    const mark = document.getElementById("U-questionMark").value;
    if (!correctOption || !title || !op1 || !op2 || !op3 || !op4 || !mark) {
        document.getElementById("error").style.display = "block";
        return;
    }
    list[index].title = title;
    list[index].option1 = op1;
    list[index].option2 = op2;
    list[index].option3 = op3;
    list[index].option4 = op4;
    list[index]["correct-option"] = correctOption;
    list[index].mark = mark;
    course.Questions = list;
    Courses.forEach((c) => { if (c.title === (course === null || course === void 0 ? void 0 : course.title))
        c.Questions = list; });
    quizRepo.updateCourse(Courses);
    document.getElementById("updateQuestion").style.display = "none";
    handleClick();
}
const del_btn = document.getElementById("course-delete");
del_btn.addEventListener('click', deleteCourse);
function deleteCourse() {
    if (quizDropdown.value === "") {
        alert("Select a course");
        return;
    }
    course = quizRepo.getCourse(Courses, quizDropdown.value);
    Courses = Courses.filter((ele) => ele.title !== (course === null || course === void 0 ? void 0 : course.title));
    quizRepo.updateCourse(Courses);
    Users.forEach((ele) => {
        ele.CourseAttempted = ele.CourseAttempted.filter((e) => e !== (course === null || course === void 0 ? void 0 : course.title));
    });
    userRepo.updateUser(Users);
    window.alert("Course Deleted Successfully");
    location.reload();
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
/******/ 	var __webpack_exports__ = __webpack_require__("./EditQuiz/EditQuiz.ts");
/******/ 	
/******/ })()
;
//# sourceMappingURL=EditQuiz.bundle.js.map
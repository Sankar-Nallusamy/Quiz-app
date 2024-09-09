/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./Index/index.ts":
/*!************************!*\
  !*** ./Index/index.ts ***!
  \************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
const UserRepo_1 = __importDefault(__webpack_require__(/*! ../Repo/UserRepo */ "./Repo/UserRepo.ts"));
const usererror = document.getElementById("user-error");
const passerror = document.getElementById("pass-error");
const userRepo = new UserRepo_1.default();
const users = userRepo.getAll();
const form = document.getElementById("login-form");
form.addEventListener("submit", handleSubmit);
function handleSubmit(event) {
    const email = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    event.preventDefault();
    if (email === "admin@gmail.com" && password === "1234") {
        window.location.href = "Admin.html";
        return;
    }
    const user = userRepo.getUser(users, email);
    if (!user) {
        usererror.style.display = "block";
    }
    else if (user.password === password) {
        sessionStorage.setItem("current-user", user.name);
        sessionStorage.setItem("current-mail", user.email);
        window.location.href = "CourseSelection.html";
    }
    else {
        passerror.style.display = "block";
    }
}


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
/******/ 	var __webpack_exports__ = __webpack_require__("./Index/index.ts");
/******/ 	
/******/ })()
;
//# sourceMappingURL=Index.bundle.js.map
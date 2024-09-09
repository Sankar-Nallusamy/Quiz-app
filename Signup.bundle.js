/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

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


/***/ }),

/***/ "./Signup/Signup.ts":
/*!**************************!*\
  !*** ./Signup/Signup.ts ***!
  \**************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a, _b, _c;
Object.defineProperty(exports, "__esModule", ({ value: true }));
const UserRepo_1 = __importDefault(__webpack_require__(/*! ../Repo/UserRepo */ "./Repo/UserRepo.ts"));
const userRepo = new UserRepo_1.default();
const Users = userRepo.getAll();
let isValid = false;
const emailerror = document.getElementById("email-error");
const passworderror = document.getElementById("password-error");
(_a = document.getElementById("signup-form")) === null || _a === void 0 ? void 0 : _a.addEventListener('submit', handleSubmit);
(_b = document.getElementById("email")) === null || _b === void 0 ? void 0 : _b.addEventListener('blur', validateEmail);
(_c = document.getElementById("confirm_password")) === null || _c === void 0 ? void 0 : _c.addEventListener("input", validatePass);
function validateEmail(event) {
    const target = event.target;
    if (Users.length < 1) {
        isValid = true;
    }
    else {
        if (userRepo.getUser(Users, target.value)) {
            emailerror.style.display = "block";
            isValid = false;
        }
        else {
            emailerror.style.display = "none";
            isValid = true;
        }
    }
}
// Function to validate the password and confirm password inputs
function validatePass(event) {
    const pass = document.getElementById("password");
    const confirm_pass = event.target;
    if (pass.value === confirm_pass.value) {
        passworderror.style.display = "none";
    }
    else {
        passworderror.style.display = "block";
    }
}
// Function to handle the form submission
function handleSubmit(event) {
    event.preventDefault();
    if (isValid) {
        const name = document.getElementById("username");
        const mail = document.getElementById("email");
        const pass = document.getElementById("password");
        const confirm_pass = document.getElementById("confirm_password");
        if (pass.value === confirm_pass.value) {
            console.log("Success");
            userRepo.createUser(name.value, mail.value, pass.value, []);
            window.location.href = "index.html";
        }
    }
}


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
/******/ 	var __webpack_exports__ = __webpack_require__("./Signup/Signup.ts");
/******/ 	
/******/ })()
;
//# sourceMappingURL=Signup.bundle.js.map
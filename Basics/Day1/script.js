const form = document.querySelector("#form1");

const nameInput = document.querySelector("#name");
const emailInput = document.querySelector("#email");
const passwordInput = document.querySelector("#password");
const confirmPasswordInput = document.querySelector("#confirmPassword");
const ageInput = document.querySelector("#age");

const nameError = document.querySelector("#nameError");
const emailError = document.querySelector("#emailError");
const passwordError = document.querySelector("#passwordError");
const confirmPasswordError = document.querySelector("#confirmPasswordError");
const ageError = document.querySelector("#ageError");


// ===============================
// NAME VALIDATION
// ===============================

nameInput.addEventListener("input", function () {

    const name = nameInput.value.trim();

    if (name.length < 3) {
        nameError.textContent = "Name must be at least 3 characters";
    } else {
        nameError.textContent = "";
    }

});


// ===============================
// EMAIL VALIDATION
// ===============================

emailInput.addEventListener("input", function () {

    const email = emailInput.value.trim();

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(email)) {
        emailError.textContent = "Enter a valid email";
    } else {
        emailError.textContent = "";
    }

});


// ===============================
// PASSWORD VALIDATION
// ===============================

passwordInput.addEventListener("input", function () {

    const password = passwordInput.value;

    if (password.length < 8) {
        passwordError.textContent =
            "Password must be at least 8 characters";
    } else {
        passwordError.textContent = "";
    }

    // Also check confirm password
    if (confirmPasswordInput.value !== password) {
        confirmPasswordError.textContent =
            "Passwords do not match";
    } else {
        confirmPasswordError.textContent = "";
    }

});


// ===============================
// CONFIRM PASSWORD VALIDATION
// ===============================

confirmPasswordInput.addEventListener("input", function () {

    if (confirmPasswordInput.value !== passwordInput.value) {
        confirmPasswordError.textContent =
            "Passwords do not match";
    } else {
        confirmPasswordError.textContent = "";
    }

});


// ===============================
// AGE VALIDATION
// ===============================

ageInput.addEventListener("input", function () {

    const age = Number(ageInput.value);

    if (age < 18) {
        ageError.textContent = "Age must be 18 or above";
    } else {
        ageError.textContent = "";
    }

});


// ===============================
// FORM SUBMIT
// ===============================

form.addEventListener("submit", function (event) {

    event.preventDefault();

    // Clear previous errors
    nameError.textContent = "";
    emailError.textContent = "";
    passwordError.textContent = "";
    confirmPasswordError.textContent = "";
    ageError.textContent = "";

    // Get values
    const name = nameInput.value.trim();
    const email = emailInput.value.trim();
    const password = passwordInput.value;
    const confirmPassword = confirmPasswordInput.value;
    const age = Number(ageInput.value);

    let valid = true;


    // Name
    if (name.length < 3) {
        nameError.textContent =
            "Name must be at least 3 characters";

        valid = false;
    }


    // Email
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(email)) {
        emailError.textContent =
            "Enter a valid email";

        valid = false;
    }


    // Password
    if (password.length < 8) {
        passwordError.textContent =
            "Password must be at least 8 characters";

        valid = false;
    }


    // Confirm Password
    if (password !== confirmPassword) {
        confirmPasswordError.textContent =
            "Passwords do not match";

        valid = false;
    }


    // Age
    if (age < 18) {
        ageError.textContent =
            "Age must be 18 or above";

        valid = false;
    }


    // Final result
    if (valid) {
        alert("Registration Successful");
    }

});
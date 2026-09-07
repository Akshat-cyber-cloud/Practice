const form = document.querySelector("#form1");

const nameInput = document.querySelector("#name");
const emailInput = document.querySelector("#email");
const passwordInput = document.querySelector("#password");

const nameError = document.querySelector("#nameError");
const emailError = document.querySelector("#emailError");
const passwordError = document.querySelector("#passwordError");

form.addEventListener("submit", function(event){
    event.preventDefault();

    nameError.textContent = "";
    emailError.textContent = "";
    passwordError.textContent = "";

    const name = nameInput.value.trim();
    const email = emailInput.value.trim();
    const password = passwordInput.value;

    let isValid = true;

    if(name === ""){
        nameError.textContent = "Name can't br empty"
        isValid = false;
    }else if(name.length < 3){
        nameError.textContent = "Name must be at least 3 characters";
        isValid = false;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if(email === ""){
        emailError.textContent = "Email can't be empty";
        isValid = false;
    }else if(!emailPattern.test(email)){
        emailError.textContent = "Enter a valid email address"
        isValid = false;
    }


    if(password === ""){
        passwordError.textContent = "password can't be empty";
        isValid = false;
    }else if(password.length < 8){
        passwordError.textContent = "Password must be at least 8 chars"
        isValid = false;
    }

    if(isValid){
        alert("Form submitted successfully!");
        form.reset();
    }
})


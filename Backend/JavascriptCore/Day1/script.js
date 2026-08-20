const toggleBtn = document.getElementById("ToggleBtn");
const secretBox = document.getElementById("secretbox");
const themeBtn = document.getElementById("ThemeBtn");

toggleBtn.addEventListener('click', () => {
    secretBox.classList.toggle('hidden');

    if(secretBox.classList.contains('hidden')){
        toggleBtn.textContent = "Show";
    }
    else{
        toggleBtn.textContent = "Hide";
    }
});

themeBtn.addEventListener('click', () => {
     document.documentElement.classList.toggle('dark-mode');

     if(document.documentElement.classList.contains('dark-mode')){
        themeBtn.textContent = "Light Mode";
     }
     else{
        themeBtn.textContent = "Dark Mode";
     }
});

const toggleBtn = document.getElementById('toggleBtn');
const secretBox = document.getElementById('secretBox');
const themeBtn = document.getElementById('themeBtn');

toggleBtn.addEventListener('click', () => {
    secretBox.classList.toggle('hidden');

    if(secretBox.classList.contains('hidden')){
        toggleBtn.textContent = 'Show';
    }else{
        toggleBtn.textContent = 'Hide';
    }
});

themeBtn.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');

    if(document.body.classList.contains('dark-mode')){
        themeBtn.textContent = 'Light Mode';
    }else{
        themeBtn.textContent = 'Dark Mode';
    }
});
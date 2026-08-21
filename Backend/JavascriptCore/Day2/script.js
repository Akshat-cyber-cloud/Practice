const IncreaseCount = document.getElementById("inc");
const DecreaseCount = document.getElementById("dec");
const ResetCount = document.getElementById("reset");
const Count = document.getElementById("count");

IncreaseCount.addEventListener("click", () => {
    Count.innerText++;
});

DecreaseCount.addEventListener("click", () => {
    if(Count.innerText > 0){
        Count.innerText--;
    }
});

ResetCount.addEventListener("click", () => {
    Count.innerText = 0;
});


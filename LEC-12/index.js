const box = document.getElementById("mydiv");
const btn = document.querySelector(".btn");
const stopBtn = document.getElementById("stopBtn");
let id=null;


const colors = [
    "red", "blue", "green", "yellow", "purple", "orange",
    "pink", "cyan", "lime", "brown", "magenta", "teal"
];

function generateRondomColor(){
    const index = Math.floor(Math.random() * colors.length);
    box.style.backgroundColor = colors[index];
    let randomColor= colors[index];
    console.log(index)
    console.log(randomColor);
}
btn.addEventListener("click", () => {
    id=setInterval(()=>{
        generateRondomColor()
    },500)
});

stopBtn.addEventListener("click", () => {
   if(id){
    clearInterval(id);
   }
});
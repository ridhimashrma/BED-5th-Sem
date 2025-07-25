//accessing dom manipulation


//1.) using id
let res=document.getElementById("mydiv");
// console.log(res);
console.dir(res);

//2.) using class anme
let h2=document.getElementsByClassName("h2")
console.log(h2) //we will get collection/list
console.log(h2[0])

//3.) using tag name
let res2=document.getElementsByTagName("p")
console.log(res2) //we will get collection/list

//4.) queryselector
let out=document.querySelector("#mydiv")  // "." for class and "#" for id   //ret type object

let out2=document.querySelectorAll("p")  // ret type collection [nodelist]
console.log(out2)



//document properties
//1. accessing element content 
//* innerHtml
console.log(res.innerHTML) //getter

//res.innerHTML=`<p> change using dom manipulation </p>`


//---------- difference between innertext and textcontent---------------//


//* innerText
console.log(res.innerText)
res.innerText=`hello world` //setter

//* textContent 


//accessing elements class or id or etc.
//1. getAttributes 
// console.log(res.getAttribute("id"))
 let btn=document.querySelector(".btn")
// btn.addEventListener("click",()=>{
//     res.setAttribute("class","js")
// })


//2. only for class attribute
//* classList
let myH=document.querySelector(".myH")
console.log(myH.classList)
myH.classList.add("hi")
myH.classList.remove("myH")

let form= document.querySelector(".signup")
btn.addEventListener("click",()=>{
    form.classList.toggle("hide")
})
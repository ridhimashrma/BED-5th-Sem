const ebtn=document.querySelector(".edit");
const dbtn=document.querySelector(".delete");


// parent
// child
// siblings


//1. nextElementSibling
//2. previousElementSibling



console.log(ebtn.nextElementSibling)
console.log(ebtn.previousElementSibling)
console.log(ebtn.nextElementSibling.nextElementSibling.innerText)
//h1
console.log(ebtn.parentElement.previousElementSibling)


//li and then retrieve id

console.log(dbtn.parentElement.parentElement.parentElement.getAttribute("id"))







// ebtn.addEventListener("click", () => {
//     console.log("Edit button");
// });

// dbtn.addEventListener("click", () => {
//     console.log("Delete button");
// });
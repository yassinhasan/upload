
if (localStorage.getItem("light_theme") === null) {
    localStorage.setItem("light_theme","light")
}
if(localStorage.getItem("light_theme") === "")
{
    document.body.classList.remove("light")
}else{
    document.body.classList.add("light")
}

let fa_moon = document.querySelector(".fa-moon");

fa_moon.addEventListener("click",()=>{
   
    if (localStorage.getItem("light_theme") === "light") {
        localStorage.setItem("light_theme","")
    }else{
        localStorage.setItem("light_theme","light")
    }
    document.body.classList.toggle("light");
  
})



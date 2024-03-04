let spinners = document.querySelector(".spinners");
let overlay = document.querySelector(".overlay");


function showSpinner()
{
    overlay.style.display="block"
    spinners.style.display="block"
}

function hideSpinner()
{
    overlay.style.display="none"
    spinners.style.display="none"
}


function hideRegistermodal()
{
    const register_modal = document.querySelector('.register-modal');
    const modal_r = bootstrap.Modal.getInstance(register_modal);    
    modal_r.hide();
    // hide register button
    // show exit button
    // here we will do every thing
}
function hideSignInmodal()
{
    const sign_modal = document.querySelector('.signin-modal');
    const modal = bootstrap.Modal.getInstance(sign_modal);    
    modal.hide();
    // hide register button
    // show exit button
    // here we will do every thing
}

let sign_in = document.querySelector(".sign-in");
let register = document.querySelector(".register");
let logout = document.querySelector(".logout");
let profile = document.querySelector(".profile");
let name_area = document.querySelector(".name-area");

function repareLoggedInUserElements(user)
{
    sign_in.style.display="none"
    register.style.display="none"
    logout.style.display="inline-block"
    profile.style.display="none"
    name_area.style.display="none"
}
function repareGuestElements()
{
    sign_in.style.display="inline-block"
    register.style.display="inline-block"
    logout.style.display="none"
    profile.style.display="block"
    name_area.style.display="flex"
}
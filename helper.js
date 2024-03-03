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
    const modal = bootstrap.Modal.getInstance(register_modal);    
    modal.hide();
    // hide register button
    // show exit button
    // here we will do every thing
}
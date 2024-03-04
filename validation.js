// ELEMEN TS IN HTML
// invalid email in register
let invalid_email = document.querySelector(".invalid-email");
let invalid_username = document.querySelector(".invalid-username");
let invalid_password = document.querySelector(".invalid-password");

let invalid_email_l = document.querySelector(".invalid-email-login");
let invalid_password_l = document.querySelector(".invalid-password-login");

var username_r = document.getElementById('username-r');
var email_r = document.getElementById('email-r');
var password_r = document.getElementById('password-r');


var email_input = document.getElementById('email');
var password_input = document.getElementById('password');



function isEmptyRegisterfields()
{

    let isValid = true;
    if(username_r.value.trim() === "" || username_r.value.trim() === null)
    {
      showRegistererror("empty-username","you shoud enter username");
      isValid = false;
    }
    if(email_r.value.trim() === "" || email_r.value.trim() ===  null)
    {
      showRegistererror("empty-email","you shoud enter email");
      isValid = false;
    }
    if(password_r.value.trim() === "" || password_r.value.trim() ===null)
    {
      showRegistererror("empty-password","you shoud enter password");
      isValid = false;
    }

    return isValid;
}
function isEmptyLoginfields()
{

    let isValid = true;

    if(email_input.value.trim() === "" || email_input.value.trim() ===  null)
    {
      showRegistererror("empty-email","you shoud enter email");
      isValid = false;
    }
    if(password_input.value.trim() === "" || password_input.value.trim() ===null)
    {
      showRegistererror("empty-password","you shoud enter password");
      isValid = false;
    }
    return isValid;
}

function showRegistererror(errorCode,errorMessage) {


  switch (errorCode) {
    case "auth/invalid-email":
        invalid_email.style.display = "block";
        invalid_email.innerHTML = "this email is invalid"
        break;
    case "auth/email-already-in-use":
        invalid_email.style.display = "block";
        invalid_email.innerHTML = "this email is alraeady exists"
        break;

    case "auth/missing-password":
        invalid_password.style.display = "block";
        invalid_password.innerHTML = "you shoud enter password"
        break;
    case "auth/weak-password":
        invalid_password.style.display = "block";
        invalid_password.innerHTML = "you shoud enter  strong password"
        break;
    case "empty-username":
        invalid_username.style.display = "block";
        invalid_username.innerHTML = errorMessage
        break;
    case "empty-email":
        invalid_email.style.display = "block";
        invalid_email.innerHTML = errorMessage
        break;
    case "empty-password":
        invalid_password.style.display = "block";
        invalid_password.innerHTML = errorMessage
        break;
    case "empty-email-login":
        invalid_email_l.style.display = "block";
        invalid_email_l.innerHTML = errorMessage
        break;
    case "empty-password-login":
        invalid_password_l.style.display = "block";
        invalid_password_l.innerHTML = errorMessage
        break;
    case "auth/invalid-credential":
      invalid_email_l.style.display = "block";
      invalid_email_l.innerHTML = "soory email or password is invalid"
        break;
    
    default:

        break;
  }

}
function hideRegistererror() {

  invalid_email.style.display = "none";
  invalid_email.innerHTML = ""
   
  invalid_username.style.display = "none";
  invalid_username.innerHTML = ""

  invalid_password.style.display = "none";
  invalid_password.innerHTML = ""

  invalid_email_l.style.display = "none";
  invalid_email_l.innerHTML = ""
   

  invalid_password_l.style.display = "none";
  invalid_password_l.innerHTML = ""
}
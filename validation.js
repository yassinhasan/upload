// ELEMEN TS IN HTML
// invalid email in register
let invalid_email = document.querySelector(".invalid-email");
let invalid_username = document.querySelector(".invalid-username");
let invalid_password = document.querySelector(".invalid-password");

var username_r = document.getElementById('username-r');
var email_r = document.getElementById('email-r');
var password_r = document.getElementById('password-r');



function isEmptyfields()
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
}
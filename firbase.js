import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-app.js";
import { getDatabase, ref, set } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-database.js";
import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-auth.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-analytics.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDEi2XLHPBDJ6mesKhaJnRWyNyKG4CJdkk",
  authDomain: "uplaod-now.firebaseapp.com",
  projectId: "uplaod-now",
  storageBucket: "uplaod-now.appspot.com",
  messagingSenderId: "584367053002",
  appId: "1:584367053002:web:470a853d95f5f02e263c33",
  measurementId: "G-QYFBWR04Z5"
};

// Initialize Firebase
const firebase = initializeApp(firebaseConfig);
const analytics = getAnalytics(firebase);
// Set database variable
const db = getDatabase(firebase);
const auth = getAuth();

// register
let register_btn = document.querySelector(".register-btn");
register_btn.addEventListener("click", (e) => {
  e.preventDefault();
  register()
})


function get() {
  var username = document.getElementById('username').value

  var user_ref = db.ref('users/' + username)
  user_ref.on('value', function (snapshot) {
    var data = snapshot.val()



  })

}

function update() {
  var username = document.getElementById('username').value
  var email = document.getElementById('email').value
  var password = document.getElementById('password').value

  var updates = {
    email: email,
    password: password
  }

  db.ref('users/' + username).update(updates)

  alert('updated')
}

function remove() {
  var username = document.getElementById('username').value

  db.ref('users/' + username).remove()

  alert('deleted')
}

function register() {
  showSpinner();
  hideRegistererror();
  if(!isEmptyfields())
  {  
    hideSpinner()
    return;
  }

  createUserWithEmailAndPassword(auth,email_r.value,password_r.value)
    .then((userCredential) => {
      hideSpinner();
      // save user in database
      // Signed up 
      const user = userCredential.user;
      saveUserinDatabase(user)
      hideRegistermodal()
      // ...
    })
    .catch((error) => {
      hideSpinner()
      const errorCode = error.code;
      console.log(errorCode);
      const errorMessage = error.message;
      showRegistererror(errorCode,errorMessage)
    });

}


function saveUserinDatabase(user)
{

  set(ref(db, 'users/' + user.userId), {
    username: username_r.value,
    email: user.email,
    password: password_r.value
   
  })
  .then(() => {
    const Toast = Swal.mixin({
      toast: true,
      position: "top-end",
      showConfirmButton: false,
      timer: 3000,
      color: "#b58126",
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.onmouseenter = Swal.stopTimer;
        toast.onmouseleave = Swal.resumeTimer;
      }
    });
    Toast.fire({
      icon: "success",
      title: "Registered in successfully"
    }); // end of alert
  })
  .catch((error) => {
    // The write failed...
    console.log(error);
    const Toast = Swal.mixin({
      toast: true,
      position: "top-end",
      showConfirmButton: false,
      timer: 3000,
      color: "#b52626",
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.onmouseenter = Swal.stopTimer;
        toast.onmouseleave = Swal.resumeTimer;
      }
    });
    Toast.fire({
      icon: "error",
      title: error
    }); // end of alert
  });
}

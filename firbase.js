import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-app.js";
import { getDatabase, ref, set, onValue } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-database.js";
import { getAuth, createUserWithEmailAndPassword, onAuthStateChanged, signOut, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-auth.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-analytics.js";
import { getStorage } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-storage.js";
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
let register_btn = document.querySelector(".register-btn-modal");
register_btn.addEventListener("click", (e) => {
  e.preventDefault();
  register()
})


function register() {
  showSpinner();
  hideRegistererror();
  if (!isEmptyRegisterfields()) {
    hideSpinner()
    return;
  }
  if (!isNotvalidUsername()) {
    hideSpinner()
    return;
  }

  let emailValue = email_r.value.trim();
  let passwordValue = password_r.value.trim();
  createUserWithEmailAndPassword(auth, emailValue,passwordValue)
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
      //   console.log(errorCode);
      const errorMessage = error.message;
      showRegistererror(errorCode, errorMessage)
    });

}


// sign in
let sign_in_btn = document.querySelector(".login-btn-modal");
sign_in_btn.addEventListener("click", (e) => {
  e.preventDefault();

  login()
})

function login() {
  showSpinner();
  hideRegistererror();
  if (!isEmptyLoginfields()) {

    hideSpinner()
    return;
  }

  let emailLoggedValue = email_input.value.trim();
  let passwordLoggedValue = password_input.value.trim();
  signInWithEmailAndPassword(auth, emailLoggedValue, passwordLoggedValue)
    .then((userCredential) => {
      // Signed in 
      const user = userCredential.user;
      hideSignInmodal()

      let loggedUser = getUserDataFromDatabase(user.uid)
      repareLoggedInUserElements(loggedUser);
      // ...
    })
    .catch((error) => {
      hideSpinner()
      const errorCode = error.code;
      console.log(errorCode);
      const errorMessage = error.message;
      showLoginerror(errorCode, errorMessage)
    });
}

// check if user logged or not
isLogged()
function isLogged() {

  onAuthStateChanged(auth, (user) => {

    if (user) {

      // User is signed in, see docs for a list of available properties
      // https://firebase.google.com/docs/reference/js/auth.user
      const uid = user.uid;


      getUserDataFromDatabase(uid)
     
      // repareLoggedInUserElements(loggedUser);

      //  console.log(user)
      // ...
    } else {
      // User is signed out
      // ...

      repareGuestElements()
      hideSpinner()
      //  console.log("not logged")
    }
  });
}


async function getUserDataFromDatabase(uid) {
  //  const userData = ref(db, 'users/' + uid );
  // onValue(userData, (snapshot) => {
  //   return   snapshot.val();

  // });

  let myPromise = new Promise(function (resolve) {
    const userData = ref(db, 'users/' + uid);
    onValue(userData, (snapshot) => {
      ;
      resolve(snapshot.val());
    });
  });
  myPromise.then(user =>{
    repareLoggedInUserElements(user)
    hideSpinner()
  } ).catch(error=>console.log(error))
 
  
}

function saveUserinDatabase(user) {

  console.log(user.uid)
  set(ref(db, 'users/' + user.uid), {
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

// logout
let logoutBtn = document.querySelector(".logout");

logoutBtn.addEventListener("click", (e) => {
  e.preventDefault()
  logoutUser()
})

function logoutUser() {
  signOut(auth).then(() => {
    repareGuestElements();

  }).catch((error) => {
    console.log(error)
  });
}


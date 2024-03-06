import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-app.js";
import { getDatabase, ref, set, onValue } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-database.js";
import { getAuth, createUserWithEmailAndPassword, onAuthStateChanged, signOut, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-auth.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-analytics.js";
import { getStorage, ref as storageRef, uploadBytes, uploadBytesResumable, getDownloadURL, listAll, getMetadata } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-storage.js";

// Initialize Firebase
const firebase = initializeApp(firebaseConfig);
const analytics = getAnalytics(firebase);
// Set database variable
const db = getDatabase(firebase);
const auth = getAuth();
const storage = getStorage(firebase);






listFiles()
function listFiles() {

    onAuthStateChanged(auth, (user) => {
        if (user) {
            const uid = user.uid;
            // Create a reference under which you want to list
            const listRef = storageRef(storage, `users/${uid}/`);
            // Find all the prefixes and items.

            listAll(listRef)
                .then((res) => {
                    prepraListFilesHtml(uid,res)
                }).catch((error) => {
                    // Uh-oh, an error occurred!
                    console.log(error);
                });
        } else {
            console.log("user not signed in")
        }
    });

}

function prepraListFilesHtml(uid,res)
{
    let cardWraper = document.querySelector(".card-wraper");
    cardWraper.innerHTML = "";
    res.items.forEach((itemRef) => {
        let fileName = itemRef.name;
        let downloadURL ;
        let fileSize;
        let fileDate  ;
        getDownloadURL(storageRef(storage, `users/${uid}/${fileName}`))
            .then((url) => {
                downloadURL = url;
             
            })
            .catch((error) => {
                // Handle any errors
            });

        getMetadata(storageRef(storage, `users/${uid}/${fileName}`))
            .then((metadata) => {
                fileName = metadata.name;
                (metadata.size < 1024) ? fileSize = metadata.size + " KB" : fileSize = (metadata.size / (1024 * 1024)).toFixed(2) + " MB";
               
                fileDate = new Date(metadata.timeCreated)
                 fileDate = fileDate.getDate()  + "-" + (fileDate.getMonth()+1) + "-" + fileDate.getFullYear() ;
                 let cardItem = `
                 <div class="row file-card">
                 <div class="card" style="width: 18rem;">
                   <i class="fas fa-file-alt"></i>
                   <div class="card-body">
                     <h5 class="file-title">${fileName}</h5>
                     <h5 class="file-date">${fileDate}</h5>
                     <h5 class="file-size">Size:<span>${fileSize}</span></h5>
                   </div>
                   <div class="card-body">
                     <a href="${downloadURL}" class="card-link download"><i class="fa-solid fa-download"></i></a>
                     <a href="#" class="card-link delete"><i class="fa-solid fa-trash"></i></a>
                   </div>
                 </div>
                 </div>
                 `;
                 cardWraper.innerHTML += cardItem;   
            })
            .catch((error) => {
                // Uh-oh, an error occurred!
            });
    });


}
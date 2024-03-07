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
const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Octr", "Nov", "Dec"];


const myModal = document.querySelector('.files-modal')
let cardWraper = document.querySelector(".card-wraper");


myModal.addEventListener('shown.bs.modal', () => {

    showFilesSpinner()
    cardWraper.innerHTML = "";
    listFiles()

})


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
                    hideFilseSpinner()
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
    let files = res.items;
    for (let index =  files.length - 1  ; index >= 0; index--) {
        let fileName = files[index].name;
        let downloadURL ;
        let fileSize;
        let fileDate  ;
        let fileExtension ;
        getDownloadURL(storageRef(storage, `users/${uid}/${fileName}`))
            .then((url) => {
                downloadURL = url;
             
            })
            .catch((error) => {
                // Handle any errors
            });

        getMetadata(storageRef(storage, `users/${uid}/${fileName}`))
            .then((metadata) => {
                fileName = metadata.name
                let splitName = fileName.split('.');
                fileExtension = splitName[splitName.length - 1];
                if (fileName.length >= 17) {
                    fileName = splitName[0].substring(0, 15) + "..." + fileExtension;
                }
                (metadata.size < 1024) ? fileSize = metadata.size + " KB" : fileSize = (metadata.size / (1024 * 1024)).toFixed(2) + " MB";
               
                fileDate = new Date(metadata.timeCreated)
                 fileDate = fileDate.getDate()  + "-" + (months[fileDate.getMonth()]) + "-" + fileDate.getFullYear() 
                 +" " +
                 fileDate.getHours() + ":" + fileDate.getMinutes(); ;
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
                     <a href="${downloadURL}" class="card-link download" target="_blank"><i class="fa-solid fa-download"></i></a>
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
    };


}
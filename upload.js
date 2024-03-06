import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-app.js";
import { getDatabase, ref, set, onValue } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-database.js";
import { getAuth, createUserWithEmailAndPassword, onAuthStateChanged, signOut, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-auth.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-analytics.js";
import { getStorage, ref as storageRef, uploadBytes ,uploadBytesResumable ,getDownloadURL  } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-storage.js";


// Initialize Firebase
const firebase = initializeApp(firebaseConfig);
const analytics = getAnalytics(firebase);
// Set database variable
const db = getDatabase(firebase);
const auth = getAuth();
const storage = getStorage(firebase);



const database = getDatabase();
const dropArea = document.querySelector(".upload-form"),
    dropText = dropArea.querySelector(".drop-text") ,
    fileInput = document.querySelector(".file-input"),
    progressArea = document.querySelector(".progress-area"),
    uploadedArea = document.querySelector(".uploaded-area");
let file;
let fileName;
let progressValue;
let fileSize;

dropArea.addEventListener("click", () => {
    fileInput.click();
});


fileInput.onchange = ({ target }) => {
    file = target.files[0];
    if (file) {
         fileName = file.name;
        if (fileName.length >= 12) {
            let splitName = fileName.split('.');
            fileName = splitName[0].substring(0, 8) + "..." + splitName[1];
        }
        
      
        (file.size < 1024) ? fileSize = file.size + " KB" : fileSize = (file.size / (1024 * 1024)).toFixed(2) + " MB";
       
        uploadFile()

    }
}


function uploadFile() {
    
    onAuthStateChanged(auth, (user) => {
        if (user) {
            const uid = user.uid;
            const usersRef = storageRef(storage, `users/${uid}/${fileName}`);
            const uploadTask = uploadBytesResumable(usersRef, file);
            uploadTask.on('state_changed',
                (snapshot) => {
                    // Observe state change events such as progress, pause, and resume
                    // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
                    const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
                    progressDownload(progress)
                    switch (snapshot.state) {
                        case 'paused':
                            console.log('Upload is paused');
                            break;
                        case 'running':
                            console.log('Upload is running');
                            break;
                    }
                },
                (error) => {
                    // Handle unsuccessful uploads
                },
                () => {
                    // Handle successful uploads on complete
                    // For instance, get the download URL: https://firebasestorage.googleapis.com/...
                    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                        completeDownload(downloadURL)
                       
                    })
                }
            );

            // ...
        } else {
            console.log("user not signed in")
        }
    });

}

function progressDownload(progress) {

    let progressHTML = `<li class="upload-row">
                            <i class="fas fa-file-alt"></i>
                            <div class="content">
                              <div class="details">
                                <span class="name">${fileName} (${fileSize})</span>
                                <span class="percent">${progress}%</span>
                              </div>
                              <div class="progress-bar">
                                <div class="progress" style="width: ${progress}%"></div>
                              </div>
                            </div>
                          </li>`;
    uploadedArea.classList.add("onprogress");
    progressArea.innerHTML = progressHTML;


}
function completeDownload(link)
{
 
    progressArea.innerHTML = "";
        let uploadedHTML = `<li class="upload-row">
                              <div class="content upload">
                                <i class="fas fa-file-alt"></i>
                                <div class="details">
                                  <span class="name">${fileName} (${fileSize})</span>
                                </div>
                              </div>
                              <div class="fenished">
                              <i class="fas fa-check"></i>
                              <a calss="downloaded-link" href="${link}" target="_blank"> <i class="fa-solid fa-download "></a></i>
                              </div>

                            </li>`;
    uploadedArea.classList.remove("onprogress");
    uploadedArea.classList.remove("hide");
    uploadedArea.insertAdjacentHTML("afterbegin", uploadedHTML);
    

}


//If user Drag File Over DropArea
dropArea.addEventListener("dragover", (event)=>{
    event.preventDefault(); //preventing from default behaviour
    dropArea.classList.add("active");
    dropText.textContent = "Release to Upload File";
  });
  //If user leave dragged File from DropArea
   dropArea.addEventListener("dragleave", ()=>{
    dropArea.classList.remove("active");
    dropText.textContent = "Drag & Drop to Upload File";
  });


  //If user drop File on DropArea
dropArea.addEventListener("drop", (event)=>{
    event.preventDefault(); //preventing from default behaviour
    //getting user select file and [0] this means if user select multiple files then we'll select only the first one
    dropArea.classList.remove("active");
    dropText.textContent = "Drag & Drop to Upload File";
    file = event.dataTransfer.files[0];
    if (file) {
         fileName = file.name;
        if (fileName.length >= 12) {
            let splitName = fileName.split('.');
            fileName = splitName[0].substring(0, 13) + "... ." + splitName[1];
        }
        
      
        (file.size < 1024) ? fileSize = file.size + " KB" : fileSize = (file.size / (1024 * 1024)).toFixed(2) + " MB";
       
        uploadFile()

    }
  });



// show all files

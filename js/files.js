import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-app.js";
import { getDatabase, ref, set, onValue } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-database.js";
import { getAuth, createUserWithEmailAndPassword, onAuthStateChanged, signOut, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-auth.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-analytics.js";
import { getStorage, ref as storageRef, uploadBytes, uploadBytesResumable, getDownloadURL, listAll, getMetadata , deleteObject} from "https://www.gstatic.com/firebasejs/10.8.1/firebase-storage.js";

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
let userFiles = document.querySelector(".user-files");
let filesBtn = document.querySelector(".files-btn");

userFiles.addEventListener("click",()=>{
    showFilesSpinner()
    $('#filesModal').modal('show')
    listFiles()
})
filesBtn.addEventListener("click",()=>{
    showFilesSpinner()
    $('#filesModal').modal('show')
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
    let originalName;
    let fileName ;
    let downloadURL ;
    let fileSize;
    let fileDate  ;
    let fileExtension ;
    cardWraper.innerHTML = "";
    if(files.length == 0)
    {
        cardWraper.innerHTML  =  `<div class="empty-files">you don't have any files yes</div>`;
        hideFilseSpinner();
        return;
    }
    for (let index =  files.length - 1  ; index >= 0; index--) {
          
         fileName =  files[index].name;
        
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
                     <a href="#" class="card-link delete" data-filename="${metadata.name}"><i class="fa-solid fa-trash"></i></a>
                   </div>
                 </div>
                 </div>
                 `;
                 cardWraper.innerHTML += cardItem;  
                
                 let fileDeleteBtns=  document.querySelectorAll(".card-link.delete");
                 fileDeleteBtns.forEach(fileDeleteBtn => {
                    fileDeleteBtn.addEventListener("click",(e)=>{
                     let fileToDeleted = fileDeleteBtn.getAttribute("data-filename");
                      
                        Swal.fire({
                            customClass: 'swal-height',
                            title: "Are you sure?",
                            text: "You won't be able to revert this!",
                            icon: "warning",
                            showCancelButton: true,
                            confirmButtonColor: "#3085d6",
                            cancelButtonColor: "#d33",
                            confirmButtonText: "Yes, delete it!"
                          }).then((result) => {
                            if (result.isConfirmed) {
                                const desertRef = storageRef(storage, `users/${uid}/${ fileToDeleted}`);
                                // Delete the file
                                deleteObject(desertRef).then(() => {
                                    Swal.fire({
                                        customClass: 'swal-height',
                                        title: "Deleted!",
                                        text: "Your file has been deleted.",
                                        icon: "success"
                                      });
                                      showFilesSpinner()
                                      cardWraper.innerHTML = "";
                                      listFiles()
                                  
                                }).catch((error) => {
                                    console.log(error);
                                });
 
                            }
                          });
                     });
                   
                 });

                 hideFilseSpinner()
            })

            .catch((error) => {
                console.log(error);
                hideFilseSpinner()
                // Uh-oh, an error occurred!
            });
    };


}

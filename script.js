const destination = document.getElementById("destForm")
destination.addEventListener("submit", handleForm)

 var photo = "https://images.unsplash.com/photo-1536098561742-ca998e48cbcc?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1362&q=80";



async function handleForm(evt) {
evt.preventDefault()
const form = evt.target

//Pull Form Info
const dest = form.dest_name.value
const loc = form.location.value
const desc = form.desc.value
//Check PhotoURL for blank. If blank, insert a default photoURL
//const photo = (form.photoURL.value === "") ? "https://images.unsplash.com/photo-1536098561742-ca998e48cbcc?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1362&q=80" : form.photoURL.value


    
 await GrabImage(dest);
//Create Functions For Card
    // Parent DIV for each card inside the "destcontainer"

    let card = document.createElement("div");
    card.setAttribute("class","card")
    card.setAttribute("style", "width: 18rem;")

  


    card.innerHTML = `
                    <img src="${photo}" class="card-img-top" alt="${dest}">
                    <div class="card-body">
                      <h5 class="card-title">${dest}</h5>
                      <h6> ${loc}</h6>
                      <p class="card-text">${desc}</p>
                      <a href="#" button="edit" class="btn btn-warning">Edit</a> | <a href="#" button="delete" class="btn btn-danger"> Delete </a>
                    </div>
                  `;
    document.getElementById("cardcontainer").appendChild(card)  
    
    card.addEventListener("click", buttonHandler)


// After submit, replace "Enter Destination Details" with "Wishlist" on Title
document.getElementById("title").innerText = "Wishlist "
resetForm(evt)

}

async function GrabImage(destination) {
    //Unsplash Images

const API = `https://api.unsplash.com/search/photos/?client_id=9xB6KzPdxq603YtE7BwTp5OsWNjOrLPRsSw_4XWKW0A&query=`
let dest = destination;
const searchURL = `${API}${dest}`
let ind = Math.floor(Math.random() * 10)
return fetch(searchURL)
    .then((response) => response.json())
    .then((pics) =>  photo = (pics.results[ind].urls.small)); // returns Array of objects
    
}


function buttonHandler(evt) {
    const event = evt.target
    if (event.getAttribute("button") === "delete") {
        deleteCard(evt)
    }
    else if (event.getAttribute("button") === "edit") {
       
        editCard(evt)
    }
}

function deleteCard(evt){
    const event = evt.target
    event.parentElement.parentElement.remove()
}
    
async function editCard(evt){
    const event = evt.target;
    const cardBody = event.parentElement.children

    console.log(event.parentElement.parentElement.children[0]);
    const oldDest = cardBody[0];
    const oldLoc = cardBody[1];
    //const oldPhoto = event.parentElement.parentElement.children[0];
    const oldDesc = cardBody[2];

    const newDest = prompt("Please enter a new Destination or cancel")
    const newLoc = prompt("Please enter a new Location or cancel")
    // const newPhoto = prompt("Please enter a new PhotoURL or cancel")
    const newDesc = prompt("Please enter a new description or cancel")

    if (newDest !== "") {
        oldDest.innerText = newDest;
    }
    if (newLoc !== "") {
        oldLoc.innerText = newLoc;
    }
    if (newDest !== "" && newDest !== null) {
       const photo = await GrabImage(newDest)
        oldPhoto.setAttribute("src", photo)
    } 

    
    if (newDesc !== "") {
        oldDesc.innerText = newDesc;
    }

}



//Reset Form to start once again
function resetForm(evt) {
    const form = evt.target
    form.dest_name.value = ""
    form.location.value = ""
//    form.photoURL.value = ""
    form.desc.value = ""
}


const baseURL = 'https://brian-destinations.herokuapp.com'

const destination = document.getElementById("destForm")
destination.addEventListener("submit", handleForm)


//Create Cards out of array elements in Database
const dbURL = `${baseURL}/destinations`
fetch(dbURL)
.then((response) => response.json())
.then((pics) =>  createCards(pics) );


//Reach out to API and Return DB Array of destinations
function createCards(destinations) {
for (dest of destinations) {
    const {id, name, location, photo, description } = dest

    createCard(id, name, location, photo, description)

    }
}


async function handleForm(evt) {
evt.preventDefault()
const form = evt.target

//Pull Form Info
const name = form.dest_name.value
const location = form.location.value
const description = form.desc.value
// let photo = await GrabImage(dest);

postDestination(name, location, description)
// After submit, replace "Enter Destination Details" with "Wishlist" on Title
document.getElementById("title").innerText = "Wishlist "
resetForm(evt)
}

function postDestination(nameArg, locationArg, descriptionArg) {
    const newDest = {
        name: nameArg,
        location: locationArg,
        description: descriptionArg
    }

    const postURL = `${baseURL}/destinations`
    fetch(postURL, {
        method: "POST",
        body: JSON.stringify(newDest),
        headers: {
            'Content-type': 'application/json; charset=UTF-8'
        } 
    })
    .then((response) => {response.json()
        console.log('heeeelp')})
    .then(response => { 
        location.reload()
        })
        
}

//Create Functions For Cards
    // Parent DIV for each card inside the "destcontainer"
function createCard(id, name, location, photo, description) {
    let card = document.createElement("div");
    card.setAttribute("class","card")
    card.setAttribute("style", "width: 18rem;")

    card.innerHTML = `
                    <img src="${photo}" class="card-img-top" alt="${name}">
                    <div class="card-body">
                      <h5 class="card-title">${name}</h5>
                      <h6> ${location}</h6>
                      <p class="card-text">${description}</p>
                      <a href="#" uid=${id} button="edit" class="btn btn-warning">Edit</a> | <a href="#" uid=${id} button="delete" class="btn btn-danger"> Delete </a>
                    </div>
                  `;
    document.getElementById("cardcontainer").appendChild(card)  
    
    card.addEventListener("click", buttonHandler)
}

async function GrabImage(destination) {
//Unsplash Images
const API = `https://api.unsplash.com/search/photos/?client_id=9xB6KzPdxq603YtE7BwTp5OsWNjOrLPRsSw_4XWKW0A&query=`
let dest = destination;
const searchURL = `${API}${dest}`
let ind = Math.floor(Math.random() * 10)
return fetch(searchURL)
    .then((response) => response.json())
    .then((pics) =>  pics.results[ind].urls.small); // returns Array of objects
    
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
    // const event = evt.target
    // event.parentElement.parentElement.remove()
    const id = evt.target.getAttribute("uid")
    const deleteURL = `${baseURL}/destinations/${id}`
    fetch(deleteURL,{
        method: "DELETE"
    })
    .then(res => {
    location.reload()
    })
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


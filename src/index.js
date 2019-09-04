document.addEventListener('DOMContentLoaded', () => {
  console.log('%c DOM Content Loaded and Parsed!', 'color: magenta')

  let imageId = `https://randopic.herokuapp.com/images/3344`

  const imageURL = `https://randopic.herokuapp.com/images/${imageId}`

  const likeURL = `https://randopic.herokuapp.com/likes/`

  const commentsURL = `https://randopic.herokuapp.com/comments/`





function fetchImg(){
  fetch(imageId)
  .then(resp => resp.json())
  .then(renderimages)
}


function fetchcoments(){
  fetch(commentsURL)
  .then(resp => resp.json())
  .then(renderimages)
}

fetchImg()
fetchcoments()

const imageCollection = document.getElementById('image_card')
function renderimages(image) {
  imageCollection.innerHTML = `<img src="${image.url}" class="image-avatar" />

  <div id="image_card" class="card col-md-4">
  <img src="" id="image" data-id=""/>
  <h4 id="name">${image.name}</h4>
  <span>Likes:
    <span id="likes">${image.like_count}</span>
  </span>
  <button class="like_button" data-id${image.id}>Like</button>
  <form id="comment_form">
    <input id="comment_input" type="text" name="comment" placeholder="Add Comment"/>
    <input type="submit" value="Submit"/>
  </form>`
}
})


const addForm = document.querySelector('#comment_form')
addForm.addEventListener('submit', function (event) {
  event.preventDefault()
  const comment = document.getElementById("comment_form").value
  
  fetch(commentsURL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
     comment: `${comment}`
    })
  })
    .then(resp => resp.json())
    .then(fetchImg)
})


const likeButton = document.querySelector('.like_button')
likeButton.addEventListener('click', function (event) {
  let likeButtonIsPressed = event.target.className === "like-btn"
  let subButtonIsPressed = event.target.className === "delete-btn"
  if (likeButtonIsPressed) {
    console.log('hi')
    let id = event.target.parentElement.dataset.id
    let like = event.target.previousElementSibling
    let likeCount = parseInt(event.target.previousElementSibling.innerText)
    like.innerText = `${++likeCount} likes`
fetch(`https://randopic.herokuapp.com/likes/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        likes: likeCount
      })
    })
    .then(response => response.json())
  }


  else if (subButtonIsPressed) {
    let id = event.target.parentElement.dataset.id
    fetch(`http://localhost:3000/images/${id}`, {
      method: 'POST'
    })
    .then(response => response.json())
    .then(fetchImg)
  }
})
















// document.querySelector('#new-quote-form').addEventListener('submit', function(event) { event.preventDefault() const newQ = document.getElementById("new-quote").value; const author = document.getElementById("author").value; fetch(`http://localhost:3000/quotes`, { method: 'POST', headers: { 'Content-Type': 'application/json', }, body: JSON.stringify({ quote: `${newQ}`, author: `${author}`, }) }) .then(resp => resp.json()) .then(fetchquotes) })






  // images.forEach(function(image) {
  //   likeBtn.innerHTML += `
  //   <li class='image-card' data-id=${image.id}>
  //   <blockimage class="blockimage">
  //     <p class="mb-0">${image.image}.</p>
  //     <footer class="blockimage-footer">${image.author}</footer>
  //     <br>
  //     <button class='btn-danger'>Delete</button>
  //   </blockimage>
  // </li>
  // `






//   fetchImg()


// function renderImageId(images) {
//   const imageCollection = document.getElementById('image_content')
//   imageCollection.innerHTML = "hi!"
//   images.forEach(function (image) {
//     imageCollection.innerHTML += `
//    <div class="card" data-id=${image.id}>
//         <h2>${image.name}</h2>
//         <img src="${image.image}" class="image-avatar" />
//         <p>${image.likes} Likes</p>
//         <button class="like-btn">Like <3</button>
//         <button class="delete-btn">Delete</button>
//    </div>
//   `
//   })}



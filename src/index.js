document.addEventListener('DOMContentLoaded', () => {
  console.log('%c DOM Content Loaded and Parsed!', 'color: magenta')

  let imageId = 3348 //Enter the id from the fetched image here

  const imageURL = `https://randopic.herokuapp.com/images/${imageId}`

  const likeURL = `https://randopic.herokuapp.com/likes/`

  const commentsURL = `https://randopic.herokuapp.com/comments/`

})

//STEP 1: Slap image with its likes and comments onto DOM on page load
document.addEventListener('DOMContentLoaded', () => {

  fetch("https://randopic.herokuapp.com/images/3348")
  .then(resp => resp.json())
  .then(imageData => {
    document.querySelector("#name").innerText = imageData.name
    document.querySelector("#image").src = imageData.url
    document.querySelector("#likes").innerText = imageData.like_count
    imageData.comments.forEach(element => {
    	let newComment = document.createElement("li")
    	newComment.innerText = element.content
      newComment.innerHTML += "<button id=delete>X</button>"
      newComment.dataset.id = element.id
    	document.querySelector("#comments").append(newComment)
    })
  })

})

//STEP 2 & 3: Post Like
document.querySelector("#like_button").addEventListener("click", e => {
  let likes = document.querySelector("#likes")
  likes.innerText = parseInt(likes.innerText) + 1
  fetch("https://randopic.herokuapp.com/likes", {
    method: "POST",
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({image_id: 3348})
  })
})

//STEP 4 & 5: Post Comment
document.querySelector("#comment_form").addEventListener("submit", e => {
  e.preventDefault()
  let newComment = document.createElement("li")
  let content = e.target.children[0].value
  newComment.innerText = content
  newComment.innerHTML += "<button id=delete>X</button>"
  document.querySelector("#comments").append(newComment)
  e.target.reset()
  fetch("https://randopic.herokuapp.com/comments", {
    method: "POST",
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({image_id: 3348, content: content})
  })
  .then(resp => resp.json())
  .then(commentData => {
    newComment.dataset.id = commentData.id
  })
})

//STEP 6: Delete Comment
document.querySelector("#comments").addEventListener("click", e => {
  if (e.target.id = "delete"){
    fetch(`https://randopic.herokuapp.com/comments/${e.target.parentElement.dataset.id}`, {
      method: "DELETE",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    })
    .then(response => response.json())
    .then(x => e.target.parentElement.remove())
  }
})

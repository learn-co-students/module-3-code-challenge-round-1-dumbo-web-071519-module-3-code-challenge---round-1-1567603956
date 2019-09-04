const imageURL = `https://randopic.herokuapp.com/images/3346`
const likeURL = `https://randopic.herokuapp.com/likes/`
const commentsURL = `https://randopic.herokuapp.com/comments/`
const imageNode = document.querySelector("#image")
const nameNode = document.querySelector("#name")
const likesNode = document.querySelector("#likes")
const commentsNode = document.querySelector("#comments")
const likeButton = document.querySelector("#like_button")
const commentForm = document.querySelector("#comment_form")

// 🌶🥑 Thank you so much for your hard work and the opportunity to retake. 🥑🌶
// I used defer instead of DOM content loaded and I placed the loadpage fetch
// in a function that is automatically called.

fetchImage()

function fetchImage() {
  fetch(imageURL)
  .then(resp => resp.json())
  .then(renderImageOnDom)
}

function renderImageOnDom(data){
  imageNode.src = data.url
  nameNode.innerText = data.name
  data.likes_count = data.likes_count || 0
  likesNode.innerText = data.likes_count
  data.comments.forEach(comment => {
    let commentLi = document.createElement("li")
    commentLi.innerHTML = comment.content
    commentsNode.append(commentLi)
  })
}

// Like Button Front End DOM Manipulation

likeButton.addEventListener("click", event => {
  console.log(likesNode.innerText)
  let toNum = Number(likesNode.innerText)
  toNum += 1
  likesNode.innerText = toNum
  postLike(toNum)
})

// Like Button Back End API Persistence

function postLike(likeCount) {
  fetch(likeURL, {
    method: "POST",
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      image_id: "3346",
      likes: likeCount 
    })
  })
}

// Comment Form Front End DOM Manipulation

commentForm.addEventListener("submit", event => {
  event.preventDefault()
  let userComment = document.querySelector("#comment_input").value
  let commentLi = document.createElement("li")
  commentLi.innerText = userComment
  commentsNode.prepend(commentLi)
  console.log(userComment)
  postComment(userComment)
})

// Comment Form Back End API Persistence

function postComment(userComment) {
  fetch(commentsURL, {
    method: "POST",
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      image_id: "3346",
      content: userComment
    })
  })
}

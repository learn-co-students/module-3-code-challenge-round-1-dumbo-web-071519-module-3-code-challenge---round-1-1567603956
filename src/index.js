let imageId = 3351 //1 //Enter the id from the fetched image here

const imageURL = `https://randopic.herokuapp.com/images/${imageId}`

const likeURL = `https://randopic.herokuapp.com/likes/`

const commentsURL = `https://randopic.herokuapp.com/comments/`

const container = document.querySelector(".container")
const imageDiv = document.querySelector("#image_card")
const comments = document.querySelector("#comments")

//STEP 1 - Get Image Data
// Use the data from the API response to change what's currently on the page (take a look at the already provided `index.html`). You will need to add/update:
// - the image url
// - the image name
// - the number of likes
// - any comments in an unordered list

function getImage(){
  fetch(imageURL)
  .then(res=> res.json())
  .then(data=>showImage(data))
}

function showImage(imageObj){
  const image = document.querySelector("#image")
  const name = document.querySelector("#name")
  const likes = document.querySelector("#likes")
  
  //console.log(imgURL)
  image.setAttribute("src", imageObj.url)
  image.dataset.id = imageObj.id
  
  name.innerText = imageObj.name
  likes.innerText = imageObj.like_count
  //comments.appendChild()
  showComments(imageObj.comments)
} 

function showComments(commentsList){
  
  commentsList.forEach(function(commentObj){
    // const commentLi = document.createElement("LI")
    // commentLi.innerText = commentObj.content
    // //commentLi.id = 

    // /////////////////////////DELETE//////////////////////
    // const deleteButton = document.createElement("button")
    // deleteButton.innerText = "X"
    // deleteButton.dataset.type = "delete"
    // deleteButton.dataset.id = commentObj.id
    // commentLi.append(deleteButton)
    // /////////////////////////DELETE//////////////////////

    comments.appendChild(createCommentLi(commentObj))
  })
  //return comments
}

function createCommentLi(commentObj){
  const commentLi = document.createElement("LI")
  commentLi.innerText = commentObj.content
    

  /////////////////////////DELETE//////////////////////
  const deleteButton = document.createElement("button")
  deleteButton.innerText = "X"
  deleteButton.dataset.type = "delete"
  deleteButton.dataset.id = commentObj.id
  commentLi.append(deleteButton)
  /////////////////////////DELETE//////////////////////

  return commentLi
}
// ## Step 2 - Like Feature(Frontend)

// The next feature to approach is the functionality to add likes to a picture.First, get this working in the browser only without worrying about persistence.

// Clicking the 'Like' button should increase the number of likes shown on the page by one.

// A user can like the same picture multiple times. - sweet

function addEventHandlers(){
  container.addEventListener("click", function(event){
    event.preventDefault()
    if (event.target.id === "like_button"){
      handleLikeButton(event)
    } else if (event.target.type === "submit" && event.target.value === "Submit"){
      //console.log(event)
      handleSubmitComment(event) 
    } else if (event.target.dataset.type === "delete") {
      //console.log(event.target.dataset.id)
      handleDeleteComment(event)
    }
  })
}

function handleLikeButton(event){
  //optimistic rendering
  const span = document.querySelector("#likes")
  const likesText = span.innerText
  let likesNum = parseInt(likesText)
  likesNum++
  span.innerText = String(likesNum)

  updateLikes(likesNum)
}

// ## Step 3 - Like Feature(Backend)

// This app will use what is called _optimistic rendering_.This means the DOM will be updated * before * the changes are added to the database.When a user clicks the 'Like' button we will immediately update the DOM.Next, your job is to make a POST request to persist the new Like in the backend database.

function updateLikes(likesNum){
  fetch(likeURL,{
    method: "POST",
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      image_id: imageId
    })
  })
  .then(res=>res.json())
  .then(r => console.log(r))
}


// ## Step 4 - Comment Feature(Frontend)

// The next feature to approach is the functionality to add comments to a picture.First, get this working in the browser only, without worrying about persistence.

// Filling out the input and clicking 'Submit' should append your new comment as an `<li>` to the comments unordered list element.You should also clear out the text in the comment input, so it's empty and ready for the next comment to be added.

function handleSubmitComment(event) {
  //console.log(event.target)
  let value = document.querySelector("#comment_input").value
  let commentUl = document.querySelector("#comments")
  const commentLi = document.createElement("LI")
  
  commentLi.innerText = value
  //comments.appendChild(createCommentLi(commentObj)) -------- in the middle of refactoring 

  //console.log(value)
  commentUl.appendChild(commentLi)
  createComment(value)
  clearForm()
}

function clearForm(){
  document.querySelector("#comment_form").reset()
}

// ## Step 5 - Comment Feature(Backend)
// As before, we need to persist the comment to the database, after optimistically rendering a comment.
// #### API Docs
// #### Endpoint to create a Comment
// Similarly to before, this POST request's body should include the your assigned `imageId`. Remember associations? A `comment` `belongs_to` an `image`, so we need to send the `image_id` that the comment should be associated with:
// Since we are using optimistic rendering, you shouldn't have to do anything with the response.

// To test your code you should be able to refresh the page and see any comments you added.

function createComment(comment){
  fetch(commentsURL,{
    method: "POST",
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      image_id: imageId,
      content: comment
    })
  })
  .then(res=>res.json())
  .then(d => console.log(d))
}

// ## BONUS - NOT REQUIRED

// ## Step 6 - Delete a comment feature

// This feature is not required, and you should only attempt if you have time.

// When you display new comments, add a button next to each comment.Clicking the button should delete the comment from the DOM, * as well as deleting it from the database *.

// Take the same iterative approach as before.Use pessimistic rendering.

// _(Hint: To get the comment's id you may have to think about changing the way you handle the response received from creating a comment)_

function handleDeleteComment(event){
  deleteComment(event.target.dataset.id)
}

function removeCommentFromDom(commentId){
  const button = document.querySelector(`[data-id="${commentId}"]`)
  const commentLi = button.parentNode
  commentLi.remove()
}

function deleteComment(commentId){
  fetch(`${commentsURL}/${commentId}`, {
    method: "DELETE"
  })
  .then(res=>res.json())
  .then(r => { 
    console.log(r)
    removeCommentFromDom(commentId)
  })
} // ---- this does not render the button automatically, you need to refresh the page (sorry ran out of time)

document.addEventListener('DOMContentLoaded', () => {
  console.log('%c DOM Content Loaded and Parsed!', 'color: magenta')
  getImage()
  addEventHandlers()
})


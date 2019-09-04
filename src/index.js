document.addEventListener('DOMContentLoaded', () => {
  console.log('%c DOM Content Loaded and Parsed!', 'color: magenta')

  let imageId = 3342 //Enter the id from the fetched image here

  const imageURL = `https://randopic.herokuapp.com/images/${imageId}`

  const likeURL = `https://randopic.herokuapp.com/likes/`

  const commentsURL = `https://randopic.herokuapp.com/comments/`

  //DOM vars
  const image = document.querySelector("#image");
  const imageTitle = document.querySelector("#name");
  const likesSpan = document.querySelector("#likes");
  const commentList = document.querySelector("#comments");
  const likeButton = document.querySelector("#like_button");
  const commentForm = document.querySelector("#comment_form");
  const commentInput = document.querySelector("#comment_input");

// funcs
function getImageDeets() {
    fetch(imageURL)
      .then(res => res.json())
      .then(imgObj => {
        console.log(imgObj);
        displayImage(imgObj);
      })
}

function displayImage(imgObj){
  //display image via img tag src
  image.src = imgObj.url;
  //display name
  imageTitle.innerText = imgObj.name;
  //display likes
  likesSpan.innerText = imgObj.like_count;
  //display comments
  imgObj.comments.forEach(displayComment)
}

function displayComment(comment){
  commentList.innerHTML += `<li>${comment.content}     <button class="delete-comment" data-comment-id=${comment.id}>Delete</button></li>`
}

function addLike(e){
  e.preventDefault();
  //convert like count to num
  let likeCount = parseInt(likesSpan.innerText);
  //add one
  likeCount++;
  // update DOM
  likesSpan.innerText = likeCount;
  //persist database
  persistLike();
}

function persistLike(){
  fetch(likeURL, {
    method: "POST",
    headers: {
      "Content-Type":"application/json",
      "Accept": "application.json"
    },
    body: JSON.stringify({
      image_id: imageId
    })
  }).then(res => res.json())
  .then(console.log)
}

//ATTN: THIS IS NOW PESSIMISTIC RENDERING B/C OF THE WAY DELETE COMMENT WORKS
function addComment(e){
  e.preventDefault();
  // cant submit an empty comment input
  if (commentInput.value !== ''){
    const commentContent = commentInput.value;
    //persist database
    persistComment(commentContent).then(commentObj => {
      //update DOM
      displayComment(commentObj);
      commentForm.reset();
    })
  }
}

function persistComment(commentContent){
  return fetch(commentsURL, {
    method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application.json"
      },
      body: JSON.stringify({
        image_id: imageId,
        content : commentContent
      })
  })
  .then(res => res.json())
}

function deleteComment(e){
  e.preventDefault();
  //if target is delete button
  if(e.target.classList.contains("delete-comment")){
    const commentID = e.target.dataset.commentId;  
  //delete li
    e.target.parentElement.remove()
  //delete in database
    removeCommentFromDatabase(commentID);
  }
}

function removeCommentFromDatabase(commentID){
  fetch(commentsURL + `/${commentID}`, {
    method: 'DELETE'
  }).then(res => res.json())
  .then(console.log)
}

  //listeners
  likeButton.addEventListener('click', addLike);
  commentForm.addEventListener('submit',addComment);
  commentList.addEventListener('click', deleteComment);


//run on load
getImageDeets()
;})


//**********WORKING CODE BEFORE BONUS*********** */


// document.addEventListener('DOMContentLoaded', () => {
//   console.log('%c DOM Content Loaded and Parsed!', 'color: magenta')

//   let imageId = 3342 //Enter the id from the fetched image here

//   const imageURL = `https://randopic.herokuapp.com/images/${imageId}`

//   const likeURL = `https://randopic.herokuapp.com/likes/`

//   const commentsURL = `https://randopic.herokuapp.com/comments/`

//   //DOM vars
//   const image = document.querySelector("#image");
//   const imageTitle = document.querySelector("#name");
//   const likesSpan = document.querySelector("#likes");
//   const commentList = document.querySelector("#comments");
//   const likeButton = document.querySelector("#like_button");
//   const commentForm = document.querySelector("#comment_form");
//   const commentInput = document.querySelector("#comment_input");

//   // funcs
//   function getImageDeets() {
//     fetch(imageURL)
//       .then(res => res.json())
//       .then(imgObj => {
//         //console.log(imgObj);
//         displayImage(imgObj);
//       })
//   }

//   function displayImage(imgObj) {
//     //display image via img tag src
//     image.src = imgObj.url;
//     //display name
//     imageTitle.innerText = imgObj.name;
//     //display likes
//     likesSpan.innerText = imgObj.like_count;
//     //display comments
//     imgObj.comments.forEach(displayComment)
//   }

//   function displayComment(comment) {
//     commentList.innerHTML += `<li>${comment.content}</li>`
//   }

//   function addLike(e) {
//     e.preventDefault();
//     //convert like count to num
//     let likeCount = parseInt(likesSpan.innerText);
//     //add one
//     likeCount++;
//     // update DOM
//     likesSpan.innerText = likeCount;
//     //persist database
//     persistLike();
//   }

//   function persistLike() {
//     fetch(likeURL, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//         "Accept": "application.json"
//       },
//       body: JSON.stringify({
//         image_id: imageId
//       })
//     }).then(res => res.json())
//       .then(console.log)
//   }

//   function addComment(e) {
//     e.preventDefault();
//     // cant submit an empty comment input
//     if (commentInput.value !== '') {
//       //make comment into an object to pass to display comment function
//       let commentObj = { content: commentInput.value };
//       //updateDOM
//       displayComment(commentObj);
//       //reset Form
//       commentForm.reset();
//       //persist database
//       persistComment(commentObj);
//     }
//   }
//   function persistComment(comment) {
//     fetch(commentsURL, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//         "Accept": "application.json"
//       },
//       body: JSON.stringify({
//         image_id: imageId,
//         content: comment.content
//       })
//     })
//       .then(res => res.json())
//       .then(console.log);
//   }
//   //listeners
//   likeButton.addEventListener('click', addLike);
//   commentForm.addEventListener('submit', addComment);

















//   //run on load
//   getImageDeets()
//     ;
// })
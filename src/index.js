// wow, I was getting some crazy errors, one of which requested 
// that I check out "Cross-Origin Read Blocking (CORB) Security."

//defined these outside DOMContentLoaded because I was getting
// weird errors about that.

const imageTag = document.querySelector("#image");
const h4Tag = document.querySelector("#name");
const commentList = document.querySelector("#comments");

const likeCount = document.querySelector("#likes");

const imageJPG = `http://blog.flatironschool.com/wp-content/uploads/2016/07/072716-js-saved-web-4-352x200.jpg`
document.addEventListener('DOMContentLoaded', () => {
  console.log('%c DOM Content Loaded and Parsed!', 'color: magenta')

  let imageId = 3343 //my image_id number 🍪
  const imageURL = `https://randopic.herokuapp.com/images/${imageId}`
  const likeURL = `https://randopic.herokuapp.com/likes/`
  const commentsURL = `https://randopic.herokuapp.com/comments/`

  let image = document.querySelector("#image")
//rememebr you can use querySelector for literally everything
// don't get fancy and use something you aren't comfortbale with

//fetch..
  fetch(imageURL)
    .then(resp => resp.json())
    .then(resp => slapImageOnTheDOM(image))
    // debugger
    //REMEMBER TO USE DEBUGGER AND CONSOLE.LOG
  
  
  function slapImageOnTheDOM(image){
      // debugger
//slapping everything on the DOM pretty much at once 
  
  imageTag.src = imageJPG;
  h4Tag.innerText = "The Internet!";

  likeCount = document.querySelector("#likes");
  // debugger
  // console.log(likeCount)
  likeCount.innerText = image.likeCount;
  // debugger
  // console.log(like-count)
      
  
  // debugger
  // console.log(commentList)
  //iterates through the list of comments for that specific image
  //parent.child
  // debugger
  // console.log(image.commentList);
  image.commentList.forEach(function(comment){
    addComment(comment.content);
    });

    // clickHandlers and listeneers
    const likeButton = document.querySelector("#like_button");
    //when clicked, creates a like.
    likeButton.addEventListener("click", addLikeToDOM)
    //submits a form and adds a comment
    const commentListener = document.querySelector("#comment_form")
    commentListener.addEventListener("submit", updateComments);
    // console.log(updateComments, "hey hey woah lookie here")
      }

    //more readable for adding another comment 
    function addComment(comment){
      newLi = document.createElement("li");
      newLi.innerText = comment;
      commentList.append(newLi);
        }

    //optimistic rendering time
    function addLikeToDOM(){
      // let likecount = 0
      likeCount.innerText++;
      addThatLikeToDatabase();
    }


    //reflect what happened on the DOM onto the database
    //use POST 
    function addThatLikeToDatabase(){
      fetch(likeURL, {
       method: "POST",
       headers: {
          "Content-Type": "application/json",
          "Accept": "Application/json"
        },
        body: JSON.stringify({
          image_id: imageId
        })
      }).then(resp => resp.json)
    }

    // Same thing as the likes (above) but now for comments
    function updateComments(event){
      const form = document.querySelector("#comment_form");
      event.preventDefault();
      comment = document.querySelector("#comment_input");
      comment = comment.value;
      addComment(comment);
      addThatCommentToDatabase(comment);
    }

    //again, same thing as likes
    function addThatCommentToDatabase(comment){
      fetch(commentsURL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "Application/json"
        },
        body: JSON.stringify({
          image_id: imageId,
          content: comment
        })
      })
        .then(resp => resp.json)
    }












  //END OF DOMCONTENTLOADED, way down here to keep organized
})
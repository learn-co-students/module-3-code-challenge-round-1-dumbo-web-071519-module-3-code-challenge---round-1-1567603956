document.addEventListener('DOMContentLoaded', () => {
  //vars i will need
  let imageId = 3352 //Enter the id from the fetched image here
  const imageURL = `https://randopic.herokuapp.com/images/${imageId}`
  const likeURL = `https://randopic.herokuapp.com/likes/`
  const commentsURL = `https://randopic.herokuapp.com/comments/`
  
  //fetch function for image
  function fetchImage(){
    fetch(imageURL)
    .then(res => res.json())
    .then(showImage)
  }  
  //always forget to call :/
  fetchImage()
    
  //slapTheFriggenDataAlready
  function showImage(data) {
      const commentsLi = getComments(data.comments)
      const imgDiv = document.querySelector('.container')
      //there has to be a shorter way into here
      imgDiv.innerHTML = `<div class="row" id="image_content">
        <div class="card col-md-4"></div>
        <div id="image_card" class="card col-md-4">
            <img src =${data.url} id="image" data-id/>
            <h4 id="name">${data.name}</h4>
            <span>Likes:
              <span id="likes">${data.like_count}</span>
            </span>
            <button id="like_button">Like</button>
            <form id="comment_form">
              <input id="comment_input" type="text" name="comment" placeholder="Add Comment"/>
              <input type="submit" value="Submit"/>
            </form>
            <ul id="comments">
            ${commentsLi}
            </ul>
        </div>
        <div class="card col-md-4"></div>
      </div>`
    //backtics will save yr life 

      const likeBtn = document.getElementById('like_button')
      const commentForm = document.getElementById('comment_form')
      likeBtn.addEventListener('click', addLikes)
      commentForm.addEventListener('submit', addComment)
    }

    //comments
    function getComments(talk){
      str = ""
       talk.forEach(function(comment){
        str += `<li>${comment.content}</li>`//backtics again!
      })
      return str
    }
    //add comments
    function addComment(event){
      event.preventDefault()
      let input = event.target.comment.value
      let newComment = liComment(input);
      event.target.nextElementSibling.innerHTML += newComment
      patchComment(input)
    }
    //add them likes
    function addLikes(event){
      event.preventDefault()
      let likeCount = parseInt(event.target.previousElementSibling.firstElementChild.innerText);
      event.target.previousElementSibling.firstElementChild.innerText = likeCount + 1;
      patchLikes()
    }
    //fetchfetchfetch
    function patchLikes(){
      fetch('https://randopic.herokuapp.com/likes', {
        method: "POST",
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({image_id: imageId})
      }).then(res => res.json())
    
    }
    
    function liComment(value){
      return `<li>${value}</li>`
    }
    
    function patchComment(input){
      body = {
        image_id: 3352,
        content: input
      }
    
      fetch('https://randopic.herokuapp.com/comments', {
        method: "POST",
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
      }).then(res => res.json())
        .then(console.log)
    }
})
 //i hated every moment
 //was full of doubt
 //this is the reason i smoke

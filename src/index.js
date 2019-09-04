document.addEventListener('DOMContentLoaded', () => {
  console.log('%c DOM Content Loaded and Parsed!', 'color: magenta')

  let imageId = 3337 //Enter the id from the fetched image here

  const imageURL = `https://randopic.herokuapp.com/images/${imageId}`

  const likeURL = `https://randopic.herokuapp.com/likes/`

  const commentsURL = `https://randopic.herokuapp.com/comments/`

  myPic()
})

function myPic(){
  fetch('https://randopic.herokuapp.com/images/3337')
  .then(res => res.json())
  .then((picObj) => {
    console.log(picObj)
    renderMyPic(picObj)
  })
}

function renderMyPic(picObj){
  const card = document.querySelector("#image_card")
  const title = document.querySelector("#name")
  const img = document.querySelector('#image')
  const commentsUL = document.querySelector("#comments")
  

  //need to add my obj to the DOM here
  card.innerHTML = `
    <img src="${picObj.url}" id="image" data-id="">
    <h4 id="name">${picObj.name}</h4>
    <span>Likes:
        <span id="likes">${picObj.like_count}</span>
    <button id="like_button">Like</button>
        <form id="comment_form">
            <input id="comment_input" type="text" name="comment" placeholder="Add Comment"/>
            <input type="submit" value="Submit"/>
        </form>
    <ul id="comments">
        <!-- <li> for each comment goes here -->
        <li>${picObj.comments.forEach((comment) => {
          appendLi(`${comment.content}`)
          // console.log(comment)
          // debugger
        })
  }
    </ul>
  `
}
  function appendLi(comment){
    return `${comment.content}`
  }



const img_card = document.querySelector("#image_card")
const likes = document.querySelector('#likes')
let counter = 0
img_card.addEventListener("click", (event) => {
  if (event.target.tagName){
    document.querySelector('#likes').innerHTML = ""
    document.querySelector('#likes').innerHTML += `
      <span id="likes">${counter += 1}</span>
      `
    postLikes(event)
  console.log(event, "like was clicked")
  }
})


  function postLikes(event){
    console.log(event)
    const likeNum = parseInt(event.target.previousElementSibling.innerText)
    debugger
    const config = {
      method: "POST",
      headers: {
      "Content-Type": "application/json",
        "Accept": "application/json"
    },
    body: {
      "image_id": 3337,
      "like_count": likeNum + 1
    }
  }

    fetch('https://randopic.herokuapp.com/likes', config).then(res => res.json()).then((data)=>{
      console.log(data)
      debugger
    })
  
    



  }
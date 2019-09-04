document.addEventListener('DOMContentLoaded', () => {
  console.log('%c DOM Content Loaded and Parsed!', 'color: magenta')

  let imageId = 1 //Enter the id from the fetched image here

  const imageURL = `https://randopic.herokuapp.com/images/${imageId}`
  
  const likeURL = `https://randopic.herokuapp.com/likes/`
  
  const commentsURL = `https://randopic.herokuapp.com/comments/`
  const imgCard = document.querySelector("#image_card")
  const likeSpan = document.querySelector("#likes")
  const likeCount = parseInt(document.querySelector("#likes").innerText) 
  

  fetch('https://randopic.herokuapp.com/images/3364')
    .then(resp => resp.json())
    .then(renderData)

  imgCard.addEventListener("click", (event) => {
    event.preventDefault()
  console.log('clicked')
    if (event.target.id === "like_button")
    debugger
    likeCount++  
    // likeSpan.innerText === `${likeCount} Likes`
    
    // fetch('https://randopic.herokuapp.com/likes', {
    //     method: 'POST',
    //     headers: {
    //         'Content-Type': 'application/json'
    // }
    //     body: JSON.stringify({
    //           '
    // })
    // .then(resp => resp.json())
    debugger
    
  })

  function renderData(data) {
    console.log(data)
    const title = document.querySelector('#name')
    title.innerText = `${data.name}`

    document.querySelector('#image_card').innerHTML = `
    <img src="${data.url}" id="image" data-id=""/>
    <h4 id="name">${data.name}</h4>
    <span>Likes:
      <span id="likes">${data.like_count} Likes</span>
    </span>
    <button id="like_button">Like</button>
    <form id="comment_form">
      <input id="comment_input" type="text" name="comment" placeholder="Add Comment"/>
      <input type="submit" value="Submit"/>
    </form>
    <ul id="comments">
     
    </ul>
    `
    data.comments.forEach(comment => {
      document.querySelector("#comments").innerHTML += 
      `<li>${comment.content}</li>`
    })
    //create li forEach comment
    
  }

})

document.addEventListener('DOMContentLoaded', () => {
  //console.log('%c DOM Content Loaded and Parsed!', 'color: magenta')
  const imageElement = document.querySelector('#image')
  const nameElement = document.querySelector('#name')
  const likes = document.querySelector('#likes')
  const likeButton = document.querySelector('#like_button')
  const commentForm = document.querySelector('#comment_form')
  const commentList = document.querySelector('#comments')
  let imageId = 3339

  const imageURL = `https://randopic.herokuapp.com/images/${imageId}`

  const likeURL = `https://randopic.herokuapp.com/likes/`

  const commentsURL = `https://randopic.herokuapp.com/comments/`

  const deleteURL = `https://randopic.herokuapp.com/comments/`


  fetch(imageURL).then(resp => resp.json()).then(setUpImage)

  function setUpImage(imageobj) {
    imageElement.src = imageobj.url
    imageElement.dataset.id = imageId
    nameElement.innerText = imageobj.name
    //console.log(imageobj)
    likes.innerText = imageobj.like_count
    imageobj.comments.forEach((comm) => {
      commentList.innerHTML += `<li>${comm.content}<button data-id="${comm.id}">X</button></li>`
    })
  }

  likeButton.addEventListener('click', (e) => {
    e.preventDefault()
    let currrentLikes = parseInt(likes.innerText)
    currrentLikes += 1
    likes.innerText = currrentLikes

    const config = {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        "image_id": imageId,
        "like_count": currrentLikes
      })
    }

    fetch(likeURL, config)
    //.then(resp => resp.json()).then(console.log)
  })

  commentForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const comment = e.target.comment.value
    // !This was for optomistic rendering but changed to add delete button
    //commentList.innerHTML += `<li>${comment} <button>X</button></li>`

    const config = {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        "image_id": imageId,
        "content" : comment
      })
    }

    fetch(commentsURL, config).then(resp => resp.json()).then(data => {
      commentList.innerHTML += `<li>${comment} <button data-id="${data.id}">X</button></li>`
    })

    e.target.reset()
  })

  commentList.addEventListener('click', (e) => {
    e.preventDefault()
    if(e.target.tagName === 'BUTTON'){
      let commentId = e.target.dataset.id
      //console.log(e.target.parentElement) //This is what i need to destroy

      const config = {
        method: 'DELETE'
      }
      fetch(`${deleteURL}${commentId}`, config).then(resp => resp.json()).then(() => {
        e.target.parentElement.remove()
      })
    }
  })
})

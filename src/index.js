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

  // This is the first Get request to our server
  // Once it's OK-ed, we run out setUpImage()
  fetch(imageURL).then(resp => resp.json()).then(setUpImage)


  function setUpImage(imageobj) {
    // Here we set the imageElement's src to be the obj url
    imageElement.src = imageobj.url
    // Here we change the name of the h4 element
    nameElement.innerText = imageobj.name
    // And here we set up out like count
    likes.innerText = imageobj.like_count
    // Since the key: comments is an array, we iterate over each object in it's array....
    imageobj.comments.forEach((comm) => {
      // And then apend it with a delete button && the comment id attatchd 
      commentList.innerHTML += `<li>${comm.content}<button data-id="${comm.id}">🗑</button></li>`
    })
  }

  //This is for when the like button is clicked
  likeButton.addEventListener('click', (e) => {
    e.preventDefault()
    // Here we take our previous like count, which is on the DOM and +1 to it
    const updatedLikes = parseInt(likes.innerText) + 1
    // OPT REND: update the DOM first....
    likes.innerText = updatedLikes

    const config = {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        "image_id": imageId,
        "like_count": updatedLikes
      })
    }
    // Then send a post request to the API
    fetch(likeURL, config)

  })

  // This is for when we submit our comment form
  commentForm.addEventListener('submit', (e) => {
    e.preventDefault()
    // We take in the input comment value and save that...
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
    //Then we make the POST request
    fetch(commentsURL, config).then(resp => resp.json()).then(data => {
      //This is PES REND: because we update the DOM after we get a response from the API
      commentList.innerHTML += `<li>${comment} <button data-id="${data.id}">️🗑</button></li>`
    })
    // And reset the form just to make it nice 
    e.target.reset()
  })

  // This is for when there is a click in our comment list (stable parent)
  commentList.addEventListener('click', (e) => {
    e.preventDefault()
    // And if that target was a button && it has a data-id attibute
    // It is our remove button
    if(e.target.tagName === 'BUTTON' && e.target.dataset.id){
      // Each button has an id that corrosponds with the comment id that we need to destroy
      const commentId = e.target.dataset.id
      // send a DELETE request to out API
        fetch(`${deleteURL}${commentId}`, { method: 'DELETE' }).then(resp => resp.json()).then(() => {
        //Once it has been sucessful, remove the comment from the DOM
        e.target.parentElement.remove()
      })
    }

  })


})

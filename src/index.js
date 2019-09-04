document.addEventListener('DOMContentLoaded', () => {

  // var likeCounter = 0

  console.log('%c DOM Content Loaded and Parsed!', 'color: magenta')
  let imageId = 3347 //Enter the id from the fetched image here
  const imageURL = `https://randopic.herokuapp.com/images/${imageId}`
  const likeURL = `https://randopic.herokuapp.com/likes/`
  const commentsURL = `https://randopic.herokuapp.com/comments/`

  const imgTag = document.querySelector("#image")
  const nameHeader = document.querySelector("#name")
  const likesSpan = document.querySelector("#likes")
  const commentsUL = document.querySelector("#comments")
  const commentForm = document.querySelector("#comment_form")

  const likeButton = document.querySelector("#like_button")

  // Step 1 - Get the Image Data
  // SLAP PICTURE INFO ON DOM
  fetch(imageURL)
  .then(response => response.json())
  .then(slapPictureInfo)

  function slapPictureInfo(picInfo) {
    // console.log(picInfo)

    const picURL = picInfo.url
    imgTag.src = picURL

    const picName = picInfo.name
    nameHeader.innerText = picName

    const picLikes = picInfo.like_count
    likesSpan.innerText = picLikes

    const picComments = picInfo.comments
    picComments.forEach(function(comment, index) {
      commentContent = comment.content

      const commentLI = document.createElement("LI")
      commentLI.innerHTML = commentContent

      // making a div to hold both li and delete button
      const commentLIDiv = document.createElement("div")
      commentLIDiv.appendChild(commentLI)

      const deleteForm = document.createElement("form")
      const deleteButton = document.createElement("input")
      deleteButton.type = "button"
      deleteButton.value = "Delete"
      deleteForm.appendChild(deleteButton)

      commentLIDiv.appendChild(deleteForm)

      commentsUL.appendChild(commentLIDiv)





      //commentsUL
    })
  }

  likeButton.addEventListener("click", (e) => {

    // Step 2 - Like Feature (Frontend)
    // UPDATE DOM LIKES
    // likeCounter = likeCounter + 1
    const likeSpan = e.target.parentNode.children[2]
    const likeSpanText = likeSpan.innerText
    const splitLikeSpanText = likeSpan.innerText.split(" ")
    const likeString = splitLikeSpanText[1]
    let likeNumber = parseInt(likeString)

    likeNumber = likeNumber + 1

    // console.log(typeof(likeNumber))
    // console.log(likeNumber)

    likeSpan.innerText = `Likes: ${likeNumber}`


    // Step 3 - Like Feature (Backend)
    // UPDATE BACKEND LIKES
    // const likeURL = `https://randopic.herokuapp.com/likes/`
    fetch(likeURL, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        image_id: imageId
      })
    })
  })

  // Step 4 - Comment Feature (Frontend)
  // UPDATE DOM COMMENTS
  const submitButton = commentForm.children[1]
  const commentInput = commentForm.querySelector("#comment_input")
  //console.log(commentInput)

  submitButton.addEventListener("click", (e) => {
    e.preventDefault()
    const commentValue = commentInput.value

    if (commentValue === "") return

    const commentLI = document.createElement("LI")
    commentLI.innerHTML = commentValue

    // making a div to hold both li and delete button
    const commentLIDiv = document.createElement("div")
    commentLIDiv.appendChild(commentLI)

    const deleteForm = document.createElement("form")
    const deleteButton = document.createElement("input")
    deleteButton.type = "button"
    deleteButton.value = "Delete"
    deleteForm.appendChild(deleteButton)

    commentLIDiv.appendChild(deleteForm)

    commentsUL.appendChild(commentLIDiv)


    // Step 5 - Comment Feature (Backend)
    // UPDATE BACKEND COMMENTS
    fetch(commentsURL, {
      method: "POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        image_id: imageId,
        content: commentValue
      })
    })
    commentForm.reset()
  })

  // Step 6 - Delete a comment feature
  //


})

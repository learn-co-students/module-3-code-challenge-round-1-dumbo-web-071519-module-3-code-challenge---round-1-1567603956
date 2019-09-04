document.addEventListener('DOMContentLoaded', () => {
  console.log('%c DOM Content Loaded and Parsed!', 'color: magenta')

  const imageId = 3353 //Enter the id from the fetched image here

  const imageURL = `https://randopic.herokuapp.com/images/${imageId}`

  const likeURL = `https://randopic.herokuapp.com/likes/`

  const commentsURL = `https://randopic.herokuapp.com/comments/`

  const ulcomment = document.querySelector("#comments")
  const commentform = document.querySelector("#comment_form")




  fetch(`https://randopic.herokuapp.com/images/${imageId}`)
    .then(resp => resp.json())
    .then(data => {
          usehere(data)
  
    })


    function usehere(data){
     const elename = document.getElementById("name").textContent = `${data.name}`
     const likescount = document.getElementById("likes").textContent = `${data.like_count}`
     const image = document.getElementById("image").src = `${data.url}`
     
     data.comments.forEach(function(acomment){
      ulcomment.innerText = acomment.content
    })
   
    }

    commentform.addEventListener("submit",addNewComment)



    function addNewComment(event){
      event.preventDefault();
    let comments = document.querySelector("#comment_input")

      fetch("https://randopic.herokuapp.com/comments",{
        method : "POST",
        headers : {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          image_id: `${imageId}`,
          content : comments
        })
      })

      
    }






  
})


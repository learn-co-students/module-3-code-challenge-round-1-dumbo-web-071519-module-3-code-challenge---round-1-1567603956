const container = document.querySelector('.container')
const divImg = container.querySelector('#image_card')
const name = document.querySelector('#name')
const span = document.querySelector('span')
const ul = document.querySelector('#comments')
const btnLike = document.querySelector('#like_button')
let imageId = 3340
const form = document.querySelector('#comment_form')
document.addEventListener('DOMContentLoaded', () => {
  console.log('%c DOM Content Loaded and Parsed!', 'color: magenta')

   //Enter the id from the fetched image here

  const imageURL = `https://randopic.herokuapp.com/images/${imageId}`

  const likeURL = `https://randopic.herokuapp.com/likes/`

  const commentsURL = `https://randopic.herokuapp.com/comments/`
  
  

  fetch(`https://randopic.herokuapp.com/images/${imageId}`)
    .then(res => res.json())
    .then(slapImg)

  
fetch('https://randopic.herokuapp.com/likes', {
    method: 'POST',
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({

      image_id: imageId
    })
  }).then(res=>res.json())
  .then(console.log)


  

 })

function slapImg(img) {
  
  divImg.scr = `${img.url}`
  
  name.innerText = `${img.name}`
  span.innerText = `${img.like_count}`
  btnLike.dataset.id=`${img.id}`

  img.comments.forEach(el => {
    const li = document.createElement('li')
    li.innerText = `${el.content}`
    ul.append(li)
  }
  )

}
const likeBtn = document.querySelector('#like_button')
document.addEventListener('click', function(event){
  console.log(event.target.id)
  if (event.target.id == 'like_button') 
 {
   increaseLike(event,event.target.dataset.id);
 }
}
)


form.addEventListener('submit',addComment)
const comment = form.querySelector('#comment_input')

function addComment(event){
  event.preventDefault();
ul.innerHTML+=`
<li>${comment.value}</li>
`

  fetch('https://randopic.herokuapp.com/comments', {
    method: 'POST',
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      image_id: imageId,
    content: comment

  })
}).then(res => res.json())
    .then(console.log)






}
function increaseLike(event,id){
    event.preventDefault();
    
    const addlike=parseInt(span.innerText)+1
  span.innerText=addlike
    console.log(addlike)
     
  // fetch(`https://randopic.herokuapp.com/images/${id}`, {
  //       method: 'POST',
  //       headers: {
  //         "Content-Type": "application/json"
  //       },
  //       body: JSON.stringify({
         
  //         "likes": addlike
  //       })
  //     })
        
      // event.target.reset()
      // event.target.reset()

    }
 
  
  


























//https://randopic.herokuapp.com/images/3340


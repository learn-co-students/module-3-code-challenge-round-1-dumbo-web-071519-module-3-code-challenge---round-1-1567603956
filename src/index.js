document.addEventListener('DOMContentLoaded', () => {
  console.log('%c DOM Content Loaded and Parsed!', 'color: magenta')
//const
  let imageId = 3350  //Enter your assigned imageId here

  const imageURL = `https://randopic.herokuapp.com/images/${imageId}`

  const likeURL = `https://randopic.herokuapp.com/likes/`

  const commentsURL = `https://randopic.herokuapp.com/comments/`

  //selected image from img src tag
  const myImage = document.querySelector("#image")
//selected image name from h4
  const myImageName = document.querySelector('name')  
  //selected likes from span 
  const likeImage = document.querySelector("likes")  
  //selected button from button tag
  const like_button = document.querySelector("like_button")  
  
  



//pillar 1, fetch

fetchImage()

function fetchImage() {
fetch(`${imageURL}`)
.then(resp => resp.json())
// .then(data => console.log("hi",data))
.then(data => slapImageOnDom(data))
}

function slapImageOnDom(data) {
  // console.log("hello", data.url)
  // console.log("hello", data)
  data.url.innerHTML += `
  <img src=${url} />
  `
  // console.log(data)
  // debugger
 }


//add/update
// fetch(`${imageURL}`,{
// method: 'PATCH',
// headers: {
// 'Content-Type': 'application/json',
// 'Accept': 'application/json'
// },
// body: JSON.stringify({

// "name": newImageName

// })
// })
// .then(res => res.json())
// .then(response => console.log(response))















  
})
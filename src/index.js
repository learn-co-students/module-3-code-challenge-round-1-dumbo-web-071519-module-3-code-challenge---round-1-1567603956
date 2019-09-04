// document.addEventListener('DOMContentLoaded', () => {
  console.log('%c DOM Content Loaded and Parsed!', 'color: magenta')

  let imageId = `https://randopic.herokuapp.com/images/3341`

  const imageURL = `https://randopic.herokuapp.com/images/3341`

  const likeURL = `https://randopic.herokuapp.com/likes/`

  const commentsURL = `https://randopic.herokuapp.com/comments/`


  let pic = document.getElementById('image')
  // pic.setAttribute('src',imageURL)

  fetch(imageId)
  .then(resp => resp.json())
  .then(data => postPic(data))


  const postPic =(data)=>{
    debugger
    let mainDiv = document.getElementsByClassName("card col-md-4")[0];
    let likesSpan = document.getElementById('likes');
    let imageCard = document.getElementById('image_card');
    let imageTitle = imageCard.querySelector('h4');
    let picDiv = `
        <img src="${data.url}" id="image" data-id="${data.id}"/>
        <h4 id="name">${data.name}</h4>
        `
      //  debugger
       let likesection = `
        <span data-id="${data.id}">Likes:
          <span id="likes">Likes:${data.like_count}</span>
        </span>`;
        mainDiv.innerHTML += picDiv
        likesSpan.innerHTML+= likesection
  }

  const addLike=(event)=>{
    debugger
    let likesText = document.querySelector('span #likes');
    numOfLikes = parseInt(likesText) +1;

  }

    const postComment = (comment) =>{
  let commentSection = document.getElementById('comments')

      let commentLi = `<li> ${comment.content}</li>`;
      commentSection.innerHtml += commentLi;
      
    }
  const addComment = (event)=>{
    debugger
    let theComment = event.target.name;
      return fetch(`${imageId}`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json',
                  'Accept': 'application/json',
      },
      body: JSON.stringify({
        comments:[{
        id:57100,
        content: theComment.value
      }]
    })   
  }
      ).then(resp => resp.json()).then(data =>postComment(data))
  }

  const likeButton = document.getElementById('like_button')
  likeButton.addEventListener('click', addLike)

const commentForm = document.getElementById('comment_form');
commentForm.addEventListener('submit',addComment);


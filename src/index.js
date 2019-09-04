document.addEventListener('DOMContentLoaded', () => {
    console.log('%c DOM Content Loaded and Parsed!', 'color: magenta')

    let imageId = 3349 //Enter the id from the fetched image here

    const imageURL = `https://randopic.herokuapp.com/images/${imageId}`

    const likeURL = `https://randopic.herokuapp.com/likes/`

    const commentsURL = `https://randopic.herokuapp.com/comments/`

    fetch(imageURL)
        .then(resp => resp.json())
        .then(data => showImage(data))

    document.getElementById('like_button').addEventListener('click', e => {
        // let likesCounterString = e.target.previousElementSibling.childNodes[1].innerText
        //let likesCounter = document.getElementById('likes')
        let likeCounter = parseInt(e.target.previousElementSibling.childNodes[1].innerText)

        console.log(typeof likeCounter)
        console.log(likeCounter)
        console.log(e)

        likeCounter += 1;
        document.getElementById('likes').innerText = likeCounter

        console.log('%c Optimistic Rendering Complete, Updating database...', 'color:green')

        fetch(likeURL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({
                    image_id: 3349,
                    like_count: likeCounter
                })
            })
            .then(resp => resp.json())

        console.log('%c Database has been Updated with Like', 'color:green')
    })

    document.getElementById('comment_form').addEventListener('submit', e => {
        e.preventDefault();
        console.log('I have clicked Submit on the Form')
        console.log(e)

        //Need to get the target, which is the input to make a fetch/post request. 
    })


    //fetchImage();
})





// function fetchImage() {
//     console.log("Entered the Fetch Image Function")
//     fetch(imageURL)
//         .then(resp => resp.json())
//         .then(data => showImage)
// }

function showImage(imgData) {
    console.log("Entered the Show Image Function")
    console.log(imgData)

    document.getElementById('name').innerText = imgData.name
    document.getElementById('likes').innerText = imgData.like_count
    const imgUl = document.getElementById('comments'),
        commentsArray = imgData.comments;

    commentsArray.forEach(comment => {
        let imgLi = document.createElement('li')
        imgLi.innerText = comment.content
        imgUl.appendChild(imgLi)
    })







}
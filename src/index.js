document.addEventListener('DOMContentLoaded', () => {
  console.log('%c DOM Content Loaded and Parsed!', 'color: magenta')

	let imageId = 3345;

	const imageURL = `https://randopic.herokuapp.com/images/3345`

	const likeURL = `https://randopic.herokuapp.com/likes/`

	const commentsURL = `https://randopic.herokuapp.com/comments/`
	const imageCardDIV = document.getElementById("image_card");
	const commentListUL = document.getElementById("comments");

	populateOnLoad();
	
	function populateOnLoad(){
		fetch(imageURL)
			.then(response => response.json())
			.then(imageData => updateImageCard(imageData))
	}

	function updateImageCard(imageData){
		console.log(imageData)
		
		updateImage(imageData);
		updateImageName(imageData);
		updateLikesNumber(imageData);
		addEventToLikeButton(imageData)
		
		addComments(imageData);
		addEventToSubmitComment(imageData);
		
	}

	function updateImage(imageData){
		const imageElement = imageCardDIV.querySelector("#image");
		imageElement.setAttribute("src", imageData.url);
		imageElement.setAttribute("data-id", imageData.id);
	}

	function updateImageName(imageData){
		const imageNameElement = imageCardDIV.querySelector("#name");
		imageNameElement.innerText = `${imageData.name}`;
	}

	function updateLikesNumber(imageData){
		const likesCounter = imageCardDIV.querySelector("#likes");
		likesCounter.innerText = `${imageData.like_count}`;
	}

	function addEventToLikeButton(imageData){
		const likeButton = imageCardDIV.querySelector("#like_button");
		likeButton.addEventListener("click", event =>addALike(event, imageData));
	}

	function addALike(event, imageData){
		event.preventDefault();
		console.log(event);
		console.log(imageData);
		imageData.like_count += 1;
		updateLikesNumber(imageData);
		
		postLikesToServer(imageData);
	}

	function postLikesToServer(imageData){
		//+`${imageData.id}`
		fetch(likeURL,{
			method: "POST",
			body: JSON.stringify({
				image_id: `${imageData.id}`,
				like_count: `${imageData.like_count}`
				}),
			headers: {
				'Accept': 'application/json',
				"Content-type": "application/json"
				}
		})
		.then(response => response.json())
		.then(verify => console.log("verified", verify));
	}

	function addComments(imageData){
		console.log(commentListUL)

		imageData.comments.forEach(comment =>displayComment(comment, imageData))
	}

	function displayComment(comment, imageData){
		let commentHolderLI = document.createElement("li");
		commentHolderLI.setAttribute("data-id", `${comment.id}`)
		commentHolderLI.innerText = `${comment.content}`;
		commentListUL.append(commentHolderLI);
	}

	function addEventToSubmitComment(imageData){
		const addCommentButton = document.querySelector('input[value="Submit"]')
		addCommentButton.addEventListener("click", event => addNewComment(event, imageData));
	}

	function addNewComment(event, imageData){
		event.preventDefault()
		const newCommentContent = document.getElementById("comment_input").value;
		
	// 	fetch(commentsURL, {
	// 		method: "POST",
	// 		body: JSON.stringify{
	// 			image_id: (imageData.id),
	// 			content: (newCommentContent)
	// 		  },
	// 		  headers: {
	// 			'Accept': 'application/json',
	// 			'Content-Type': 'application/json'
	// 		  }
	// })

	// 	// attach all the user garbage and image ID
	// 	// send updated imageData to server
		
	}





})

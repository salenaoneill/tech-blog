async function newPostHandler(event) {
    event.preventDefault();

    //find and associate variables with user assigned value given 
    //to post-title and post-text.
    const title = document.querySelector('input[name="post-title"]').value;
    const post_text = document.querySelector('textarea[name="post-text"]').value;



//new post created as a JSON object with title and post_text.
    const response = await fetch(`/api/posts`, {
        method: 'POST',
        body: JSON.stringify({
            title,
            post_text
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    })

//redirect user to see newest post in users posts.
    if (response.ok) {
        document.location.replace('/dashboard');
    }
    else {
        alert(response.statusText);
    }
}

//listens for the submit button to be clicked to call newFormHandler function
document.querySelector('.new-post-form').addEventListener('submit', newPostHandler);
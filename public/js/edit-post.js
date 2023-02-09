async function editPostHandler(event) {
    event.preventDefault();

    //get the post id from the url
    const post_id = window.location.toString().split('/')[
        window.location.toString().split('/').length - 1
    ];

    //find and associate variables with user assigned value given 
    //to post-title and post-text.
    const title = document.querySelector('input[name="post-title"]').value;
    const post_text = document.querySelector('textarea[name="post-text"]').value;

    //post updated as a JSON object with title and post_text.
    const response = await fetch(`/api/posts/${id}`, {
        method: 'PUT',
        body: JSON.stringify({
            title,
            post_text
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    });

    //redirect user to see updated post in users posts
    if (response.ok) {
        document.location.replace('/dashboard');
    }
    else {
        alert(response.statusText);
    }
}

//listens for the submit button to be clicked to call editPostHandler function
document.querySelector('.edit-post-form').addEventListener('submit', editPostHandler);
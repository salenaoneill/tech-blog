async function deletePostHandler(event) {
    event.preventDefault();

    //get the post id from the url
    const post_id = window.location.toString().split('/')[
        window.location.toString().split('/').length - 1
    ];

    //delete post
    const response = await fetch(`/api/posts/${id}`, {
        method: 'DELETE'
    });

//redirect user to see there posts in dashboard, with the updated deletion
    if (response.ok) {
        document.location.replace('/dashboard');
    }
    else {
        alert(response.statusText);
    }
}

document.querySelector('.delete-post-button').addEventListener('submit', deletePostHandler);
async function logout() {
    //account recognized as a JSON object with an email and password.
    const response = await fetch('/api/users/logout', {
        method: 'post',
        headers: {'Content-Type': 'application/json'}
    });

    //redirects user to home login or signup page.
    if (response.ok) {
        document.location.replace('/');
    }
    else {
        alert(response.statusText);
    }
}

//listens for the log out button to be clicked to call logout function
document.getElementById('logout').addEventListener('click', logout)
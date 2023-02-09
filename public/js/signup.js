async function signupFormHandler(event) {
    event.preventDefault();
    //find and associate variables with user assigned value given 
    //to username, email and password.
    const username = document.getElementById('username-signup').value.trim();
    const email = document.getElementById('email-signup').value.trim();
    const password = document.getElementById('password-signup').value.trim();

     //account created as a JSON object with a username, email, and password.
    if (username && email && password) {
        const response = await fetch('/api/users/signup', {
            method: 'post',
            body: JSON.stringify({
                username,
                email,
                password
            }),
            headers: {'Content-Type': 'application/json'}
        });

         //alerts user they are signed in & redirects user to dashboard
        if (response.ok) {
            alert('Account Created!');
            document.location.replace('/dashboard');
        }
        else {
            alert(response.statusText);
        }
    }
}

//listens for the sign up button to be clicked to call signupFormHandler function
document.querySelector('.signup-form').addEventListener('submit', signupFormHandler);
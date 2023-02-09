async function loginFormHandler(event) {
    event.preventDefault(); 

    //find and associate variables with user assigned value given 
    //to email and password.
    const email = document.querySelector('#email-login').value.trim();
    const password = document.querySelector('#password-login').value.trim();

    //account recognized as a JSON object with an email and password.
    if (email && password) {
        const response = await fetch('/api/users/login', {
            method: 'post',
            body: JSON.stringify({
                email, 
                password
            }),
            headers: {'Content-Type': 'application/json'}
        });

         //redirect user to dashboard.
        if (response.ok) {
            document.location.replace('/dashboard');
        }
        else {
            alert(response.statusText);
        }
    }
}

//listens for the log in button to be clicked to call editPostHandler function
document.querySelector('.login-form').addEventListener('submit', loginFormHandler);
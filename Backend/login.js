const API_URL = 'http://localhost:5678/api/users/login';

async function loginAndStoreCookies(email, password) {
  fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ email, password })
  }).then(response => {
    if (!response.ok) {

      // Differentiate between authentication error and server error
      if (response.status === 401) {
        throw new Error('Authentication failed: Invalid email or password');
      } else {
        throw new Error('Server error: ' + response.status);
      }
    }


    return response.json();
  }).then(data => {
    console.log(data);
    // Store the cookies in the browser's session storage
    sessionStorage.setItem('token', data.token);
    window.location.href = 'connected.html';
  });
}

document.getElementById('input-log-submit').addEventListener('click', async (event) => {
  event.preventDefault();

  // Use destructuring to get the values from the input fields
  const { value: email } = document.getElementById('email');
  const { value: password } = document.getElementById('password');

  try {
    await loginAndStoreCookies(email, password);


  } catch (error) {
    // Add the 'bad' class to the 'input-reaction' element
    const inputElements = document.querySelectorAll('#form-login input');
    inputElements.forEach(element => {
      element.classList.add('bad');
    });
  }
});

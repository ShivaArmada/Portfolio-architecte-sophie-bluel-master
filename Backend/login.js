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

      //dans le cadre où la personne écris n'importe quoi, on lui indique qu'il écris n'importe quoi
      const inputElements = document.querySelectorAll('#form-login input');
      inputElements.forEach(element => {
        element.classList.add('bad');
      });

      // Differentiate between authentication error and server error
      if (response.status === 401) {
        throw new Error('Authentication failed: Invalid email or password');
      } else {
        throw new Error('Server error: ' + response.status);
      }
    }


    return response.json();
    //maintenant que l'on a nos email et password en json, qu'on la envoyé au serveur
    //on peut récupérer le token qu'il return puis le stocker dans le session storage
  }).then(data => {
    console.log(data);
    // Store the cookies in the browser's session storage
    sessionStorage.setItem('token', data.token);
    //enfin on redirige l'utilisateur vers la page connected.html qui est sécurisée sans le token enregistré
    window.location.href = 'connected.html';
  });
}

document.getElementById('input-log-submit').addEventListener('click', async (event) => {
  event.preventDefault();
  //quand on clique sur le bouton de connexion, on récupère les valeurs des champs email et password ==>
  // Use destructuring to get the values from the input fields
  const { value: email } = document.getElementById('email');
  const { value: password } = document.getElementById('password');
  //une fois les variables définies on peux lancer notre fonction qui les stocks

  try {
    await loginAndStoreCookies(email, password);


  } catch (error) {
    throw new Error('la fonction loginAndStoreCookies a échoué avec l\'erreur : ' + error.message);


  }
});

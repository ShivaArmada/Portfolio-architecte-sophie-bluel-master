   // Cette fonction permet d'initialiser le login en appuyant sur le bouton se connecter
   function initLogin() {
    let conect_Btn = document.getElementById("input-log-submit");
    conect_Btn.addEventListener("click", () => {
        
        // URL à utiliser pour la requête Post/GET user-e-mdp
    const url = 'http://localhost:5678/api/users/login';

    // Options de la requête Post
    const options = {
        method: 'POST',
        headers: {
            'Accept': 'application/json'
        }


    };




      // Options de la requête GET
      const options = {
          method: 'GET',
          headers: {
              'Accept': 'application/json'
          }


      };
       
    })
}

   
   



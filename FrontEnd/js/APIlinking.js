// ------------------- Récupérer les données de l'API --------------------------------
// Récupérer tous les teddies
function getTeddies() {
    return fetch (`http://localhost:3000/api/teddies`)
        .then(function (response) {
            return response.json()
        })
        .then(function(teddies) {
            return teddies
        })
        .catch(function(error) {
            alert(error)
        })
}

// Récupérer 1 teddy
function getTeddy(teddyId) {
    return fetch (`http://localhost:3000/api/teddies/${teddyId}`)
        .then(function (response) {
            return response.json()
        })
        .then(function(teddies) {
            return teddies
        })
        .catch(function(error) {
            alert(error)
        })
}

// ------------------- Renvoyer des données à l'API > panier + cooordonnées user --------------------------------      
 async function sendUsersInfoToApi() {

    //Récupérer les valeurs saisies par l'utilisateur
    const contact = {
        firstName: document.querySelector('#firstname').value,
        lastName: document.querySelector('#lastname').value,
        address: document.querySelector('#address').value,
        city: document.querySelector('#city').value,
        email: document.querySelector('#email').value
    } ;
    // Récupérer le contenu du localStorage > panier utilisateur (listTeddies)
    const products = getTeddiesFromLocalStorage();

    let data = {
        contact,
        products
        }

    // Contenu de la requête
    const request = fetch('http://localhost:3000/api/teddies/order', {
        method: 'POST',
        headers: {
            'Content-type' : 'application/json',
        },
        body: JSON.stringify(data),    
    });

    // Communication avec l'API > envoi de la requête + récupération de la réponse > enregistrement du contenu de la réponse dans localStorage 'orderConfirm'
    const response = (await request).json();
    const orderId = await response;
    localStorage.setItem('orderConfirm', JSON.stringify(orderId));

    // Aller vers la page de confirmation
    confirmProcess();
}
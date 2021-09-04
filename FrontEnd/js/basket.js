// ------------------------------------------ VARIABLE GLOBALE -------------------------------------------
var listTeddies = getTeddiesFromLocalStorage();

// ---------------------------------------- EXECUTION DES FONCTIONS ----------------------------------------
displayBasket();
basketLength();

(function() {
    if(document.querySelector('#basket-validation').addEventListener('click', displayForm)) {
        displayForm();
    };
    if(document.querySelector('#clear-basket').addEventListener('click', clearBasket)) {  
        clearBasket();
    };       
})()

// -------------------------------------------------------- DEFINITION DES FONCTIONS -----------------------------------------------------------
// ---------------------------------------- GESTION DU PANIER > REMPLISSAGE, SUPPRESSION D'ARTICLE, VIDER LE PANIER  ---------------------------

// 1- Initialiser un localStorage dans lequel viendront se "ranger" les articles que le client ajoutera à son panier
function getTeddiesFromLocalStorage(){
    let listTeddies = localStorage.getItem('listTeddies');
    if(listTeddies == null) {
         return [];
    } else {
        return JSON.parse(listTeddies)
    }
}

// 2- "sauvegarder" le panier (=localStorage)
function saveTeddies() {
    localStorage.setItem('listTeddies',JSON.stringify(listTeddies));    
}

// ajouter un produit au panier > sur page product.html 
function addToBasket(teddiesId) {
    listTeddies.push(teddiesId);
    saveTeddies(); 
    document.location.reload();
}

// afficher le panier (localStorage "listTeddies") > sur page basket.html
async function displayBasket() {
    if(listTeddies === null || listTeddies.length == 0) {
        document.querySelector('#basket').innerHTML = `<div class="col-12 text-center">
                                                            <p>Le panier est vide</p>
                                                        </div>`;                                               
    } else {
        let addedTeddies = await getTeddies();
        for (let i=0; i<listTeddies.length; i++){
            let teddyId = listTeddies[i]
            let teddy = addedTeddies.filter((teddy) =>  teddy._id == teddyId)[0]
            let price = teddy.price
            price /= 100            
            
            document.querySelector('#basket').innerHTML += `<div class="row py-3 bg-light border-bottom align-items-center" data-remove="i">
                                                                <div class="col-6">
                                                                    <a href="product.html?id=${teddy._id}" id="teddy-link" class="btn-link">
                                                                        <div class="row">
                                                                            <img class="basket-img col-12 col-md-6" src="${teddy.imageUrl}" alt="image de ${teddy._id}" />
                                                                            <p class="d-none d-md-inline col-md-6">${teddy.name}</p>
                                                                        </div>
                                                                    </a>    
                                                                </div>
                                                                
                                                                <div class="col-3">
                                                                    <p class="price">${price} €</p>
                                                                </div>

                                                                <button class="rm-button remove-btn col-3">
                                                                    <svg xmlns="http://www.w3.org/2000/svg" width="21" height="21" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
                                                                        <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
                                                                        <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
                                                                    </svg>
                                                                </div>
                                                            </div>`;
        }                                                                                         
    }

    // Appeler la fonction qui gère le prix total du panier
    totalPriceToPay();
      
    // Rendre le bouton "poubelle" interactif > au clic, exécute la fonction removeTeddies > supression d'un article du panier
    let removeBtn = document.querySelectorAll('.remove-btn');
        for(let i = 0 ; i < removeBtn.length ; i++) {
            removeBtn[i].addEventListener('click' , () => removeTeddies(i));   
        }                                                    
}

// Supprimer un produit du panier
async function removeTeddies(index) {
    listTeddies.splice(index , 1);
    saveTeddies(listTeddies);
    document.location.reload();   
}          
    
// Vider le panier
function clearBasket() {
    localStorage.clear(listTeddies);
    document.location.reload();
}

// Calculer + afficher montant total du panier : récupération des prix de chaque élément > les ajouter dans un tableau > additionner toutes les valeurs contenues dans ce tableau
function totalPriceToPay () {
    let amount = [0] ;
    for(let i = 0 ; i < listTeddies.length ; i++) {
        let prices = document.querySelectorAll('.price');  
        let teddyPrice = parseInt(prices[i].textContent);
        amount.push(teddyPrice);
    }    
    const teddiesPrices = (accumulator, current) => accumulator + current;
    let totalAmount = amount.reduce(teddiesPrices);
    localStorage.setItem('amount', JSON.stringify(totalAmount));
    document.querySelector('#total-amount').innerHTML += `<p>Montant total à régler : ${totalAmount} €</p>`;  
}

// Récupérer le nbr d'articles dans le panier et afficher celui-ci > <aside> pages index.html & product.html
async function basketLength(){
        if(listTeddies === null || listTeddies.length == 0){
            document.querySelector('#basket-length').innerText += `Votre panier est vide` 
        } else if(listTeddies.length === 1) {
            document.querySelector('#basket-length').innerText += `Votre panier contient ${listTeddies.length} article` 
        } else {
            document.querySelector('#basket-length').innerText += `Votre panier contient ${listTeddies.length} articles` 
        }
}

// ------------------------------------------------------- VALIDER LE PANIER ------------------------------------------------------- 
// fonction qui affiche formulaire à remplir (coordonnées utilisateur) au clic "valider votre panier"
function displayForm() {
    if(listTeddies === null || listTeddies.length == 0){
        alert('Aucun produit à valider dans le panier')
    } else {
        document.querySelector('#basket-validation').disabled = true;
        document.querySelector('#form').innerHTML += `<div class="" id="user-contact" method="POST" action="http://localhost:3000/api/teddies/order">
                                                        <div class="row form-group">
                                                            <label class="col-3" for="lastname">Nom</label>
                                                            <input class="col-3 form-control text-uppercase" type="text" id="lastname" name="lastname" pattern="[a-zA-Zà-úÀ-Ú -]{2,25}" value=""  required />
                                                        </div>

                                                        <div class="row form-group">
                                                            <label class="col-3" for="firstname">Prénom</label>
                                                            <input class="col-3 form-control text-uppercase" type="text" id="firstname" name="firstname" pattern="[a-zA-Zà-úÀ-Ú -]{3,25}" value="" required />
                                                        </div>

                                                        <div class="row form-group">
                                                            <label class="col-3" for="address">Adresse de livraison</label>
                                                            <input class="col-3 form-control" type="text" id="address" name="address" pattern="^[0-9a-zA-Zà-úÀ-Ú ,.-]{2,}" required />
                                                        </div>

                                                        <div class="row form-group">
                                                            <label class="col-3" for="city">Code postal & ville</label>
                                                            <input class="col-3 form-control text-uppercase" type="text" id="city" name="city" pattern="^[0-9]{5}[ ]{1}[a-zA-Zà-úÀ-Ú -]{2,25}$" placeholder="75000 PARIS" required />
                                                        </div>

                                                        <div class="row form-group">
                                                            <label class="col-3" for="email">Email</label>
                                                            <input class="col-3 form-control" type="email" id="email" name="email" placeholder="orinoco@contact.fr" pattern="^[a-z0-9._-]+@[a-z0-9._-]{2,}[.][a-z]{2,4}$" required />
                                                        </div>

                                                        <div class="row text-center">
                                                        <input class="btn-primary id="form-validation" col-3" type="submit" alt="Validation" value="Confirmer vos informations" />
                                                        </div>  
                                                    </div>`;

        document.querySelector('#user-contact [type=submit]').addEventListener("click", () => {
            checkInputUser();
          })
    }
};  

// vérifier la validité des champs saisis par l'utilisateur - les enregistrer s'ils sont valides
function checkInputUser() {
    let inputsToCheck = document.querySelectorAll('#user-contact input:not([type=submit])')
    let valid = true;

    //Vérifier la validité de chaque saisie de l'utilisateur
    for (let i = 0 ; i < inputsToCheck.length ; i++) {
        valid &= inputsToCheck[i].reportValidity();
        if(!valid) {
            break;
        } 
    }
    
    // Si toutes les saisies de l'utilisateur sont bien valides > appliquer la fonction sendUsersInfoToApi 
    if(inputsToCheck = valid) {
        sendUsersInfoToApi();
    } 
}

function confirmProcess() { 
    window.location.replace('http://127.0.0.1:3000/FrontEnd/confirm.html')
}                                                           


// appeller les fonctions et ajout du produit panier au clic (function addToBasket > basket.js)
(async function() {
    const teddyId = getTeddyId()
    const teddy = await getTeddy(teddyId)
    displayTeddy(teddy);
    document.querySelector('#add-button').addEventListener('click', function() {
        addToBasket(this.dataset.id);
        alert('L\'article a bien été ajouté à votre panier !')
    }); 
})()

// récupérer l'id passé dans l'URL pour afficher le produit sélectionné
function getTeddyId() {
    return new URL(location.href).searchParams.get('id')
}

// afficher les infos du produit unique (teddy) cliqué par l'utilisateur
function displayTeddy(teddy) {
    let price = teddy.price
    price /= 100
    document.querySelector('#product-sheet').innerHTML +=  `<h2 class="bg-light border-bottom">Personnalisez votre article</h2>
                                                            <article class="card shadow">
                                                                <div class="card-header">
                                                                    <h3 class="card-title">${teddy.name}</h3>
                                                                </div>

                                                                <figure class="card-body">    
                                                                    <img class="card-img-top" src="${teddy.imageUrl}" alt="image de ${teddy.name}" />

                                                                    <figcaption>
                                                                        <p class="card-text">
                                                                            ${teddy.description}
                                                                        </p>

                                                                        <p class="card-text">
                                                                            ${price} €
                                                                        </p>
                                                                    </figcaption>
                                                                </figure>

                                                                <form class="user-custom py-4">
                                                                    <select name="colorPick" id="color-pick" size="1">
                                                                    </select>
                                                                </form> 
                                                                <button class="btn-primary px-8" id="add-button" type="submit" data-id="${teddy._id}">Ajouter au panier</button>
                                                            </article>`;
    colorPick(teddy)
}

// Adapter le nombre d'options proposées (couleur) en fonction de ce qui est proposé pour chaque Teddy
async function colorPick(teddy) {
    const teddyId = getTeddyId()
    await getTeddy(teddyId)
    for(let i = 0 ; i < teddy.colors.length ; i++) {
    document.querySelector('#color-pick').innerHTML += `<option>${teddy.colors[i]}</option>`
    }
}


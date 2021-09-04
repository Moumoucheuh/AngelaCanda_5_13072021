(async function() {
    const teddies = await getTeddies()  
    for (teddy of teddies) {
        displayTeddy(teddy)
    } 
})()

// Afficher les données sur index.html + lien vers page produit unique
function displayTeddy(teddy) {
    let price = teddy.price
    price /= 100 
    document.querySelector('#display-teddies').innerHTML += `<div class="card m-3 shadow teddy-card col-11 col-md-3">
                                                                <a href="product.html?id=${teddy._id}" id="teddy-link">
                                                                    <div class="card-header">
                                                                        <p class="card-title">${teddy.name}</p>
                                                                    </div>
                                                                    <div class="row">
                                                                        <img class="card-img-top" src="${teddy.imageUrl}" alt="image de ${teddy.name}"/>
                                                                        <div class="card-body">
                                                                            <p class="card-text price" id="price">
                                                                                ${price} €
                                                                            </p>
                                                                        </div>
                                                                    </div>    
                                                                </a>
                                                             </div>`
}




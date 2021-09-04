displayConfirm();

function displayConfirm() {
    let orderConfirm = JSON.parse(localStorage.getItem('orderConfirm'));
    let amount = JSON.parse(localStorage.getItem('amount'));
    document.querySelector('#order-confirm-message').innerHTML += `<div class="text-center">
                                                                        <p class="text-uppercase"> ${orderConfirm.contact.firstName} ${orderConfirm.contact.lastName} </p>
                                                                        <p> Votre commande n° <span class="font-weight-bold">${orderConfirm.orderId}</span> a bien été prise en compte ! </p>
                                                                        <p> Vous serez débité(e) de ${amount}€ à l'éxpédition de votre colis. </p>
                                                                        <p>Orinco vous remercie de votre confiance !</p>
                                                                    </div>`

    localStorage.clear();
}






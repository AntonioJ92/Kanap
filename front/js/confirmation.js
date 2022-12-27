let numeroDeCommande = new URLSearchParams(document.location.search).get("id"); // Création de la variable numeroDeCommande qui recupere la valeur(numero de commande) de la clé "id" affiché a la fin de l'url de la page confirmation

document.querySelector("#orderId").innerHTML = numeroDeCommande; // Ajout du numero de commande sous format texte à l'élément html ayant comme id "orderId"
let panier = JSON.parse(localStorage.getItem("panier")); // Recuperation de ce qui a été sauvegardé dans le localStorage sous format objet
console.table(panier); //Affichage de la variable panier sous format tableau

let section = document.querySelector("#cart__items"); // Création de la variable section et mise en relation avec la balise html ayant comme id cart__items

for (let produit of panier) { // Boucle pour chaque produit(création de variable) contenu dans la panier
    fetch(`http://localhost:3000/api/products/${produit.id}`) // Récuperation des données de l'API pour chaque produit selon son id
        .then(function (res) {
            if (res.ok) {
                return res.json();
            }
        })
        .then(function (donneesProduitAPI) { // Création d'une fonction ayant en paramètre "donneesProduitAPI"

            let baliseArticle = document.createElement("article"); // Création de la variable baliseArticle qui crée une balise article
            baliseArticle.setAttribute("class", "cart__item"); // Ajout d'un attribut class ainsi que sa valeur "cart__item"
            baliseArticle.setAttribute("data-id", produit.id); // Ajout d'un attribut data-id ainsi que sa valeur qui est l'id de chaque produit de la boucle
            baliseArticle.setAttribute("data-color", produit.couleur); // Ajout d'un attribut data-color ainsi que sa valeur qui est la couleur de chaque produit de la boucle
            section.appendChild(baliseArticle); // Association du parent "section" et de l'enfant "baliseArticle"

            let divImg = document.createElement("div"); // Création de la variable divImg qui crée une balise html div
            divImg.setAttribute("class", "cart__item__img"); // Ajout de l'attribut class ainsi que sa valeur "cart__item__img"
            baliseArticle.appendChild(divImg); // Association du parent "baliseArticle" et de l'enfant "divImg"

            let elementImage = document.createElement("img"); // Création de la variable elementImage qui crée une balise html img
            elementImage.setAttribute("src", donneesProduitAPI.imageUrl); // Ajout de l'attribut src ainsi que sa valeur qui est l'image du paramètre de la fonction
            elementImage.setAttribute("alt", "Photographie d'un canapé"); // Ajout de l'attribut alt ainsi que sa valeur "Photographie d'un canapé"
            divImg.appendChild(elementImage); // Association du parent "divImg" et de l'enfant "elementImage"

            let divGestionProduit = document.createElement("div"); // Création de la variable divGestionProduit qui crée une balise html div
            divGestionProduit.setAttribute("class", "cart__item__content"); // Ajout de l'attribut class ainsi que sa valeur "cart__item__content"
            baliseArticle.appendChild(divGestionProduit); // Association du parent "baliseArticle" et de l'enfant "divGestionProduit"

            let divDescriptionProduit = document.createElement("div"); // Création de la variable divDescriptionProduit qui crée une balise html div
            divDescriptionProduit.setAttribute("class", "cart__item__content__description"); // Ajout de l'attribut class ainsi que sa valeur "cart__item__content__description"
            divGestionProduit.appendChild(divDescriptionProduit); // Association du parent "divGestionProduit" et de l'enfant "divDescriptionProduit"

            let titreProduit = document.createElement("h2"); // Création de la variable titreProduit qui créer une balise html h2
            titreProduit.textContent = donneesProduitAPI.name; // Ajout du nom de l'élément en paramètre de la fonction à la variable titreProduit en tant que texte
            divDescriptionProduit.appendChild(titreProduit); // Association du parent "divDescriptionProduit" et de l'enfant "titreProduit"

            let couleurProduit = document.createElement("p"); // Création de la variable couleurProduit qui crée une balise html p
            couleurProduit.textContent = produit.couleur; // Ajout de la couleur de chaque produit de la boucle à la variable couleurProduit en tant que texte
            divDescriptionProduit.appendChild(couleurProduit); // Association du parent "divDescriptionProduit" et de l'enfant "couleurProduit"

            let prixProduit = document.createElement("p"); // Création de la variable prixProduit qui crée une balise html p
            prixProduit.textContent = donneesProduitAPI.price + "€"; // Ajout du prix de l'élément en paramètre de la fonction à la variable prixProduit en tant que texte
            divDescriptionProduit.appendChild(prixProduit); // Association du parent "divDescription" et de l'enfant "prixProduit"

            let divGestionQuantite = document.createElement("div"); // Création de la variable divGestionQuantite qui crée une balise html div
            divGestionQuantite.setAttribute("class", "cart__item__content__settings"); // Ajout de l'attribut class ainsi que sa valeur "cart__item__content__settings"
            divGestionProduit.appendChild(divGestionQuantite); // Association du parent "divGestionProduit" et de l'enfant "divGestionQuantite"

            let divQuantiteProduit = document.createElement("div"); // Création de la variable divQuantiteProduit aui crée une balise html div
            divQuantiteProduit.setAttribute("class", "cart__item__content__settings__quantity"); // Ajout de l'attribut class ainsi que sa valeur "cart__item__content__settings__quantity"
            divGestionQuantite.appendChild(divQuantiteProduit); // Association du parent "divGestionQuantite" et de l'enfant "divQuantiteProduit"

            let quantiteProduit = document.createElement("p");// Création de la variable quantiteProduit qui crée une balise html p
            quantiteProduit.textContent = "Qté : "; // Ajout de texte à la variable quantiteProduit
            divQuantiteProduit.appendChild(quantiteProduit); // Association du parent "divQuantiteProduit" et de l'enfant "quantiteProduit"

            let formulaireGestionQuantite = document.createElement("input"); // Création de la variable formulaireGestionQuantite qui crée une balise html input
            formulaireGestionQuantite.setAttribute("type", "Number"); // Ajout de l'attribut type ainsi que sa valeur "Number"
            formulaireGestionQuantite.setAttribute("class", "itemQuantity"); // Ajout de l'attribut class ainsi que sa valeur "itemQuantity"
            formulaireGestionQuantite.setAttribute("name", "itemQuantity"); // Ajout de l'attribut name ainsi que sa valeur "itemQuantity"
            formulaireGestionQuantite.setAttribute("min", "1"); // Ajout de l'attribut min ainsi que sa valeur "1"
            formulaireGestionQuantite.setAttribute("max", "100"); // Ajout de l'attribut max ainsi que sa valeur "100"
            formulaireGestionQuantite.setAttribute("value", produit.quantite); // Ajout de l'attribut value ainsi que sa valeur qui est la quantite de chaque produit de la boucle
            divQuantiteProduit.appendChild(formulaireGestionQuantite); // Association du parent "divQuantiteProduit" et de l'enfant "formulaireGestionQuantite"

            let divSuppression = document.createElement("div"); // Création de la variable divSuppression qui crée une balise html div
            divSuppression.setAttribute("class", "cart__item__content__settings__delete"); // Ajout de l'attribut class ainsi que sa valeur "cart__item__content__settings__delete"
            divGestionQuantite.appendChild(divSuppression); // Association du parent "divGestionQuantite" et de l'enfant "divSuppression"

            let supprimerProduit = document.createElement("p"); // Création de la variable supprimerProduit qui crée une balise html p
            supprimerProduit.setAttribute("class", "deleteItem"); // Ajout de l'attribut class ainsi que sa valeur "deleteItem"
            supprimerProduit.textContent = "Supprimer"; // Ajout de texte à la variable supprimerProduit
            divSuppression.appendChild(supprimerProduit); // Association du parent "divSuppression" et de l'enfant "supprimerProduit"

            supprimerDuPanier(); // Activation de la fonction de suppression du panier
            obtenirQuantiteTotale(); // Activation de la fonction d'obtention de la quantité totale de produit dans le panier
            obtenirPrixTotal(); // Activation de la fonction d'obtention du prix total du panier
            changerQuantiteProduits(); // Activation de la fonction de mise a jour de la quantite de produit dans le panier

        })
        .catch(function (err) {
            // Une erreur est survenue
        })
};
    
    


function sauvegardeDuPanier(panier){ // Création de la fonction de sauvegarde du panier
    localStorage.setItem("panier", JSON.stringify(panier)); // On stock les modifications apportées à "panier" au local storage
}

function recuperationDuPanier(){ // Création de la fonction de recuperation des données enregistrées dans le panier
    let panier = localStorage.getItem("panier"); // Création de la variable panier correspondant aux données stockées dans la local storage
    if(panier == null){ // Condition, si panier est vide
        return []; // On retourne un tableau vide
    }else{ // Sinon
        return JSON.parse(panier); // On retourne le panier
    }
}

function supprimerDuPanier(){ // Création de la fonction de suppression d'un produit du panier lorsque l'on clique sur le bouton supprimer du produit en question
    let panier = recuperationDuPanier(); // Création de la variable panier mise en relation avec la fonction de recuperation du panier
    let boutonsSupprimer = document.querySelectorAll(".deleteItem"); // Création de la variable boutonsSupprimer qui correspond a tous les boutons supprimer presents sur la page panier
    for (let bouton of boutonsSupprimer) { // Boucle parcourant chaque bouton(création de variable) parmis tous les boutons supprimer de la page panier
        bouton.addEventListener("click", (event) =>{ // Création d'un evenement lors d'un click sur chaque bouton supprimer de la page panier
            let noeudArticle = event.target.closest(".cart__item"); // Création de la variable noeudArticle qui vient chercher le parent(ayant en class "cart__item") direct du bouton "supprimer" sur lequel on a cliqué
            noeudArticle.remove(); // Suppression du DOM de l'élément cherché par noeudArticle
            let dataIDArticle = noeudArticle.dataset.id; // Création de la variable dataIDArticle et mise en relation avec la valeur de l'attribut data-id de noeudArticle
            let dataColorArticle = noeudArticle.dataset.color; // Création de la variable dataColorArticle et mise en relation avec la valeur de l'attribut data-color de noeudArticle
            let objetPanier = panier.findIndex(p => p.id == dataIDArticle && p.couleur == dataColorArticle); // Création de la variable objetPanier qui vient chercher dans "panier" l'indice du premier element trouvé qui rempli la condition cité en paramètre
            panier.splice(objetPanier, 1); // Retrait du panier l'élement correspondant à l'indice 1 d'objetPanier
            sauvegardeDuPanier(panier); // Activation de la fonction de sauvegarde du panier ayant en paramètre le panier récupéré plus haut dans la fonction de suppression d'un produit du panier
            obtenirQuantiteTotale(); // Activation de la fonction d'obtention de la quantité totale de produit dans le panier
            obtenirPrixTotal(); // Activation de la fonction d'obtention du prix total du panier
            return location.reload(); // Actualisation de la page panier suite a suppression d'un élément du panier
        })
    }
}

function obtenirQuantiteTotale(){ // Création de la fonction d'obtention de la quantité totale de produit dans le panier
    let panier = recuperationDuPanier(); // Création de la variable panier mise en relation avec la fonction de recuperation du panier
    let nombre = 0; // Création de la variable nombre qui correspond au nombre entier 0
    for(let produit of panier){ // Boucle parcourant chaque produit(création de variable) du panier
        nombre += produit.quantite; // On ajoute a la variable nombre la quantité de chaque produit
    }
    let quantiteTotale = document.querySelector("#totalQuantity"); // Création de la variable quantiteTotale mise en relation avec l'element html ayant comme id "totalQuantity"
            quantiteTotale.textContent = nombre; // Ajout de texte (correspondant à la variable nombre) à la variable quantiteTotale
}

function obtenirPrixTotal() { // Création de la fonction d'obtention du prix total du panier
    let panier = recuperationDuPanier(); // Création de la variable panier mise en relation avec la fonction de recuperation du panier
    let total = 0; // Création de la variable total qui correspond au nombre entier 0
    for (let produit of panier) { // Boucle parcourant chaque produit(création de variable) du panier
        fetch(`http://localhost:3000/api/products/${produit.id}`) // Récuperation des données de l'API pour chaque produit selon son id
            .then(function (res) {
                if (res.ok) {
                    return res.json();
                }
            })
            .then(function (donneesProduit) { // Création d'une fonction ayant en paramètre "donneesProduit"
                total += produit.quantite * donneesProduit.price; // On multiplie la quantité de chaque produit au prix de leur référence et on additionne le tout à la variable total
                let prixTotal = document.querySelector("#totalPrice"); // Création de la variable mise en relation avec l'élément html ayant comme id "totalPrice"
                prixTotal.textContent = total; // Ajout de texte (correspondant à la variable total) à la variable prixTotal
            })
    }
}

function changerQuantiteProduits(){ // Création de la fonction de mise a jour de quantite de produit dans le panier
    let panier = recuperationDuPanier(); // Création de la variable panier mise en relation avec la fonction de recuperation du panier
    let inputChanger = document.querySelectorAll(".itemQuantity"); // Création de la variable inputChanger mise en relation avec tous les éléments html ayant comme class itemQuantity
    for (let input of inputChanger) { // Boucle parcourant chaque input parmis tous les input de changement de quantité de produit présents dans la page panier
        input.addEventListener("change", (event) =>{ // Création d'un evenement lors d'une modification dans chaque input
            let noeudArticle = event.target.closest(".cart__item"); // Création de la variable noeudArticle qui vient chercher le parent(ayant en class "cart__item") direct de l'input dans lequel on a fait une modification
            let dataIDArticle = noeudArticle.dataset.id; // Création de la variable dataIDArticle et mise en relation avec la valeur de l'attribut data-id de noeudArticle
            let dataColorArticle = noeudArticle.dataset.color; // Création de la variable dataColorArticle et mise en relation avec la valeur de l'attribut data-color de noeudArticle
            let objetpanier = panier.find(p => p.id == dataIDArticle && p.couleur == dataColorArticle); // Création de la variable objetPanier qui vient chercher dans "panier" l'indice du premier element trouvé qui rempli la condition cité en paramètre
            if (event.target.value >= 1 && event.target.value <= 100){ // Condition si la valeur de l'input modifié est comprise entre 1 et 100
                objetpanier.quantite = parseInt(event.target.value); // Alors la quantité du premier element trouvé dans le panier correspond à l'entier(parseInt) de la valeur de l'input modifié
            }else{ // Sinon
                alert("Le nombre d'articles doit etre compris entre 1 et 100") // Une fenêtre pop apparait indiquant ce message
            };
            sauvegardeDuPanier(panier); // Activation de la fonction de sauvegarde du panier ayant en paramètre le panier récupéré plus haut dans la fonction de suppression d'un produit du panier
            obtenirQuantiteTotale(); // Activation de la fonction d'obtention de la quantité totale de produit dans le panier
            obtenirPrixTotal(); // Activation de la fonction d'obtention du prix total du panier
        })
    }
}

//------------------------------------------------------------------------
//VALIDATION REGEX PRENOM

let prenom = document.querySelector("#firstName"); // Création de la variable prenom mise en relation avec l'element html ayant comme id "firstName"
prenom.setAttribute("value", ""); // Ajout de l'attribut "value" ainsi que sa valeur ""
let prenomError = document.querySelector("#firstNameErrorMsg"); // Création de la variable prenomError mise en relation avec l'élément html ayant comme id "firstNameErrorMsg"
prenom.addEventListener("change", () => { // Création d'un evenement lors d'une modification de la variable prenom
    validationPrenom(prenom); // Activation de la fonction de validation du texte renseigné dans l'input correspondant au prenom
})

function validationPrenom(prenom){ // Création de la fonction de validation du texte renseigné dans l'input correspondant au prenom
    let prenomReg = new RegExp(/^[a-zA-Z 'áàâäãåçéèêëíìîïñóòôöõúùûüýÿæœÁÀÂÄÃÅÇÉÈÊËÍÌÎÏÑÓÒÔÖÕÚÙÛÜÝŸÆŒ-]+$/); // Création de la variable prenomReg qui autorise les caractères spécifiés en rouge
    let resRegexPrenom = prenomReg.test(prenom.value); // Création de la variable resRegexPrenom qui verifie(test) le texte saisie(value) du parametre de la fonction(prenom) avec la variable d'autorisation de caractères spécifiques(prenomReg)
    if (resRegexPrenom){ // Condition si la variable resRegexPrenom est vraie
        prenomError.innerHTML = ""; // Alors on indique rien ("") dans la variable prenomError
    }else{ // Sinon
        prenomError.innerHTML = "Veuillez saisir un prénom valide"; // On indique ce texte dans la variable prenomError
    }
}

//------------------------------------------------------------------------
//VALIDATION REGEX NOM

let nom = document.querySelector("#lastName"); // Création de la variable nom mise en relation avec l'element html ayant comme id "lastName"
nom.setAttribute("value", ""); // Ajout de l'attribut "value" ainsi que sa valeur ""
let nomError = document.querySelector("#lastNameErrorMsg"); // Création de la variable nomError mise en relation avec l'élément html ayant comme id "lastNameErrorMsg"
nom.addEventListener("change", () => { // Création d'un evenement lors d'une modification de la variable nom
    validationNom(nom); // Activation de la fonction de validation du texte renseigné dans l'input correspondant au nom
})

function validationNom(nom){ // Création de la fonction de validation du texte renseigné dans l'input correspondant au nom
    let nomReg = new RegExp(/^[a-zA-Z 'áàâäãåçéèêëíìîïñóòôöõúùûüýÿæœÁÀÂÄÃÅÇÉÈÊËÍÌÎÏÑÓÒÔÖÕÚÙÛÜÝŸÆŒ-]+$/); // Création de la variable nomReg qui autorise les caractères spécifiés en rouge
    let resRegexNom = nomReg.test(nom.value); // Création de la variable resRegexNom qui verifie(test) le texte saisie(value) du parametre de la fonction(nom) avec la variable d'autorisation de caractères spécifiques(nomReg)
    if (resRegexNom){ // Condition si la variable resRegexNom est vraie
        nomError.innerHTML = ""; // Alors on indique rien ("") dans la variable nomError
    }else{ // Sinon
        nomError.innerHTML = "Veuillez saisir un nom valide"; // On indique ce texte dans la variable nomError
    }
}

//------------------------------------------------------------------------
// VALIDATION REGEX ADRESSE

let adresse = document.querySelector("#address"); // Création de la variable adresse mise en relation avec l'element html ayant comme id "address"
adresse.setAttribute("value", ""); // Ajout de l'attribut "value" ainsi que sa valeur ""
let adresseError = document.querySelector("#addressErrorMsg"); // Création de la variable adresseError mise en relation avec l'élément html ayant comme id "addressErrorMsg"
adresse.addEventListener("change", () => { // Création d'un evenement lors d'une modification de la variable adresse
    validationAdresse(adresse); // Activation de la fonction de validation du texte renseigné dans l'input correspondant a l'adresse
})

function validationAdresse(adresse){ // Création de la fonction de validation du texte renseigné dans l'input correspondant a l'adresse
    let adresseReg = new RegExp(/^[a-zA-Z ',0-9áàâäãåçéèêëíìîïñóòôöõúùûüýÿæœÁÀÂÄÃÅÇÉÈÊËÍÌÎÏÑÓÒÔÖÕÚÙÛÜÝŸÆŒ-]+$/); // Création de la variable adresseReg qui autorise les caractères spécifiés en rouge
    let resRegexAdresse = adresseReg.test(adresse.value); // Création de la variable resRegexAdresse qui verifie(test) le texte saisie(value) du parametre de la fonction(adresse) avec la variable d'autorisation de caractères spécifiques(adresseReg)
    if (resRegexAdresse){ // Condition si la variable resRegexAdresse est vraie
        adresseError.innerHTML = ""; // Alors on indique rien ("") dans la variable adresseError
    }else{ // Sinon
        adresseError.innerHTML = "Veuillez saisir une adresse valide"; // On indique ce texte dans la variable adresseError
    }
}

//------------------------------------------------------------------------
// VALIDATION REGEX VILLE

let ville = document.querySelector("#city"); // Création de la variable ville mise en relation avec l'element html ayant comme id "city"
ville.setAttribute("value", ""); // Ajout de l'attribut "value" ainsi que sa valeur ""
let villeError = document.querySelector("#cityErrorMsg"); // Création de la variable villeError mise en relation avec l'élément html ayant comme id "cityErrorMsg"
ville.addEventListener("change", () => { // Création d'un evenement lors d'une modification de la variable ville
    validationVille(ville); // Activation de la fonction de validation du texte renseigné dans l'input correspondant a la ville
})

function validationVille(ville){ // Création de la fonction de validation du texte renseigné dans l'input correspondant a la ville
    let villeReg = new RegExp(/^[a-zA-Z 'áàâäãåçéèêëíìîïñóòôöõúùûüýÿæœÁÀÂÄÃÅÇÉÈÊËÍÌÎÏÑÓÒÔÖÕÚÙÛÜÝŸÆŒ-]+$/); // Création de la variable villeReg qui autorise les caractères spécifiés en rouge
    let resRegexVille = villeReg.test(ville.value); // Création de la variable resRegexVille qui verifie(test) le texte saisie(value) du parametre de la fonction(ville) avec la variable d'autorisation de caractères spécifiques(villeReg)
    if (resRegexVille){ // Condition si la variable resRegexVille est vraie
        villeError.innerHTML = ""; // Alors on indique rien ("") dans la variable villeError
    }else{ // Sinon
        villeError.innerHTML = "Veuillez saisir une ville valide"; // On indique ce texte dans la variable villeError
    }
}

//------------------------------------------------------------------------
//VALIDATION REGEX EMAIL

let email = document.querySelector("#email"); // Création de la variable email mise en relation avec l'element html ayant comme id "email"
email.setAttribute("value", ""); // Ajout de l'attribut "value" ainsi que sa valeur ""
let emailError = document.querySelector("#emailErrorMsg"); // Création de la variable emailError mise en relation avec l'élément html ayant comme id "emailErrorMsg"
email.addEventListener("change", () => { // Création d'un evenement lors d'une modification de la variable email
    validationEmail(email); // Activation de la fonction de validation du texte renseigné dans l'input correspondant a l'email
})

function validationEmail(email){ // Création de la fonction de validation du texte renseigné dans l'input correspondant a l'email
    let emailReg = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))/i); // Création de la variable emailReg qui autorise les caractères spécifiés en rouge
    let resRegexEmail = emailReg.test(email.value); // Création de la variable resRegexEmail qui verifie(test) le texte saisie(value) du parametre de la fonction(email) avec la variable d'autorisation de caractères spécifiques(emailReg)
    if (resRegexEmail){ // Condition si la variable resRegexEmail est vraie
        emailError.innerHTML = ""; // Alors on indique rien ("") dans la variable emailError
    }else{ // Sinon
        emailError.innerHTML = "Veuillez saisir une adresse email valide"; // On indique ce texte dans la variable emailError
    }
}

function validationFormulaire (){ // Création de la fonction de validation des éléments renseignés dans le formulaire
    let tabID = []; // Création de la variable tabID qui correspond a un tableau vide
    let infosContact = { // Création de la variable infosContact qui correspond a un objet contenant les clés-valeurs ci-dessous
        firstName : prenom.value,
        lastName : nom.value,
        address : adresse.value,
        city : ville.value,
        email : email.value
    }
    console.log(infosContact)
    for (let produit of panier) { // Boucle parcourant chaque produit du panier
        tabID.push(produit.id) // On injecte les id de chaque produit du panier dans le tableau vide "tabID"
    }
    let infosDeCommande = { // Création de la variable infosDeCommande qui correspond a un objet contenant les clés-valeurs ci-dessous
        contact : infosContact,
        products : tabID
    }
    console.log(JSON.stringify(infosDeCommande))
    console.log(tabID)
    if(!prenom.value || !nom.value || !adresse.value || !ville.value || !email.value){ // Condition si la valeur d'un des éléments du formulaire est vide
        alert("Veuillez remplir les champs") // Alors une fenêtre pop apparait indiquant ce message
    }else{ // Sinon
        fetch("http://localhost:3000/api/products/order", { // Une requete est crée avec la page order
        method: "POST", // Méthode d'envoi et reception de données
        headers: { // Format de ce qui sera envoyé
            "Accept": "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify(infosDeCommande) // Ce que l'on envoi au backend au format chaine de caractère
        })
        .then((res) => res.json())
        .then((data) => {
            console.log(data.orderId);
            window.location.href = `./confirmation.html?id=${data.orderId}`; // On attache la réponse du backend(numero de commande) a la fin de l'url de la page confirmation ayant en clé "id"
        })
        .catch(function (err) {
            console.log(err);
            alert(err + "erreur");
        });
    }
}

let btnCommander = document.querySelector("#order"); // Création de la variable btnCommander mise en relation avec l'élément html ayant comme id "order"
    btnCommander.addEventListener("click", (e) => { // // Création d'un evenement lors du click sur le btnCommander
        e.preventDefault(); // On vient empecher le declenchement normal de "e"
        validationFormulaire(); // Activation de la fonction de validation du formulaire
    })
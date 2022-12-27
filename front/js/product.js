let windowLocation = window.location.href; //Création de la variable "windowLocation" contenant l'URL de cette page

let url = new URL(windowLocation);

let idProduit = url.searchParams.get("id"); //Création de la variable "idProduct" et Extraction de la valeur via la clé "id" au sein de l'URL
console.log(idProduit); //Affichage de la variable "idProduct" dans la console

fetch(`http://localhost:3000/api/products/${idProduit}`) // Requete de l'API d'un produit via son "idProduct"
    .then(function(res) {
        if (res.ok) {
            return res.json();
        }
    })
    .then(function(selectionProduit) {
        console.log(selectionProduit)
        // INTEGRATION DES ELEMENTS DANS LE DOM

        let divImg = document.querySelector(".item__img"); //Création de la variable divImg et mise en relation avec la balise html comportant la class item__img
        let elementImage = document.createElement("img"); //Création de la variable elementImage qui correspond à une création de balise html <img>
        elementImage.setAttribute("src", selectionProduit.imageUrl); //Ajout de l'attribut src ainsi que sa valeur selectionProduit.imageUrl à la variable elementImage
        elementImage.setAttribute("alt", selectionProduit.altTxt); //Ajout de l'attribut alt ainsi que sa valeur selectionProduit.altTxt à la variable elementImage
        divImg.appendChild(elementImage); //Mise en relation entre le parent divImg et son enfant elementImage

        let titreProduit = document.getElementById("title"); //Création de la variable titreProduit et mise en relation avec la balise html comportant l'id title
        titreProduit.textContent = selectionProduit.name; //Ajout de texte correspondant à selectionProduit.name à la variable titreProduit

        let prixProduit = document.getElementById("price"); //Création de la variable prixProduit et mise en relation avec la balise html comportant l'id price
        prixProduit.textContent = selectionProduit.price; //Ajout de texte correspondant à selectionProduit.price à la variable prixProduit

        let descriptionProduit = document.getElementById("description"); //Création de la variable descriptionProduit et mise en relation avec la balise html comportant l'id description
        descriptionProduit.textContent = selectionProduit.description; //Ajout de texte correspondant à selectionProduit.description à la variable descriptionProduit

        let selectionCouleur = document.getElementById("colors"); //Création de la variable selectionCouleur et mise en relation avec la balise html comportant l'id colors
        for (let couleur of selectionProduit.colors){
            let couleurProduit = document.createElement("option"); //Création de la variable couleurProduit qui correspond à une création de balise html <option>
            couleurProduit.setAttribute("value", couleur); //Ajout de l'attribut value ainsi que sa valeur couleur à la variable couleurProduit
            couleurProduit.textContent = couleur; //Ajout de texte correspondant à couleur à la variable couleurProduit
            selectionCouleur.appendChild(couleurProduit); //Mise en relation entre le parent selectionCouleur et son enfant couleurProduit
        }

        let quantiteProduit = document.querySelector("#quantity") // Création de la variable quantiteProduit qui correspond a la selection de la balise html ayant comme id quantity
        let bouton = document.querySelector("#addToCart"); // Création de la variable bouton qui correspond a la selection de la balise html ayant comme id addToCart
        bouton.addEventListener("click", () => { // Création d'un evenement se declenchant au "click" sur la variable "bouton"
            if(quantiteProduit.value >= 1 && quantiteProduit.value <= 100) { // Si la valeur de quantiteProduit est superieur ou egal a 1 et inferieur ou egal a 100
                ajoutAuPanier(selectionProduit); // Alors la fonction ajoutAuPanier ayant en parametre selectionProduits s'active
            }else{ // Sinon
                alert("Le nombre d'articles doit etre compris entre 1 et 100") // On affiche une fenêtre pop contenant ce message
            }
        })
    })
    .catch(function(err) {
        // Une erreur est survenue
    })
;

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

function ajoutAuPanier(produit){ // Création de la fonction d'ajout d'éléments au panier
    let panier = recuperationDuPanier(); // Création de la variable panier recuperant les éléments composants le panier
    let elementCouleur = document.querySelector("#colors"); // Création de la variable elementCouleur correspondant à la balise html ayant comme id colors
    let elementQuantite = document.querySelector("#quantity"); // Création de la variable elementQuantite correspondant à la balise html ayant comme id quantity
    let elementProduit = { // Création de la variable elementProduit étant un objet contenant differentes clés-valeurs:
        id: produit._id, // Clé = id, Valeur = "_id" du produit
        quantite: parseInt(elementQuantite.value), // Clé = quantite, Valeur = la "value" séléctionné depuis l'input de la quantité en entier et non en chaine de caractère(parseInt)
        couleur: elementCouleur.value, // Clé = couleur, Valeur la "value" séléctionné depuis l'input de la couleur
    };
    let rechercheProduit = panier.find(p => p.id == elementProduit.id && p.couleur == elementProduit.couleur); // Création de la variable rechercheProduit qui vient chercher le premier élément trouver dans la condition citée en parametre
    if(rechercheProduit != undefined){ // Condition si different de "undefined"
        rechercheProduit.quantite = rechercheProduit.quantite + elementProduit.quantite; // Alors la quantité de rechercheProduit s'ajoute a celle de la variable elementProduit
        sauvegardeDuPanier(panier) // Alors activation de la fonction sauvegarde du panier
    }else{ // Sinon
        panier.push(elementProduit); // On ajoute elementProduit au panier
        sauvegardeDuPanier(panier); // Puis activation de la fonction sauvegarde du panier
    };
}
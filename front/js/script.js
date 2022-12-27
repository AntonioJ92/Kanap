fetch("http://localhost:3000/api/products") // Requete de l'API de tous les produits
    .then(function(res) {
        if (res.ok) {
            return res.json();
        }
    })
    .then(function(products) { //Création d'une fonction ayant en parametre "products"
        console.log(products); //Affichage de l'API dans la console
        let blocItems = document.getElementById('items'); //Création de la variable blocItems et mise en relation avec la balise html comportant l'id items
        for (let product of products) { //Boucle parcourant chaque product(création de variable) correspondant à chaque objet de l'API(ligne 7)

            let eltA = document.createElement("a"); //Création de la variable "eltA" qui crée une balise <a>
            eltA.setAttribute("href", `./product.html?id=${product._id}`); //Ajout d'un attribut "href" ainsi que le chemin
            blocItems.appendChild(eltA); //Association du parent(<section> id="items" = variable "blocItems") avec l'enfant(<a> = variable "eltA")
            
            let eltArticle = document.createElement("article"); //Création de la variable "eltArticle" qui crée une balise <article>
            eltA.appendChild(eltArticle); //Association du parent(<a> = variable "eltA") avec l'enfant(<article> = variable "eltArticle")

            let eltImg = document.createElement("img"); //Création de la variable "eltImg" qui crée une balise <img>
            eltImg.setAttribute("src", product.imageUrl); //Ajout d'un attribut "src" ainsi que l'élément "imageUrl" contenu dans chaque "product" de la boucle
            eltImg.setAttribute("alt", product.altTxt); //Ajout d'un attribut "alt" ainsi que l'élément "altTxt" contenu dans chaque "product" de la boucle
            eltArticle.appendChild(eltImg); //Association du parent(<article> = variable "eltArticle") avec l'enfant(<img> = variable "eltImg")

            let eltTitre = document.createElement("h3"); //Création de la variable "eltTitre" qui crée une balise <h3>
            eltTitre.classList.add("productName"); //Ajout d'une "class" ayant comme intitulé "productName"
            eltTitre.textContent = product.name; //Ajout de texte étant l'élement "name" contenu dans chaque "product" de la boucle
            eltArticle.appendChild(eltTitre); //Association du parent(<article> = variable "eltArticle") avec l'enfant(<h3> = variable "eltTitre")

            let eltP = document.createElement("p"); //Création de la variable "eltP" qui crée une balise <p>
            eltP.classList.add("productDescription"); //Ajout d'une "class" ayant comme intitulé "productDescription"
            eltP.textContent = product.description; //Ajout de texte étant l'élement "name" contenu dans chaque "product" de la boucle
            eltArticle.appendChild(eltP); //Association du parent(<article> = variable "eltArticle") avec l'enfant(<p> = variable "eltP")
        };
    })
    .catch(function(err) {
        // Une erreur est survenue
    });
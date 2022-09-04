
let valeurTapéGlobal=null;
let valeurTapéIngredient="";
let tabIngredientTrié=[];
let tagIngredient=[];
let ingredientFilter;
let messageAucuneRecette = false;
let tableauRecette = recipes;

function search(){
    // let tableauRecette = recipes;
    let resultatRequette;
    if (valeurTapéGlobal != null)
    {
            resultatRequette = tableauRecette.filter((recette => (recette.name.indexOf(valeurTapéGlobal.toLocaleLowerCase()) != -1)
            || (recette.description.indexOf(valeurTapéGlobal.toLocaleLowerCase()) != -1)
            || isNaN( recette.ingredients.filter(recette => recette.ingredient.indexOf(valeurTapéGlobal.toLocaleLowerCase()) != -1))));
    }
    else{
        //Chargement au démarage du site web: de toutes les recettes
        resultatRequette = tableauRecette;
    }


            /*let triIngredient =  tableauRecette.filter(tab => isNaN( tab.ingredients.filter(tab => tab.ingredient.indexOf(valeurTapéGlobal) != -1)));
            let triIngredient =  tableauRecette.filter(tab => tab.ingredients.filter(tab => tab.ingredient.indexOf(valeurTapéGlobal) != -1));
            let triDescription = tableauRecette.filter((tab => (tab.description.indexOf(valeurTapéGlobal) != -1)));*/

            //Effacer les articles affichés, avant d'en afficher d'autres
            const removeArticle = document.querySelectorAll('.articleRecette');
            if (removeArticle != null){ 
                removeArticle.forEach((monArticle) =>{
                
                    monArticle.remove();
                    
                })
            }

            const removeIngredient = document.querySelectorAll('.option');
            if (removeIngredient != null){ 
                removeIngredient.forEach((monIngredient) =>{
                
                    monIngredient.remove();
                    
                })
            }


            const selector = document.getElementById('selector');
            const menu = document.getElementById('menuIngredients');
            const tagIngredient = document.querySelector('.tagIngredient');

            if(valeurTapéIngredient!=null)
            {

                const allTag = document.getElementsByClassName('pIngredient');
                if(allTag.length == 0){
                    ingredientFilter =  resultatRequette.filter(tab => isNaN( tab.ingredients.filter(tab => tab.ingredient.toLowerCase().indexOf(valeurTapéIngredient.toLocaleLowerCase()) != -1)));
                    resultatRequette = ingredientFilter;
                }else{
                    //Permet de filtrer les résultats du sous menu: en fonction des tag affiché
                        Array.from(allTag).forEach((allTag, index) => {
                            ingredientFilter =  resultatRequette.filter(tab => isNaN( tab.ingredients.filter(tab => tab.ingredient.toLowerCase().indexOf(allTag.innerText.toLowerCase()) != -1)));
                            resultatRequette = ingredientFilter;
                        });
                    }
            }
// console.log(resultatRequette);
    if(resultatRequette!="")
    {
        // messageAucuneRecette=false;
        document.getElementById("aucun-article").style.display = "none"; 
            //Affichage des recettes----------------------------------------
            resultatRequette.forEach((maRecette) =>{
                const recettes = document.getElementById('recettes');
                const article = document.createElement('article');
                article.setAttribute('class', 'articleRecette');
                recettes.appendChild(article);

                let { name, description, ingredients, time } = maRecette;

                //Card Recettes------------------------------------------
                const imgRecette = document.createElement('img');
                imgRecette.setAttribute('class', 'photoRecette');
                imgRecette.setAttribute('src', 'assets/recettes/imageRecette.jpg');
                article.appendChild(imgRecette);

                const divDetails = document.createElement('div');
                divDetails.setAttribute('class','details');
                article.appendChild(divDetails);

                const divTitre = document.createElement('div');
                divTitre.setAttribute('class','divTitre');
                divDetails.appendChild(divTitre);

                const divDescription = document.createElement('div');
                divDescription.setAttribute('class','divDescription');
                divDetails.appendChild(divDescription);

                const pTitre = document.createElement('p');
                pTitre.setAttribute('class','pTitre');
                pTitre.textContent = name;
                divTitre.appendChild(pTitre);

                const divTemps = document.createElement('div');
                divTemps.setAttribute('class','divTemps');
                divTitre.appendChild(divTemps);

                const iTemps = document.createElement('i');
                iTemps.setAttribute('class','fa-regular fa-clock');
                divTemps.appendChild(iTemps);

                const pTemps = document.createElement('p');
                pTemps.setAttribute('class','pTemps');
                pTemps.textContent = time+" min";
                divTemps.appendChild(pTemps);

                const divMesIngredients = document.createElement('div');
                divMesIngredients.setAttribute('class','mesIngredients');
                divDescription.appendChild(divMesIngredients);

                 //Affichage menu Ingrédients---------------------------------------
                ingredientExisteDeja=false;
                ingredients.forEach((ingredient) =>{
                //Recherche si l'on a tapé quelquche à prendre en compte dans le sous menu des ingredients
                affichageIngredient(ingredient,menu,tagIngredient,ingredientExisteDeja);

                /*if(ingredient.ingredient.toLowerCase() != valeurTapéIngredient.toLowerCase())
                // if(ingredient.ingredient.toLowerCase().indexOf(valeurTapéIngredient.toLowerCase()) != -1)
                {
                    const option = document.getElementsByClassName('option');
    
                    if(option.length != 0){
                        //Recherche de l'ingrédient dans le DOM
                        Array.from(option).forEach((element, index) => {
                            if(element.innerText.toLowerCase() == ingredient.ingredient.toLowerCase()){
                                ingredientExisteDeja = true;
                                // console.log("inner: "+element.innerText+" ingr: "+ingredient.ingredient);
                            }
                          });
                          //S'il n'existe pas dans le DOM: on le met dedans
                        if(ingredientExisteDeja==false){
                            ajoutIngredientMenu(ingredient,menu,tagIngredient);

                        }else{
                            ingredientExisteDeja = false;
                        }
    
                    }
                    else{
                        ajoutIngredientMenu(ingredient,menu,tagIngredient);
                    }
                }*/
                //Affichage menu Ingrédients---------------------------------------   

                
                //Afficharge des ingrédients: dans les recettes-----------------------------
                    const divIngredient = document.createElement('div');
                    divIngredient.setAttribute('class','divIngredient');
                    divMesIngredients.appendChild(divIngredient);

                    const pTitreIngredient = document.createElement('p');
                    pTitreIngredient.setAttribute("data-ingredient",ingredient.ingredient);
                    pTitreIngredient.setAttribute('class','pTitreIngredient');
                    if (ingredient.quantity != null){ 
                        pTitreIngredient.textContent = ingredient.ingredient+": \u00a0";
                    }
                    else{
                        pTitreIngredient.textContent = ingredient.ingredient
                    }
                    divIngredient.appendChild(pTitreIngredient);

                    const pQuantité = document.createElement('p');
                    pQuantité.setAttribute('class','pQuantité');
                    pQuantité.textContent = ingredient.quantity;
                    divIngredient.appendChild(pQuantité);

                    const pUnité = document.createElement('p');
                    pUnité.setAttribute('class','pUnité');
                    if (ingredient.unit != null){ 
                        pUnité.textContent = ingredient.unit;
                    }
                    divIngredient.appendChild(pUnité);
                //Afficharge des ingrédients: dans les recettes-----------------------------
                })

                //Description des card recettes
                const pDescription = document.createElement('p');
                pDescription.setAttribute('class','pDescription');
                pDescription.textContent = description;
                divDescription.appendChild(pDescription);

            })
    }else{
        // console.log("aucun article");
        // aucunArticle=true;
        document.getElementById("aucun-article").style.display = "block"; 

        /*if(messageAucuneRecette==false)
        {
            const article = document.createElement('p');
            // article.setAttribute('class', 'articleRecette');
            article.textContent = "aucun article";
            recettes.appendChild(article);
            messageAucuneRecette=true;
        }*/

    }
}

function ajoutIngredientMenu(ingredient,menu,tagIngredient){
    // console.log(menu);
     //Pour le premier affichage du "li" (car il n'existe pas en premier)
    const li = document.createElement('li');
                                li.setAttribute('class', 'option');
                                li.textContent = ingredient.ingredient;
                                menu.appendChild(li);

                                //Selection, affichage et suppression du TAG
                                li.addEventListener('click', () => {
                                    tagIngredient.style.display = 'flex';
                                    const pIngredient = document.createElement('p');
                                    pIngredient.setAttribute('class', 'pIngredient');
                                    pIngredient.textContent = ingredient.ingredient;
                                    tagIngredient.appendChild(pIngredient);

                                    const iTagIngredient = document.createElement('i');
                                    iTagIngredient.setAttribute('class', 'fa-regular fa-circle-xmark');
                                    pIngredient.appendChild(iTagIngredient);

                                    valeurTapéIngredient = ingredient.ingredient;

                                    search();

                                    pIngredient.addEventListener('click', () => { 

                                            /*valeurTapéIngredient = "";
                                            valeurTapéIngredient = ingredient.ingredient;*/
                                            pIngredient.remove();//Suppression du TAG du DOM
                                            // search();

                                        //Recherche des tag dans le dom, à garder après suppression d'un tag
                                        const allTag = document.getElementsByClassName('pIngredient');
                                        if(allTag.length != 0){
                                            Array.from(allTag).forEach((allTag, index) => {
                                                valeurTapéIngredient = allTag.innerText;
                                                search();
                                            });
                                        }
                                        else{
                                            valeurTapéIngredient = "";
                                            search();
                                        }
                                    });

                                  })
}

function affichageIngredient(ingredient,menu,tagIngredient,ingredientExisteDeja){
    // console.log(ingredient);
    //Recherche si l'on a tapé quelquche à prendre en compte dans le sous menu des ingredients
    if(ingredient.ingredient.toLowerCase() != valeurTapéIngredient.toLowerCase())
    // if(ingredient.ingredient.toLowerCase().indexOf(valeurTapéIngretagIngredientdient.toLowerCase()) != -1)
    {
        const option = document.getElementsByClassName('option');

        if(option.length != 0){
            //Recherche de l'ingrédient dans le DOM
            Array.from(option).forEach((element, index) => {
                if(element.innerText.toLowerCase() == ingredient.ingredient.toLowerCase()){
                    ingredientExisteDeja = true;
                    // console.log("inner: "+element.innerText+" ingr: "+ingredient.ingredient);
                }
              });
              //S'il n'existe pas dans le DOM: on le met dedans
            if(ingredientExisteDeja==false){
                ajoutIngredientMenu(ingredient,menu,tagIngredient);

            }else{
                ingredientExisteDeja = false;
            }

        }
        else{
            ajoutIngredientMenu(ingredient,menu,tagIngredient);
        }

    }
}


const formPrimaire = document.getElementById('formPrimaire');
const recherchePrimaire = document.querySelector('.recherche-primaire');
recherchePrimaire.addEventListener('keydown', () => { 
    if (formPrimaire.firstSearch.value.length >= 2){
        valeurTapéGlobal = formPrimaire.firstSearch.value;
        search();
    }
});

const formIngredient = document.getElementById('formIngredient');
const rechercheIngredient = document.querySelector('.recherche-ingredient');
rechercheIngredient.addEventListener('keydown', () => { 
        valeurTapéIngredient = formIngredient.IngredientSearch.value;

        const MesIngredients = document.querySelectorAll('.pTitreIngredient');
        let ingredients = [];

        MesIngredients.forEach((monIngredient) =>{
            ingredients[ingredients.length] = {"ingredient": monIngredient.getAttribute('data-ingredient')};
        });

        let ingredientFiltré = ingredients.filter((ingredient => (ingredient.ingredient.toLowerCase().indexOf(valeurTapéIngredient.toLowerCase()) != -1)));
        // console.log(ingredientFiltré);

        const removeIngredient = document.querySelectorAll('.option');
        if (removeIngredient != null){ 
            removeIngredient.forEach((monIngredient) =>{
            
                monIngredient.remove();
                
            })
        }

        const menu = document.getElementById('menuIngredients');
        const tagIngredient = document.querySelector('.tagIngredient');
       

        ingredientFiltré.forEach((monFiltre) =>{
            affichageIngredient(monFiltre,menu,tagIngredient,ingredientExisteDeja);
            
        
        // console.log(monFiltre);
        });

});

const menuIngredientFermer = document.querySelector('.fermer');
const menuIngredientOuvert = document.querySelector('.ouvert');
const menuIngredientSelector = document.querySelector('#selector');
menuIngredientFermer.addEventListener('click', () => { 
    menuIngredientFermer.style.display = 'none';
    menuIngredientOuvert.style.display = 'block';
    menuIngredientSelector.style.width = '54%';
});

menuIngredientOuvert.addEventListener('click', () => { 
    menuIngredientOuvert.style.display = 'none';
    menuIngredientFermer.style.display = 'flex';

    menuIngredientSelector.style.width = '13.7%';
});


window.addEventListener('keydown', function (event) { // Gestion des touches du clavier: pour la lightbox
   
    if (event.key === 'ArrowRight') {
        /*tabIngredientTrié.forEach((tri)=>{
            console.log(tri);
        })
        console.log(tabIngredientTrié);*/
    }
  
  })


//   affichageIngredient(ingredient,menu,tagIngredient,ingredientExisteDeja)
valeurTapéGlobal = null;
search();
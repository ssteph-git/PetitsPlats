
let httpRequest;
let valeurTapéGlobal;

function search(){
    let tableauRecette = recipes;

            let resultatRequette = tableauRecette.filter((tab => (tab.name.indexOf(valeurTapéGlobal) != -1)
            || (tab.description.indexOf(valeurTapéGlobal) != -1)
            || isNaN( tab.ingredients.filter(tab => tab.ingredient.indexOf(valeurTapéGlobal) != -1))));

            // console.log(resultatRequette);

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
            

            resultatRequette.forEach((maRecette) =>{
                const recettes = document.getElementById('recettes');
                const article = document.createElement('article');
                article.setAttribute('class', 'articleRecette');
                recettes.appendChild(article);

                const { name, description, ingredients, time } = maRecette;
                // console.log(ingredients);

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



                ingredients.forEach((ingredient) =>{
                    const divIngredient = document.createElement('div');
                    divIngredient.setAttribute('class','divIngredient');
                    divMesIngredients.appendChild(divIngredient);

                    const pTitreIngredient = document.createElement('p');
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
                })

                const pDescription = document.createElement('p');
                pDescription.setAttribute('class','pDescription');
                pDescription.textContent = description;
                divDescription.appendChild(pDescription);


            })

}

const form = document.getElementById('form');
const recherchePrimaire = document.querySelector('.recherche-primaire');
recherchePrimaire.addEventListener('keydown', () => { 
    if (form.firstSearch.value.length >= 2){
        valeurTapéGlobal = form.firstSearch.value;
        search();
    }

});


let valeurTapéGlobal = null;
let valeurTapéIngredient = "";
let valeurTapéAppareil = "";
let valeurTapéUstensile = "";
let tabIngredientTrié = [];
let tagIngredient = [];
let messageAucuneRecette = false;
let tableauRecette = recipes;
let resultatRequette;


function myLowerCase(maRecette){
    let totalUsensile = maRecette.ustensils.length;

    for(let i = 0; i < totalUsensile; i++){
            maRecette.ustensils[i] = maRecette.ustensils[i].toLocaleLowerCase();
        }
        return maRecette;
    }

function search() {

    if (valeurTapéGlobal != null) {

            let newTabRecette = [];
            for (let i = 0; i < tableauRecette.length; i++) {//Pour chaque recettes

                let déjaMis = false;
                //Vérification de ce que nous avons trouvé, par rapport au nom de la reccette
                if(tableauRecette[i].name.toLocaleLowerCase().indexOf(valeurTapéGlobal.toLocaleLowerCase()) != -1){
                    newTabRecette[newTabRecette.length] = tableauRecette[i];
                    déjaMis = true;
                }

                //Vérification de ce que nous avons trouvé, par rapport aux ingrédients de la reccette
                for (let j = 0; j < tableauRecette[i].ingredients.length; j++) {
                    if(tableauRecette[i].ingredients[j].ingredient.toLocaleLowerCase().indexOf(valeurTapéGlobal.toLocaleLowerCase()) != -1){
                        if(déjaMis == false){
                            newTabRecette[newTabRecette.length] = tableauRecette[i];
                            déjaMis = true;
                        }
                    }
                }

                //Vérification de ce que nous avons trouvé, par rapport à la description de la reccette
                if(tableauRecette[i].description.toLocaleLowerCase().indexOf(valeurTapéGlobal.toLocaleLowerCase()) != -1){
                    if(déjaMis == false){
                        newTabRecette[newTabRecette.length] = tableauRecette[i];
                        déjaMis = true;
                    }
                }

                }
                resultatRequette = newTabRecette;
    }
    else {
        //Chargement au démarage du site web: de toutes les recettes
        resultatRequette = tableauRecette;
    }

    const allTagIngredient = document.getElementsByClassName('pIngredient');
    const allTagAppareil = document.getElementsByClassName('pAppareil');
    const allTagUstensile = document.getElementsByClassName('pUstensile');

    //Gestion du bon affichage du site: avec ou sans les TAG
    if ((allTagIngredient.length == 0) & (allTagAppareil.length == 0) & (allTagUstensile.length == 0)) {
        const tag = document.querySelector('.tag');
        tag.style.display = 'none';
    } else {
        const tag = document.querySelector('.tag');
        tag.style.display = 'flex';
    }

    //Effacer les articles affichés, avant d'en afficher d'autres
    const removeArticle = document.querySelectorAll('.articleRecette');
    if (removeArticle != null) {
        for(const monArticle of removeArticle){
            monArticle.remove();
        }
        //)
    }

    //Permet d'effacer les items des sous menu, avant d'afficher ceux que nous voulons garder
    const removeItem = document.querySelectorAll('.option');
    if (removeItem != null) {
        for(const monItem of removeItem){
            monItem.remove();
        }
    }



    //Permet de filtrer les résultats du sous menu: en fonction des tag affiché--------------------------------------------------
    //Ingredient
    if(allTagIngredient.length>0)
    {
        for(let i = 0; i < allTagIngredient.length; i++)  {
            const ingredientFilter = [];
            for(const tab of resultatRequette) {
                for(const ingredient of tab.ingredients) {
                    if(ingredient.ingredient.toLocaleLowerCase().indexOf(allTagIngredient[i].innerText.toLocaleLowerCase()) != -1){
                        ingredientFilter.push(tab);
                        resultatRequette = ingredientFilter;
                    }
                }
            }     
        }
    }

    //Appareil
    if(allTagAppareil.length>0)
    {
        for(let i = 0; i < allTagAppareil.length; i++)  {
            const appareilFilter = [];
            for(const tab of resultatRequette) {
                if(tab.appliance.toLocaleLowerCase().indexOf(allTagAppareil[i].innerText.toLocaleLowerCase()) != -1){
                    appareilFilter.push(tab);
                    resultatRequette = appareilFilter;
                }
            }     
        }
    }

    //Ustensile
    if(allTagUstensile.length>0)
    {
        for(let i = 0; i < allTagUstensile.length; i++)  {
            const ustensileFilter = [];
            for(const tab of resultatRequette) {
                if(myLowerCase(tab).ustensils.indexOf(allTagUstensile[i].innerText.toLocaleLowerCase()) != -1){
                    ustensileFilter.push(tab);
                    resultatRequette = ustensileFilter;
                }
            }     
        }
    }
        
    //-------------------------------------------------------------------------------------------------------------------------------------------

    const menu = document.getElementById('menuIngredients');
    const tagIngredient = document.querySelector('.tagIngredient');

    const menuAppareil = document.getElementById('menuAppareils');
    const tagAppareil = document.querySelector('.tagAppareil');

    const menuUstensile = document.getElementById('menuUstensiles');
    const tagUstensile = document.querySelector('.tagUstensile');

    if (resultatRequette != "") {
        document.getElementById("aucun-article").style.display = "none";

        //Affichage des recettes----------------------------------------
        for(const maRecette of resultatRequette) {    
            const recettes = document.getElementById('recettes');
            const article = document.createElement('article');
            article.setAttribute('class', 'articleRecette');
            recettes.appendChild(article);

            let { name, description, ingredients, time, appliance, ustensils } = maRecette;

            //Card Recettes------------------------------------------
            const imgRecette = document.createElement('img');
            imgRecette.setAttribute('class', 'photoRecette');
            imgRecette.setAttribute('alt', 'Photo de la recette');
            imgRecette.setAttribute('src', 'assets/recettes/imageRecette.jpg');
            article.appendChild(imgRecette);

            const divDetails = document.createElement('div');
            divDetails.setAttribute('class', 'details');
            article.appendChild(divDetails);

            const divTitre = document.createElement('div');
            divTitre.setAttribute('class', 'divTitre');
            divDetails.appendChild(divTitre);

            const divDescription = document.createElement('div');
            divDescription.setAttribute('class', 'divDescription');
            divDetails.appendChild(divDescription);

            const pTitre = document.createElement('h2');
            pTitre.setAttribute('class', 'hTitre');
            pTitre.textContent = name;
            divTitre.appendChild(pTitre);

            const divTemps = document.createElement('div');
            divTemps.setAttribute('class', 'divTemps');
            divTitre.appendChild(divTemps);

            const iTemps = document.createElement('i');
            iTemps.setAttribute('class', 'fa-regular fa-clock');
            divTemps.appendChild(iTemps);

            const pTemps = document.createElement('p');
            pTemps.setAttribute('class', 'pTemps');
            pTemps.textContent = time + " min";
            divTemps.appendChild(pTemps);

            const divMesIngredients = document.createElement('div');
            divMesIngredients.setAttribute('class', 'mesIngredients');
            divDescription.appendChild(divMesIngredients);

            affichageDuSousMenu(appliance, menuAppareil, tagAppareil, false, 'Appareil');

            for(const ustensile of ustensils) {        
                affichageDuSousMenu(ustensile, menuUstensile, tagUstensile, false, 'Ustensile');
            }

           
            for(const ingredient of ingredients) {     
                //Affichage menu Ingrédients---------------------------------------
                affichageDuSousMenu(ingredient, menu, tagIngredient, false, 'Ingredient');

                //Afficharge des ingrédients: dans les recettes-----------------------------
                const divIngredient = document.createElement('div');
                divIngredient.setAttribute('class', 'divIngredient');
                divMesIngredients.appendChild(divIngredient);

                const pTitreIngredient = document.createElement('p');
                pTitreIngredient.setAttribute("data-ingredient", ingredient.ingredient);
                pTitreIngredient.setAttribute('class', 'pTitreIngredient');
                if (ingredient.quantity != null) {
                    pTitreIngredient.textContent = ingredient.ingredient + ": \u00a0";
                }
                else {
                    pTitreIngredient.textContent = ingredient.ingredient
                }
                divIngredient.appendChild(pTitreIngredient);

                const pQuantité = document.createElement('p');
                pQuantité.setAttribute('class', 'pQuantité');
                pQuantité.textContent = ingredient.quantity;
                divIngredient.appendChild(pQuantité);

                const pUnité = document.createElement('p');
                pUnité.setAttribute('class', 'pUnité');
                if (ingredient.unit != null) {
                    pUnité.textContent = ingredient.unit;
                }
                divIngredient.appendChild(pUnité);
                //Afficharge des ingrédients: dans les recettes-----------------------------
            }

            //Description des card recettes
            const pDescription = document.createElement('p');
            pDescription.setAttribute('class', 'pDescription');
            pDescription.textContent = description;
            divDescription.appendChild(pDescription);

        }
    } else {
        //affichage du message: s'il n'y a aucune recette de trouvé
        document.getElementById("aucun-article").style.display = "block";
    }
}


function ajoutItemMenu(valeurItem, menuItem, tagItem, typeMenu) {
    //Pour le premier affichage du "li" (car il n'existe pas en premier)
    let classPItem;
    let formItem;

    switch (typeMenu) {
        case 'Ingredient':
            valeurItem = valeurItem.ingredient;
            valeurTapé = valeurTapéIngredient;
            classPItem = 'pIngredient';
            formItem = document.getElementById('formIngredient');
            formItem = formItem.IngredientSearch;
            break

        case 'Appareil':
            valeurTapé = valeurTapéAppareil;
            classPItem = 'pAppareil';
            formItem = document.getElementById('formAppareil');
            formItem = formItem.AppareilSearch;
            break

        case 'Ustensile':
            valeurTapé = valeurTapéUstensile;
            classPItem = 'pUstensile';
            formItem = document.getElementById('formUstensile');
            formItem = formItem.UstensileSearch;
            break
    }

    const li = document.createElement('li');
    li.setAttribute('class', 'option');
    li.textContent = valeurItem;
    menuItem.appendChild(li);

    //Selection, affichage et suppression du TAG
    li.addEventListener('click', () => {
        tagItem.style.display = 'flex';
        const pItem = document.createElement('p');
        pItem.setAttribute('class', classPItem);
        pItem.textContent = valeurItem;
        tagItem.appendChild(pItem);

        const iTagItem = document.createElement('i');
        iTagItem.setAttribute('class', 'fa-regular fa-circle-xmark');
        pItem.appendChild(iTagItem);


        search();
        
        //efface la valeur tapé dans le sous menu: une fois un tag choisis
        formItem.value = "";

        pItem.addEventListener('click', () => {

            pItem.remove();//Suppression du TAG du DOM

            //Recherche des tag dans le dom, à garder après suppression d'un tag
            const allTags = document.getElementsByClassName(classPItem);
            if (allTags.length != 0) {
                for(const allTag of allTags) {     
                    //Va permettre de recharger les résultats de la page: avec le choix des tag en moins (Lorsqu'il y a plusieurs tags que l'on supprime)
                    search();
                }
            }
            else {
                //Va permettre de recharger les résultats de la page: avec le choix des tag en moins (lorsqu'il y a qu'un seul TAG que l'on supprime)
                search();
            }
        });

    })
}

function affichageDuSousMenu(valeurStockéDéfaut, menu, tagIngredient, valeurExisteDeja, typeMenu) {

    let valeurTapé;
    let optionValeur;
    let valeurStockéModifié;

    switch (typeMenu) {
        case 'Ingredient':
            valeurStockéModifié = valeurStockéDéfaut.ingredient.toLocaleLowerCase();
            valeurTapé = valeurTapéIngredient.toLowerCase();
            pValeur = 'pIngredient';
            optionValeur = '#menuIngredients>.option';
            break

        case 'Appareil':
            valeurStockéModifié = valeurStockéDéfaut.toLocaleLowerCase();
            valeurTapé = valeurTapéAppareil.toLowerCase();
            pValeur = 'pAppareil';
            optionValeur = '#menuAppareils>.option';
            break

        case 'Ustensile':
            valeurStockéModifié = valeurStockéDéfaut.toLocaleLowerCase();
            valeurTapé = valeurTapéUstensile.toLowerCase();
            pValeur = 'pUstensile';
            optionValeur = '#menuUstensiles>.option';
            break
    }

    if (valeurStockéModifié != valeurTapé) {
        const option = document.getElementsByClassName('option');

        if (option.length != 0) {
            //Recherche de l'ingrédient dans le DOM
            for(const element of option) {    
                if (element.innerText.toLowerCase() == valeurStockéModifié) {
                    valeurExisteDeja = true;
                }
            }
            //S'il n'existe pas dans le DOM: on le met dedans
            if (valeurExisteDeja == false) {
                const allTags = document.getElementsByClassName(pValeur);
                let optionPasAfficher = false;
                //Verification des tag affiché dans le dom, et ne pas les afficher dans le sous menu
                if (allTags.length != 0) {
                    for(const allTag of allTags) {     
                        if (valeurStockéModifié == allTag.innerText.toLocaleLowerCase()) {
                            optionPasAfficher = true;
                        }
                    }
                }
                if (optionPasAfficher == false) {
                    ajoutItemMenu(valeurStockéDéfaut, menu, tagIngredient, typeMenu);
                }

            } else {
                valeurExisteDeja = false;
            }

        }
        else {

            const allTags = document.getElementsByClassName(pValeur);
            let optionPasAfficher = false;
            //Verification des tag affiché dans le dom, et ne pas les afficher dans le sous menu
            if (allTags.length != 0) {
                for(const allTag of allTags) {   
                    if (valeurStockéModifié == allTag.innerText.toLocaleLowerCase()) {
                        optionPasAfficher = true;
                    }
                }
            }

            if (optionPasAfficher == false) {
                ajoutItemMenu(valeurStockéDéfaut, menu, tagIngredient, typeMenu);
            }
        }

    }
    else {
        const option = document.querySelectorAll(optionValeur);
        let valeurExisteDeja = false;
        //Recherche de l'ingrédient dans le DOM
        for(const element of option) {    
            if (element.innerText.toLowerCase() == valeurStockéModifié) {
                valeurExisteDeja = true;
            }
        }

        if (valeurExisteDeja == false) {
            const allTags = document.getElementsByClassName(pValeur);
            let optionPasAfficher = false;
            //Verification des tag affiché dans le dom, et ne pas les afficher dans le sous menu
            if (allTags.length != 0) {
                for(const allTag of allTags) {       
                    if (valeurStockéModifié == allTag.innerText.toLocaleLowerCase()) {
                        optionPasAfficher = true;
                    }
                }
            }

            if (optionPasAfficher == false) {
                ajoutItemMenu(valeurStockéDéfaut, menu, tagIngredient, typeMenu);
            }
        }
    }
}


const formPrimaire = document.getElementById('formPrimaire');
const recherchePrimaire = document.querySelector('.recherche-primaire');
recherchePrimaire.addEventListener('keyup', () => {
    if (formPrimaire.firstSearch.value.length > 2) {
        valeurTapéGlobal = formPrimaire.firstSearch.value.trim();
        search();
    }
});

const formIngredient = document.getElementById('formIngredient');
const rechercheIngredient = document.querySelector('.recherche-ingredient');
rechercheIngredient.addEventListener('keyup', () => {
    valeurTapéIngredient = formIngredient.IngredientSearch.value.trim();

    const MesIngredients = document.querySelectorAll('.pTitreIngredient');

    let ingredients = [];

    for(const monIngredient of MesIngredients) {       
        ingredients[ingredients.length] = { "ingredient": monIngredient.getAttribute('data-ingredient') };
    }


    let ingredientFiltré=[];
        for(const ingredient of ingredients) {
            if(ingredient.ingredient.toLowerCase().indexOf(valeurTapéIngredient.toLowerCase()) != -1){
                ingredientFiltré.push(ingredient);
            }
        } 

    const removeIngredient = document.querySelectorAll('#menuIngredients>.option');
    if (removeIngredient != null) {
        for(const monIngredient of removeIngredient) {       
            monIngredient.remove();
        }
    }

    const menu = document.getElementById('menuIngredients');
    const tagIngredient = document.querySelector('.tagIngredient');

    for(const monFiltre of ingredientFiltré) {       
        affichageDuSousMenu(monFiltre, menu, tagIngredient, false, 'Ingredient');
    }
}
);

const formAppareil = document.getElementById('formAppareil');
const rechercheAppareil = document.querySelector('.recherche-appareil');
rechercheAppareil.addEventListener('keyup', () => {

    valeurTapéAppareil = formAppareil.AppareilSearch.value.trim();

    let appareils = [];

    for(const monAppareil of resultatRequette) {       

        let { appliance } = monAppareil;
        appareils[appareils.length] = appliance;
    }

    let appareilFiltré=[];
        for(const appareil of appareils) {
            if(appareil.toLowerCase().indexOf(valeurTapéAppareil.toLowerCase()) != -1){
                appareilFiltré.push(appareil);
            }
        } 

    const removeAppareil = document.querySelectorAll('#menuAppareils>.option');
    if (removeAppareil != null) {
        for(const monAppareil of removeAppareil) {
            monAppareil.remove();
        }
    }

    const menu = document.getElementById('menuAppareils');
    const tagAppareil = document.querySelector('.tagAppareil');

    for(const monFiltre of appareilFiltré) {
        affichageDuSousMenu(monFiltre, menu, tagAppareil, false, 'Appareil');

    }
});


const formUstensile = document.getElementById('formUstensile');
const rechercheUstensile = document.querySelector('.recherche-ustensile');
rechercheUstensile.addEventListener('keyup', () => {

    valeurTapéUstensile = formUstensile.UstensileSearch.value.trim();

    let ustensiles = [];

    for(const maRecette of resultatRequette) {

        let { ustensils } = maRecette;
        for(const mesUstensiles of ustensils) {
            ustensiles[ustensiles.length] = mesUstensiles;
        }
    }

    let ustensileFiltré=[];
    for(const ustensile of ustensiles) {
        if(ustensile.toLowerCase().indexOf(valeurTapéUstensile.toLowerCase()) != -1){
            ustensileFiltré.push(ustensile);
        }
    } 

    const removeUstensile = document.querySelectorAll('#menuUstensiles>.option');
    if (removeUstensile != null) {
        for(const monUstensile of removeUstensile) {
            monUstensile.remove();
        }
    }

    const menu = document.getElementById('menuUstensiles');
    const tagUstensile = document.querySelector('.tagUstensile');

    for(const monFiltre of ustensileFiltré) {
        affichageDuSousMenu(monFiltre,menu,tagUstensile,false,'Ustensile');
    }
});


const menuIngredientCocheFermer = document.querySelector('#selector>.fermer>.fa-solid');
const menuIngredientOuvert = document.querySelector('.ouvert');
const menuIngredientFermer = document.querySelector('.fermer');
menuIngredientCocheFermer.addEventListener('click', () => {
    menuIngredientFermer.style.display = 'none';
    menuIngredientOuvert.style.display = 'block';
});

const menuIngredientCocheOuverte = document.querySelector('.sous-recherche>.fa-solid');
menuIngredientCocheOuverte.addEventListener('click', () => {
    menuIngredientOuvert.style.display = 'none';
    menuIngredientFermer.style.display = 'flex';
});

const menuAppareilCocheFermer = document.querySelector('#selectorAppareil>.fermerAppareil>.fa-solid');
const menuAppareilFermer = document.querySelector('.fermerAppareil');
const menuAppareilOuvert = document.querySelector('.ouvertAppareil');
menuAppareilCocheFermer.addEventListener('click', () => {
    menuAppareilFermer.style.display = 'none';
    menuAppareilOuvert.style.display = 'block';
});

const menuAppareilCocheOuverte = document.querySelector('#formAppareil>.sous-recherche>.fa-solid');
menuAppareilCocheOuverte.addEventListener('click', () => {
    menuAppareilOuvert.style.display = 'none';
    menuAppareilFermer.style.display = 'flex';
});

const menuUstensilesCocheFermer = document.querySelector('#selectorUstensiles>.fermerUstensile>.fa-solid');
const menuUstensileFermer = document.querySelector('.fermerUstensile');
const menuUstensileOuvert = document.querySelector('.ouvertUstensile');
menuUstensilesCocheFermer.addEventListener('click', () => {
    menuUstensileFermer.style.display = 'none';
    menuUstensileOuvert.style.display = 'block';
});

const menuUstensilesCocheOuverte = document.querySelector('#formUstensile>.sous-recherche>.fa-solid');
menuUstensilesCocheOuverte.addEventListener('click', () => {
    menuUstensileOuvert.style.display = 'none';
    menuUstensileFermer.style.display = 'flex';
});


search();
let valeurTapéGlobal = null;
let valeurTapéIngredient = "";
let valeurTapéAppareil = "";
let valeurTapéUstensile = "";
let tabIngredientTrié = [];
let tagIngredient = [];
let ingredientFilter;
let appareilFilter;
let ustensileFilter;
let messageAucuneRecette = false;
let tableauRecette = recipes;
let resultatRequette;


function search() {

    if (valeurTapéGlobal != null) {
        resultatRequette = tableauRecette.filter((recette => (recette.name.toLowerCase().indexOf(valeurTapéGlobal.toLowerCase()) != -1)
            || (recette.description.toLowerCase().indexOf(valeurTapéGlobal.toLowerCase()) != -1)
            || isNaN(recette.ingredients.filter(recette => recette.ingredient.toLowerCase().indexOf(valeurTapéGlobal.toLowerCase()) != -1))));
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
        removeArticle.forEach((monArticle) => {

            monArticle.remove();

        })
    }

    //Permet d'effacer les items des sous menu, avant d'afficher ceux que nous voulons garder
    const removeItem = document.querySelectorAll('.option');
    if (removeItem != null) {
        removeItem.forEach((monItem) => {

            monItem.remove();

        })
    }



    //Permet de filtrer les résultats du sous menu: en fonction des tag affiché--------------------------------------------------
    //Ingredient
    Array.from(allTagIngredient).forEach((allTagIngredient, index) => {
        ingredientFilter = resultatRequette.filter(tab => isNaN(tab.ingredients.filter(tab => tab.ingredient.toLowerCase().indexOf(allTagIngredient.innerText.toLowerCase()) != -1)));
        resultatRequette = ingredientFilter;
    });
    //Appareil
    Array.from(allTagAppareil).forEach((allTagAppareil, index) => {
        appareilFilter = resultatRequette.filter(tab => tab.appliance.indexOf(allTagAppareil.innerText) != -1);
        resultatRequette = appareilFilter;
    });
    //Ustensile
    Array.from(allTagUstensile).forEach((allTagUstensile, index) => {
        
        ustensileFilter = resultatRequette.filter(tab => {
            return tab.ustensils.map(tab=>tab.toLowerCase()).indexOf(allTagUstensile.innerText.toLowerCase()) != -1
        }); 
        
        resultatRequette = ustensileFilter;
    });
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
        resultatRequette.forEach((maRecette) => {
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

            ustensils.forEach((ustensile) => {
                affichageDuSousMenu(ustensile, menuUstensile, tagUstensile, false, 'Ustensile');
            })

           
            ingredients.forEach((ingredient) => {
                 //Affichage menu Ingrédients
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
            })

            //Description des card recettes
            const pDescription = document.createElement('p');
            pDescription.setAttribute('class', 'pDescription');
            pDescription.textContent = description;
            divDescription.appendChild(pDescription);

        })
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
            const allTag = document.getElementsByClassName(classPItem);
            if (allTag.length != 0) {
                Array.from(allTag).forEach((allTag, index) => {
                    //Va permettre de recharger les résultats de la page: avec le choix des tag en moins (Lorsqu'il y a plusieurs tags que l'on supprime)
                    search();
                });
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
            valeurStockéModifié = valeurStockéDéfaut.ingredient.toLowerCase();
            valeurTapé = valeurTapéIngredient.toLowerCase();
            pValeur = 'pIngredient';
            optionValeur = '#menuIngredients>.option';
            break

        case 'Appareil':
            valeurStockéModifié = valeurStockéDéfaut.toLowerCase();
            valeurTapé = valeurTapéAppareil.toLowerCase();
            pValeur = 'pAppareil';
            optionValeur = '#menuAppareils>.option';
            break

        case 'Ustensile':
            valeurStockéModifié = valeurStockéDéfaut.toLowerCase();
            valeurTapé = valeurTapéUstensile.toLowerCase();
            pValeur = 'pUstensile';
            optionValeur = '#menuUstensiles>.option';
            break
    }

    if (valeurStockéModifié != valeurTapé) {
        const option = document.getElementsByClassName('option');

        if (option.length != 0) {
            //Recherche de l'item dans le DOM
            Array.from(option).forEach((element, index) => {
                if (element.innerText.toLowerCase() == valeurStockéModifié) {
                    valeurExisteDeja = true;
                }
            });
            //S'il n'existe pas dans le DOM: on le met dedans
            if (valeurExisteDeja == false) {
                const allTag = document.getElementsByClassName(pValeur);
                let optionPasAfficher = false;
                //Verification des tag affiché dans le dom, et ne pas les afficher dans le sous menu
                if (allTag.length != 0) {
                    Array.from(allTag).forEach((allTag, index) => {
                        if (valeurStockéModifié == allTag.innerText.toLowerCase()) {
                            optionPasAfficher = true;
                        }
                    });
                }
                if (optionPasAfficher == false) {
                    ajoutItemMenu(valeurStockéDéfaut, menu, tagIngredient, typeMenu);
                }

            } else {
                valeurExisteDeja = false;
            }

        }
        else {

            const allTag = document.getElementsByClassName(pValeur);
            let optionPasAfficher = false;
            //Verification des tag affiché dans le dom, et ne pas les afficher dans le sous menu
            if (allTag.length != 0) {
                Array.from(allTag).forEach((allTag, index) => {
                    if (valeurStockéModifié == allTag.innerText.toLowerCase()) {
                        optionPasAfficher = true;
                    }
                });
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
        Array.from(option).forEach((element, index) => {
            if (element.innerText.toLowerCase() == valeurStockéModifié) {
                valeurExisteDeja = true;
            }
        });

        if (valeurExisteDeja == false) {
            const allTag = document.getElementsByClassName(pValeur);
            let optionPasAfficher = false;
            //Verification des tag affiché dans le dom, et ne pas les afficher dans le sous menu
            if (allTag.length != 0) {
                Array.from(allTag).forEach((allTag, index) => {
                    if (valeurStockéModifié == allTag.innerText.toLowerCase()) {
                        optionPasAfficher = true;
                    }
                });
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
    if (formPrimaire.firstSearch.value.length >= 2) {
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

    MesIngredients.forEach((monIngredient) => {
        ingredients[ingredients.length] = { "ingredient": monIngredient.getAttribute('data-ingredient') };
    });


    let ingredientFiltré = ingredients.filter((ingredient => (ingredient.ingredient.toLowerCase().indexOf(valeurTapéIngredient.toLowerCase()) != -1)));


    const removeIngredient = document.querySelectorAll('#menuIngredients>.option');
    if (removeIngredient != null) {
        removeIngredient.forEach((monIngredient) => {

            monIngredient.remove();

        })
    }

    const menu = document.getElementById('menuIngredients');
    const tagIngredient = document.querySelector('.tagIngredient');


    ingredientFiltré.forEach((monFiltre) => {
        affichageDuSousMenu(monFiltre, menu, tagIngredient, false, 'Ingredient');
    });

});

const formAppareil = document.getElementById('formAppareil');
const rechercheAppareil = document.querySelector('.recherche-appareil');
rechercheAppareil.addEventListener('keyup', () => {

    valeurTapéAppareil = formAppareil.AppareilSearch.value.trim();

    let appareils = [];

    resultatRequette.forEach((monAppareil) => {

        let { appliance } = monAppareil;
        appareils[appareils.length] = appliance;
    });

    let appareilFiltré = appareils.filter((appareil => (appareil.toLowerCase().indexOf(valeurTapéAppareil.toLowerCase()) != -1)));

    const removeAppareil = document.querySelectorAll('#menuAppareils>.option');
    if (removeAppareil != null) {
        removeAppareil.forEach((monAppareil) => {

            monAppareil.remove();

        })
    }

    const menu = document.getElementById('menuAppareils');
    const tagAppareil = document.querySelector('.tagAppareil');

    appareilFiltré.forEach((monFiltre) => {
        affichageDuSousMenu(monFiltre, menu, tagAppareil, false, 'Appareil');

    });

});


const formUstensile = document.getElementById('formUstensile');
const rechercheUstensile = document.querySelector('.recherche-ustensile');
rechercheUstensile.addEventListener('keyup', () => {

    valeurTapéUstensile = formUstensile.UstensileSearch.value.trim();

    let ustensiles = [];

    resultatRequette.forEach((maRecette) => {

        let { ustensils } = maRecette;
        ustensils.forEach((mesUstensiles) => {
            ustensiles[ustensiles.length] = mesUstensiles;
        })

    });

    let ustensileFiltré = ustensiles.filter((ustensile => (ustensile.toLowerCase().indexOf(valeurTapéUstensile.toLowerCase()) != -1)));

    const removeUstensile = document.querySelectorAll('#menuUstensiles>.option');
    if (removeUstensile != null) {
        removeUstensile.forEach((monUstensile) => {

            monUstensile.remove();

        })
    }

    const menu = document.getElementById('menuUstensiles');
    const tagUstensile = document.querySelector('.tagUstensile');


    ustensileFiltré.forEach((monFiltre) => {
        affichageDuSousMenu(monFiltre,menu,tagUstensile,false,'Ustensile');

    });

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
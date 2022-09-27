
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
        resultatRequette = tableauRecette.filter((recette => (recette.name.indexOf(valeurTapéGlobal.toLocaleLowerCase()) != -1)
            || (recette.description.indexOf(valeurTapéGlobal.toLocaleLowerCase()) != -1)
            || isNaN(recette.ingredients.filter(recette => recette.ingredient.indexOf(valeurTapéGlobal.toLocaleLowerCase()) != -1))));
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

    // console.log(resultatRequette);
    /*let triIngredient =  tableauRecette.filter(tab => isNaN( tab.ingredients.filter(tab => tab.ingredient.indexOf(valeurTapéGlobal) != -1)));
    let triIngredient =  tableauRecette.filter(tab => tab.ingredients.filter(tab => tab.ingredient.indexOf(valeurTapéGlobal) != -1));
    let triDescription = tableauRecette.filter((tab => (tab.description.indexOf(valeurTapéGlobal) != -1)));*/

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
    Array.from(allTagIngredient).forEach((allTagIngredient, index) => {
        ingredientFilter = resultatRequette.filter(tab => isNaN(tab.ingredients.filter(tab => tab.ingredient.toLowerCase().indexOf(allTagIngredient.innerText.toLowerCase()) != -1)));
        resultatRequette = ingredientFilter;
        console.log(resultatRequette);
    });

    Array.from(allTagAppareil).forEach((allTagAppareil, index) => {
        appareilFilter = resultatRequette.filter(tab => tab.appliance.indexOf(allTagAppareil.innerText) != -1);
        resultatRequette = appareilFilter;
    });

    Array.from(allTagUstensile).forEach((allTagUstensile, index) => {
        ustensileFilter = resultatRequette.filter(tab => tab.ustensils.indexOf(allTagUstensile.innerText) != -1);
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

            const pTitre = document.createElement('p');
            pTitre.setAttribute('class', 'pTitre');
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

            let appareilExisteDeja = false;
            // affichageAppareils(appliance,menuAppareil,tagAppareil,appareilExisteDeja);
            affichageDuSousMenu(appliance, menuAppareil, tagAppareil, appareilExisteDeja, 'Appareil');

            let ustensileExisteDeja = false;
            ustensils.forEach((ustensile) => {
                // affichageUstensiles(ustensile,menuUstensile,tagUstensile,ustensileExisteDeja);
                affichageDuSousMenu(ustensile, menuUstensile, tagUstensile, ustensileExisteDeja, 'Ustensile');
            })

            //Affichage menu Ingrédients---------------------------------------
            ingredientExisteDeja = false;
            ingredients.forEach((ingredient) => {
                //Recherche si l'on a tapé quelquche à prendre en compte dans le sous menu des ingredients
                // affichageIngredient(ingredient,menu,tagIngredient,ingredientExisteDeja);
                affichageDuSousMenu(ingredient, menu, tagIngredient, ingredientExisteDeja, 'Ingredient');
                //Affichage menu Ingrédients---------------------------------------   


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

function ajoutIngredientMenu(ingredient, menu, tagIngredient) {
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
        let formIngredient = document.getElementById('formIngredient');
        formIngredient.IngredientSearch.value = "";

        pIngredient.addEventListener('click', () => {

            pIngredient.remove();//Suppression du TAG du DOM

            //Recherche des tag dans le dom, à garder après suppression d'un tag
            const allTag = document.getElementsByClassName('pIngredient');
            if (allTag.length != 0) {
                Array.from(allTag).forEach((allTag, index) => {
                    valeurTapéIngredient = allTag.innerText;
                    search();
                });
            }
            else {
                valeurTapéIngredient = "";
                search();
            }
        });

    })
}

function ajoutAppareilMenu(appareil, menuAppareil, tagAppareil) {
    //Pour le premier affichage du "li" (car il n'existe pas en premier)
    const li = document.createElement('li');
    li.setAttribute('class', 'option');
    li.textContent = appareil;
    menuAppareil.appendChild(li);

    //Selection, affichage et suppression du TAG
    li.addEventListener('click', () => {
        tagAppareil.style.display = 'flex';
        const pAppareil = document.createElement('p');
        pAppareil.setAttribute('class', 'pAppareil');
        pAppareil.textContent = appareil;
        tagAppareil.appendChild(pAppareil);

        const iTagAppareil = document.createElement('i');
        iTagAppareil.setAttribute('class', 'fa-regular fa-circle-xmark');
        pAppareil.appendChild(iTagAppareil);

        valeurTapéAppareil = appareil;

        search();
        let formAppareil = document.getElementById('formAppareil');
        formAppareil.AppareilSearch.value = "";


        pAppareil.addEventListener('click', () => {

            pAppareil.remove();//Suppression du TAG du DOM

            //Recherche des tag dans le dom, à garder après suppression d'un tag
            const allTag = document.getElementsByClassName('pAppareil');
            if (allTag.length != 0) {
                Array.from(allTag).forEach((allTag, index) => {
                    valeurTapéAppareil = allTag.innerText;
                    search();
                });
            }
            else {
                valeurTapéAppareil = "";
                search();
            }
        });

    })
}

function ajoutUstensileMenu(ustensile, menuUstensile, tagUstensile) {
    //Pour le premier affichage du "li" (car il n'existe pas en premier)
    const li = document.createElement('li');
    li.setAttribute('class', 'option');
    li.textContent = ustensile;
    menuUstensile.appendChild(li);

    //Selection, affichage et suppression du TAG
    li.addEventListener('click', () => {
        tagUstensile.style.display = 'flex';
        const pUstensile = document.createElement('p');
        pUstensile.setAttribute('class', 'pUstensile');
        pUstensile.textContent = ustensile;
        tagUstensile.appendChild(pUstensile);

        const iTagUstensile = document.createElement('i');
        iTagUstensile.setAttribute('class', 'fa-regular fa-circle-xmark');
        pUstensile.appendChild(iTagUstensile);

        valeurTapéUstensile = ustensile;

        search();
        //supprime la valeur tapé dans le champ du sous menu de recherche: après avoir choisis un tag
        let formUstensile = document.getElementById('formUstensile');
        formUstensile.UstensileSearch.value = "";

        pUstensile.addEventListener('click', () => {

            pUstensile.remove();//Suppression du TAG du DOM

            //Recherche des tag dans le dom, à garder après suppression d'un tag
            const allTag = document.getElementsByClassName('pUstensile');
            if (allTag.length != 0) {
                Array.from(allTag).forEach((allTag, index) => {
                    valeurTapéUstensile = allTag.innerText;
                    search();
                });
            }
            else {
                valeurTapéUstensile = "";
                search();
            }
        });

    })
}


function ajoutItemMenu(valeurItem, menuItem, tagItem, typeMenu) {
    //Pour le premier affichage du "li" (car il n'existe pas en premier)
    let classPItem, ItemSearch, valeurTapé;
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
                        if (valeurStockéModifié == allTag.innerText.toLocaleLowerCase()) {
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
                    if (valeurStockéModifié == allTag.innerText.toLocaleLowerCase()) {
                        optionPasAfficher = true;
                    }
                });
            }

            if (optionPasAfficher == false) {
                ajoutItemMenu(valeurStockéDéfaut, menu, tagIngredient, typeMenu);
                // ajoutIngredientMenu(valeurStockéDéfaut,menu,tagIngredient);
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
                    if (valeurStockéModifié == allTag.innerText.toLocaleLowerCase()) {
                        optionPasAfficher = true;
                    }
                });
            }

            if (optionPasAfficher == false) {
                // ajoutIngredientMenu(valeurStockéDéfaut,menu,tagIngredient);
                ajoutItemMenu(valeurStockéDéfaut, menu, tagIngredient, typeMenu);

            }
        }
    }
}

function affichageIngredient(ingredient, menu, tagIngredient, ingredientExisteDeja) {
    //Recherche si l'on a tapé quelquche à prendre en compte dans le sous menu des ingredients
    if (ingredient.ingredient.toLowerCase() != valeurTapéIngredient.toLowerCase())
    {
        const option = document.getElementsByClassName('option');

        if (option.length != 0) {
            //Recherche de l'ingrédient dans le DOM
            Array.from(option).forEach((element, index) => {
                if (element.innerText.toLowerCase() == ingredient.ingredient.toLowerCase()) {
                    ingredientExisteDeja = true;
                }
            });
            //S'il n'existe pas dans le DOM: on le met dedans
            if (ingredientExisteDeja == false) {
                const allTag = document.getElementsByClassName('pIngredient');
                let optionPasAfficher = false;
                //Verification des tag affiché dans le dom, et ne pas les afficher dans le sous menu
                if (allTag.length != 0) {
                    Array.from(allTag).forEach((allTag, index) => {
                        if (ingredient.ingredient.toLocaleLowerCase() == allTag.innerText.toLocaleLowerCase()) {
                            optionPasAfficher = true;
                        }
                    });
                }
                if (optionPasAfficher == false) {
                    ajoutIngredientMenu(ingredient, menu, tagIngredient);
                }

            } else {
                ingredientExisteDeja = false;
            }

        }
        else {

            const allTag = document.getElementsByClassName('pIngredient');
            let optionPasAfficher = false;
            //Verification des tag affiché dans le dom, et ne pas les afficher dans le sous menu
            if (allTag.length != 0) {
                Array.from(allTag).forEach((allTag, index) => {
                    if (ingredient.ingredient == allTag.innerText) {
                        optionPasAfficher = true;
                    }
                });
            }

            if (optionPasAfficher == false) {
                ajoutIngredientMenu(ingredient, menu, tagIngredient);

            }
        }

    }
    else {
        const option = document.querySelectorAll('#menuIngredients>.option');
        let ingredientExisteDeja = false;

        //Recherche de l'ingrédient dans le DOM
        Array.from(option).forEach((element, index) => {
            if (element.innerText.toLowerCase() == ingredient.ingredient.toLowerCase()) {
                ingredientExisteDeja = true;
            }
        });

        if (ingredientExisteDeja == false) {

            const allTag = document.getElementsByClassName('pIngredient');
            let optionPasAfficher = false;
            //Verification des tag affiché dans le dom, et ne pas les afficher dans le sous menu
            if (allTag.length != 0) {
                Array.from(allTag).forEach((allTag, index) => {
                    if (ingredient.ingredient.toLocaleLowerCase() == allTag.innerText.toLocaleLowerCase()) {
                        optionPasAfficher = true;
                    }
                });
            }

            if (optionPasAfficher == false) {
                ajoutIngredientMenu(ingredient, menu, tagIngredient);

            }
        }

    }
}

function affichageAppareils(appareil, menuAppareil, tagAppareil, appareilExisteDeja) {
   
    //Recherche si l'on a tapé quelquche à prendre en compte dans le sous menu des ingredients
    if (appareil.toLowerCase() != valeurTapéAppareil.toLowerCase())
    {
        const option = document.getElementsByClassName('option');

        if (option.length != 0) {
            //Recherche de l'ingrédient dans le DOM
            Array.from(option).forEach((element, index) => {
                if (element.innerText.toLowerCase() == appareil.toLowerCase()) {
                    appareilExisteDeja = true;
                }
            });
            //S'il n'existe pas dans le DOM: on le met dedans
            if (appareilExisteDeja == false) {
                const allTag = document.getElementsByClassName('pAppareil');
                let optionPasAfficher = false;
                //Verification des tag affiché dans le dom, et ne pas les afficher dans le sous menu
                if (allTag.length != 0) {
                    Array.from(allTag).forEach((allTag, index) => {
                        if (appareil == allTag.innerText) {
                            optionPasAfficher = true;
                        }
                    });
                }
                if (optionPasAfficher == false) {
                    // ajoutIngredientMenu(ingredient,menu,tagIngredient);
                    ajoutAppareilMenu(appareil, menuAppareil, tagAppareil);
                }

            } else {
                appareilExisteDeja = false;
            }

        }
        else {
            ajoutAppareilMenu(appareil, menuAppareil, tagAppareil);
        }

    } else {
        const option = document.querySelectorAll('#menuAppareils>.option');
        let appareilExisteDeja = false;
        
        //Recherche de l'ingrédient dans le DOM
        Array.from(option).forEach((element, index) => {
            if (element.innerText.toLowerCase() == appareil.toLowerCase()) {
                appareilExisteDeja = true;
            }
        });

        if (appareilExisteDeja == false) {

            const allTag = document.getElementsByClassName('pAppareil');
            let optionPasAfficher = false;
            //Verification des tag affiché dans le dom, et ne pas les afficher dans le sous menu
            if (allTag.length != 0) {
                Array.from(allTag).forEach((allTag, index) => {
                    if (appareil == allTag.innerText) {
                        optionPasAfficher = true;
                    }
                });
            }

            if (optionPasAfficher == false) {
                ajoutAppareilMenu(appareil, menuAppareil, tagAppareil);

            }
        }
    }
}

function affichageUstensiles(ustensile, menuUstensile, tagUstensile, ustensileExisteDeja) {

    //Recherche si l'on a tapé quelquche à prendre en compte dans le sous menu des ingredients
    if (ustensile.toLowerCase() != valeurTapéUstensile.toLowerCase())
    {
        const option = document.getElementsByClassName('option');

        if (option.length != 0) {
            //Recherche de l'ingrédient dans le DOM
            Array.from(option).forEach((element, index) => {
                if (element.innerText.toLowerCase() == ustensile.toLowerCase()) {
                    ustensileExisteDeja = true;
                }
            });
            //S'il n'existe pas dans le DOM: on le met dedans
            if (ustensileExisteDeja == false) {

                const allTag = document.getElementsByClassName('pUstensile');
                let optionPasAfficher = false;
                //Verification des tag affiché dans le dom, et ne pas les afficher dans le sous menu
                if (allTag.length != 0) {
                    Array.from(allTag).forEach((allTag, index) => {
                        if (ustensile == allTag.innerText) {
                            optionPasAfficher = true;
                        }
                    });
                }
                if (optionPasAfficher == false) {
                    ajoutUstensileMenu(ustensile, menuUstensile, tagUstensile);
                }


            } else {
                ustensileExisteDeja = false;
            }

        }
    } else {
        const option = document.querySelectorAll('#menuUstensiles>.option');
        let ustensileExisteDeja = false;
        
        //Recherche de l'ingrédient dans le DOM
        Array.from(option).forEach((element, index) => {
            if (element.innerText.toLowerCase() == ustensile.toLowerCase()) {
                ustensileExisteDeja = true;
            }
        });

        if (ustensileExisteDeja == false) {

            const allTag = document.getElementsByClassName('pUstensile');
            let optionPasAfficher = false;
            //Verification des tag affiché dans le dom, et ne pas les afficher dans le sous menu
            if (allTag.length != 0) {
                Array.from(allTag).forEach((allTag, index) => {
                    if (ustensile == allTag.innerText) {
                        optionPasAfficher = true;
                    }
                });
            }

            if (optionPasAfficher == false) {
                ajoutUstensileMenu(ustensile, menuUstensile, tagUstensile);

            }
        }

    }
}


const formPrimaire = document.getElementById('formPrimaire');
const recherchePrimaire = document.querySelector('.recherche-primaire');
recherchePrimaire.addEventListener('keyup', () => {
    if (formPrimaire.firstSearch.value.length >= 2) {
        valeurTapéGlobal = formPrimaire.firstSearch.value;
        search();
    }
});

const formIngredient = document.getElementById('formIngredient');
const rechercheIngredient = document.querySelector('.recherche-ingredient');
rechercheIngredient.addEventListener('keyup', () => {
    valeurTapéIngredient = formIngredient.IngredientSearch.value;

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
        // affichageIngredient(monFiltre,menu,tagIngredient,false);
        affichageDuSousMenu(monFiltre, menu, tagIngredient, false, 'Ingredient');
    });

});

const formAppareil = document.getElementById('formAppareil');
const rechercheAppareil = document.querySelector('.recherche-appareil');
rechercheAppareil.addEventListener('keyup', () => {

    valeurTapéAppareil = formAppareil.AppareilSearch.value;

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
        // affichageAppareils(monFiltre,menu,tagAppareil,false);
        affichageDuSousMenu(monFiltre, menu, tagAppareil, false, 'Appareil');

    });

});


const formUstensile = document.getElementById('formUstensile');
const rechercheUstensile = document.querySelector('.recherche-ustensile');
rechercheUstensile.addEventListener('keyup', () => {

    valeurTapéUstensile = formUstensile.UstensileSearch.value;

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
        affichageUstensiles(monFiltre, menu, tagUstensile, false);
        // affichageDuSousMenu(ustensile,menuUstensile,tagUstensile,false,'Ustensile');

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


valeurTapéGlobal = null;
search();
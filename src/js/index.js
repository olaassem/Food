import Search from './models/Search';
import Recipe from './models/Recipe';
import * as searchView from './views/searchView';
import { elements, renderLoader, clearLoader } from './views/base';


/** Global State of the App 
 * - Search object
 * - Current recipe object
 * - Shopping list object
 * - Liked recipes object
 **/

const state = {}


/** 
 * SEARCH CONTROLLER
 **/

const controlSearch = async () => {
    // 1. Gey query from view
    const query = searchView.getInput();

    if(query) {
        // 2. New search obj and add to state
        state.search = new Search(query); 

        // 3. Prepare UI for results
        searchView.clearInput();
        searchView.clearResults();
        renderLoader(elements.searchRes);

        try {
            // 4. Search for recipes
            await state.search.getResults();

            // 5. Render results on UI
            clearLoader();
            searchView.renderResults(state.search.result);

        } catch(error) {
            alert('Error Processing Results :(');
            clearLoader();
        }
    }
}

elements.searchForm.addEventListener('submit', e => {
    e.preventDefault();
    controlSearch();
});

elements.searchResPages.addEventListener('click', e => {
    const btn = e.target.closest('.btn-inline');
    if (btn) {
        const gotToPage = parseInt(btn.dataset.goto, 10);
        searchView.clearResults();
        searchView.renderResults(state.search.result, gotToPage);
    }
});


/** 
 * RECIPE CONTROLLER
 **/

 const controlRecipe = async () => {
     // Get ID from URL
    const id = window.location.hash.replace('#', '');
    console.log(id);

    if (id) {

        // Prepare UI for changes

        // Create new recipe object
        state.recipe = new Recipe(id);

        try {
            // Get recipe data & parse ingredients
            await state.recipe.getRecipe();
            state.recipe.parseIngredients();

            // Calculate servings & time
            state.recipe.calcTime();
            state.recipe.calcServings();

            // Render recipe
            console.log(state.recipe);

        } catch (error) {
            alert('Error Processing Recipe :(');
        }
    }
 };

['haschange', 'load'].forEach(event => window.addEventListener(event, controlRecipe));
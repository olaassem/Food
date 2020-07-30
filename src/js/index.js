import Search from './models/Search';
import * as searchView from './views/searchView';
import { elements, renderLoader, clearLoader } from './views/base';


/** Global State of the App 
 * - Search object
 * - Current recipe object
 * - Shopping list object
 * - Liked recipes object
 **/

const state = {}

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

        // 4. Search for recipes
        await state.search.getResults();

        // 5. Render results on UI
        clearLoader();
        searchView.renderResults(state.search.result);
    }
}

elements.searchForm.addEventListener('submit', e => {
    e.preventDefault();
    controlSearch();
});




/*

👉 This is how you use forkify-api instead of the food2fork API.

In the Search.js file (as soon as you get there), just replace:

const res = await axios(`${PROXY}http://food2fork.com/api/search?key=${KEY}&q=${this.query}`);
with this:

const res = await axios(`https://forkify-api.herokuapp.com/api/search?&q=${this.query}`);


Then, in Recipe.js (as soon as you get there), please replace:

const res = await axios(`${PROXY}http://food2fork.com/api/get?key=${KEY}&rId=${this.id}`);
with this:

const res = await axios(`https://forkify-api.herokuapp.com/api/get?rId=${this.id}`);


👉 That's it, that's all you need to know. Again, make these changes as you go through the projects. For now, just keep following the videos. And now, have fun with the project 😘
*/
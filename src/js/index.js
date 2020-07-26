import axios from 'axios';

async function getResults(query){
    try {
        const results = await axios(`https://forkify-api.herokuapp.com/api/search?&q=${query}`);  //automatically returns json & works on all browsers
        const recipes = results.data.recipes;
        
        console.log(recipes);

    } catch(error) {
        alert(error);
    }
}

getResults('curry');


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
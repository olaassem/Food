import axios from 'axios';

export default class Search {
    constructor(query) {
        this.query = query;
    }

    async getResults(){
        try {
            const results = await axios(`https://forkify-api.herokuapp.com/api/search?&q=${this.query}`);  //axios automatically returns json & works on all browsers
            this.result = results.data.recipes;
                
        } catch(error) {
            alert(error);
        }
    }
}

















//const res = await axios(`https://forkify-api.herokuapp.com/api/search?&q=${this.query}`);
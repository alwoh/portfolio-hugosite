'use strict'
window.SearchApp = {
    searchField: document.getElementById('searchField'),
    searchButton: document.getElementById('searchButton'),
    output: document.getElementById('output'),
    searchData: {},
    searchIndex: {}
};

axios
    .get('/search/index.json')
    .then(response => {
        SearchApp.searchData = response.data;
        SearchApp.searchIndex = lunr( function () {
            this.ref('href');
            this.field('title');
            this.field('body');
            response.data.forEach(function (doc) {
                this.add(doc);
            });
        });
    });
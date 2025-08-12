'use strict'

import axios from 'axios';
import lunr from 'lunr';

window.SearchApp = {
    searchField: document.getElementById('searchField'),
    searchButton: document.getElementById('searchButton'),
    allwords: document.getElementById('allwords'),
    output: document.getElementById('output'),
    searchData: {},
    searchIndex: {}
};

axios
    .get('/search/index.json')
    .then(response => {
        SearchApp.searchData = response.data.results;
        SearchApp.searchIndex = lunr( function () {
            this.pipeline.remove(lunr.stemmer);
            this.searchPipeline.remove(lunr.stemmer);
            this.ref('href');
            this.field('title');
            this.field('body');
            response.data.results.forEach(function(e) {
                this.add(e);
            }, this);
        });
    });

SearchApp.searchButton.addEventListener('click', search);

function search() {
    let searchText = SearchApp.searchField.value;

    if (searchText.length === 0) {
        SearchApp.output.innerHTML = '<p>Please enter a search term.</p>';
        return;
    }

    searchText = searchText
        .split(" ")
        .map(function (word) {
            return word + "*";
        })
        .join(" ");

    if (SearchApp.allwords.checked) {
        searchText = searchText
            .split(" ")
            .map(function (word) {
                return "+" + word;
            })
            .join(" ");
    }
        
    let resultList = SearchApp.searchIndex.search(searchText);

    let list = [];
    let results = resultList.map(function (result) {
        let doc = SearchApp.searchData.find(function (doc) {
            return doc.href === result.ref;
        });
        if (doc) {
            list.push(`<li><a href="${doc.href}">${doc.title}</a></li>`);
        }
    });

    if (list.length === 0) {
        SearchApp.output.innerHTML = '<p>No results found.</p>';
    }
    else {
        SearchApp.output.innerHTML = `<ul>${list.join('')}</ul>`;
    }    
}
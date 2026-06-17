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

if (SearchApp.searchButton) {    
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
}   

function setTheme(newTheme, buttonElement) {
  var bodyEl = document.body;
  const imageElement = document.getElementById('meImage');
  if (newTheme === "dark") {
    bodyEl.classList.add("darkmode");
    document.getElementById('sunButton').style.display = "inline-flex";
    document.getElementById('moonButton').style.display = "none";
    if (imageElement)
    {
        imageElement.src = "Me.png"
    }      
  } else {
    bodyEl.classList.remove("darkmode");
    document.getElementById('sunButton').style.display = "none";
    document.getElementById('moonButton').style.display = "inline-flex";
    if (imageElement)
    {
        imageElement.src = "Me_dithered.png"
    }
  }
//  buttonElement.innerText = bodyEl.classList.contains("darkmode") ? "Toggle Light Mode" : "Toggle Dark Mode";
  localStorage.setItem("__theme", newTheme);
}

const darkModeToggles = document.querySelectorAll('.darkModeButton');

darkModeToggles.forEach(function(toggle) {
  toggle.addEventListener('click', function() {
    const isDark = document.body.classList.contains("darkmode");
    
    // Pass the specific 'toggle' that was clicked to your setTheme function
    setTheme(isDark ? "light" : "dark", toggle);
  });
});
const storedTheme = localStorage.getItem("__theme");

if (storedTheme) {        
    setTheme(storedTheme, darkModeToggles);
}

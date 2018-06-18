import "../css/popup.css";
import arrayToTree from "./general/arrayToTree";

// DOM elements
let url = document.getElementById('url');
let title = document.getElementById('title');
let category = document.getElementById('category');
let categoryContainer = document.getElementById('categoryContainer');
let saveButton = document.getElementById('save');

// objects / variables
let bookmark;
let existentCategories = [];
let bookmarks = JSON.parse(localStorage.getItem('bookmarks'));

// events
url.addEventListener("input", inputChanged);
title.addEventListener("input", inputChanged);
category.addEventListener("input", inputChanged);


// push all bookmark categories in categorie array
for (let i = 0; i < bookmarks.length; i++) {
  existentCategories.push(bookmarks[i].category);
}

existentCategories = arrayToTree(existentCategories, '/');
console.log(existentCategories);

for (var key in existentCategories) {
  categoryContainer.innerHTML += key + " ";
}

// get tab informations
chrome.tabs.query({ 'active': true, 'windowId': chrome.windows.WINDOW_ID_CURRENT },
  function (tabs) {

    let tabUrl = tabs[0].url;
    let tabTitle = tabs[0].title;
    let tabCategory = 'Uncategorized';
    let tabFavIcon = tabs[0].favIconUrl;

    url.value = tabUrl;
    title.value = tabTitle;

    bookmark = {
      url: tabUrl,
      title: tabTitle,
      category: tabCategory,
      favicon: tabFavIcon
    };
  }
);

// input change saved into bookmark object
function inputChanged(e) {
  if (this.id === "url") {
    bookmark.url = this.value;
  }

  if (this.id === "title") {
    bookmark.title = this.value;
  }

  if (this.id === "category") {
    bookmark.category = this.value.toUpperCase();
  }
}

//sending bookmark object to background.js
saveButton.onclick = function () {
  chrome.runtime.sendMessage({ saveBookmark: bookmark }, function (response) {
    window.close();
  });
};

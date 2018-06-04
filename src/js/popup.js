import "../css/popup.css";

// DOM elements
let url = document.getElementById('url');
let title = document.getElementById('title');
let category = document.getElementById('category');
let saveButton = document.getElementById('save');

// bookmark object
let bookmark;

// events
url.addEventListener("input", inputChanged);
title.addEventListener("input", inputChanged);
category.addEventListener("input", inputChanged);

// get tab informations
chrome.tabs.query({ 'active': true, 'windowId': chrome.windows.WINDOW_ID_CURRENT },
  function (tabs) {

    let tabUrl = tabs[0].url;
    let tabTitle = tabs[0].title;
    let tabCategory = 'Uncategorized';

    url.value = tabUrl;
    title.value = tabTitle;

    bookmark = {
      url: tabUrl,
      title: tabTitle,
      category: tabCategory
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
    bookmark.category = uppercase(this.value);
  }
}

// convert the first letter of each word of string in upper case
function uppercase(str) {
  var array1 = str.split(' ');
  var newarray1 = [];
  for (var x = 0; x < array1.length; x++) {
    newarray1.push(array1[x].charAt(0).toUpperCase() + array1[x].slice(1));
  }
  return newarray1.join(' ');
}

//sending bookmark object to background.js
saveButton.onclick = function () {
  chrome.runtime.sendMessage({ saveBookmark: bookmark }, function (response) {
    window.close();
  });
};

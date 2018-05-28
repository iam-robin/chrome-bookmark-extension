import "../css/newTab.css";

fetchBookmarks();
addDeleteEvent();

// get message from popup script (on click)
chrome.runtime.onMessage.addListener(
  function (request, sender, sendResponse) {
    //createBookmark(request);
    saveBookmark(request);

    // if request message is correct, send response to popup
    if (request.bookmark) {
      sendResponse({ response: "Bookmark ist angekommen!" });
    }
  });


// save Bookmark in local storage
function saveBookmark(request) {
  let siteUrl = request.bookmark.url;
  let siteTitle = request.bookmark.title;

  var bookmark = {
    url: siteUrl,
    title: siteTitle
  }

  // test if the local storage with the key 'bookmarks' is empty
  if (localStorage.getItem('bookmarks') === null) {
    // init array
    var bookmarks = [];
    // add bookmark object to array
    bookmarks.push(bookmark);
    // parse array of objects to string and set to local storage
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
  } else {
    // get bookmarks from local storage and parse to JSON
    var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
    // add bookmark to array
    bookmarks.push(bookmark);
    // re-set back to local storage
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
  }
  // re-fetch bookmarks
  fetchBookmarks();
  addDeleteEvent();
}

function deleteBookmark(e) {

  let thisUrl = e.path[1].children[0].href;
  // get bookmarks from local storage
  var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
  //loop throught bookmarks
  for (var i = 0; i < bookmarks.length; i++) {
    if (bookmarks[i].url === thisUrl) {
      console.log("remove");
      //remove from array
      bookmarks.splice(i, 1);
    }
  }
  // re-set back to local storage
  localStorage.setItem('bookmarks', JSON.stringify(bookmarks));

  // re-fetch bookmarks
  fetchBookmarks();
}

function fetchBookmarks() {
  if (localStorage.getItem('bookmarks') != null) {
    var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
    var bookmarkResults = document.getElementById('bookmark-results');

    bookmarkResults.innerHTML = '';

    for (var i = 0; i < bookmarks.length; i++) {
      var url = bookmarks[i].url;
      var title = bookmarks[i].title;

      bookmarkResults.innerHTML += '<div class="item">' +
        '<a href="' + url + '">' + title + '</a>' +
        '<span class="close">x</span>' +
        '</div>';
    }
  }
}

function addDeleteEvent() {
  Array.from(document.getElementsByClassName('close')).forEach(function (element) {
    element.addEventListener('click', deleteBookmark);
  });
}
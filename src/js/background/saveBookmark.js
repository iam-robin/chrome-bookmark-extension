export default function saveBookmark(request) {
  let title = request.saveBookmark.title;
  let url = request.saveBookmark.url;
  let id = new Date().valueOf();

  let bookmark = {
    title: title,
    url: url,
    id: id
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
}
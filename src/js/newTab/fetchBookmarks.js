export default function fetchBookmarks() {
  if (localStorage.getItem('bookmarks') != null) {
    var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
    var bookmarkResults = document.getElementById('bookmark-results');

    bookmarkResults.innerHTML = '';

    for (var i = 0; i < bookmarks.length; i++) {
      var url = bookmarks[i].url;
      var title = bookmarks[i].title;
      var id = bookmarks[i].id;

      bookmarkResults.innerHTML += '<div class="item" id="' + id + '">' +
        '<a href="' + url + '">' + title + '</a>' +
        '<span class="close">x</span>' +
        '</div>';
    }
  }
}
export default function deleteBookmark(request) {
  let deleteID = request.deleteBookmark;

  // get bookmarks from local storage
  let bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
  //loop throught bookmarks
  for (let i = 0; i < bookmarks.length; i++) {
    if (bookmarks[i].id == deleteID) {
      console.log("remove");
      //remove from array
      bookmarks.splice(i, 1);
    }
  }
  // re-set back to local storage
  localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
}

// delete bookmark
export default function deleteBookmark() {
  // add click event on every close element
  Array.from(document.getElementsByClassName('close')).forEach(function (element) {
    element.addEventListener('click', function (e) {
      let deleteID = e.target.parentNode.id;
      // send clicked ID to background.js
      chrome.runtime.sendMessage({ deleteBookmark: deleteID }, function (response) {
      });
    });
  });
}
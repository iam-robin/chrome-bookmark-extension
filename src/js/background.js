import '../img/icon-128.png'
import '../img/icon-34.png'

import saveBookmark from "./background/saveBookmark";
import deleteBookmark from "./background/deleteBookmark";

// get message
chrome.runtime.onMessage.addListener(
  function (request, sender, sendResponse) {

    if (request.saveBookmark) {
      saveBookmark(request);
      messageToNewTab();
      messageCategories();
    }

    if (request.deleteBookmark) {
      deleteBookmark(request);
      messageToNewTab();
      messageCategories();
    }

    // if request message is correct, send response to popup
    if (request.saveBookmark) {
      sendResponse({ response: "bookmark arrived!" });
    }
});

function messageToNewTab() {
  chrome.runtime.sendMessage({ message: "reload" }, function (response) {
    console.log("new/deleted bookmark");
  });
}
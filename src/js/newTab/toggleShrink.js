export default function toggleShrink() {
  document.getElementById('shrink-toggle').addEventListener("click", function () {
    let item = document.getElementsByClassName("item");
    for (var i = 0; i < item.length; ++i) {
      var itemElement = item[i].children[0];
      itemElement.classList.toggle('shrink');
    }
  });
}
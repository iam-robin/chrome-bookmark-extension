export default function toggleEdit() {
  document.getElementById('edit-toggle').addEventListener("click", function () {
    let item = document.getElementsByClassName("item");
    for (var i = 0; i < item.length; ++i) {
      var itemElement = item[i];
      itemElement.classList.toggle('delete');
    }
  });
}
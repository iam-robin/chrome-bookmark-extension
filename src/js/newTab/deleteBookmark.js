import interact from  "interactjs";

export default function deleteBookmark() {
  let items = document.getElementsByClassName("item");

  for (var i = 0; i < items.length; i++) {
    items[i].classList.add("draggable");
    items[i].children[0].addEventListener('click', function (e) {
      if (drag) {
        drag = false;
        e.preventDefault();
      }
    });
  }

  let drag = false;

  // target elements with the "draggable" class
  interact('.draggable').draggable({
    autoScroll: false,
    hold: 300,

    // call this function on every dragmove event
    onmove: dragMoveListener,
    // call this function on every dragend event
    onend: function (event) {
      var target = event.target;
      target.style.webkitTransform =
        target.style.transform =
        'translate(0px, 0px)';

      target.setAttribute('data-x', 0);
      target.setAttribute('data-y', 0);
    }
  })

  .on('dragstart', function (event) {
    drag = true;
    event.target.classList.add("dragged");
  })

  .on('dragend', function (event) {
    event.target.classList.remove("dragged");
  });

  // this function is calles on every dragmove event
  function dragMoveListener(event) {
    var target = event.target,
      // keep the dragged position in the data-x/data-y attributes
      x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx,
      y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy;

    // translate the element
    target.style.webkitTransform =
      target.style.transform =
      'translate(' + x + 'px, ' + y + 'px)';

    // update the posiion attributes
    target.setAttribute('data-x', x);
    target.setAttribute('data-y', y);
  };

  // delete area
  interact('.dropzone').dropzone({
    ondropactivate: function (event) {
      event.target.classList.add('drop-active');
    },

    ondragenter: function (event) {
      var draggableElement = event.relatedTarget,
        dropzoneElement = event.target;

      dropzoneElement.classList.add('drop-target');
      draggableElement.classList.add('can-drop');
    },

    ondragleave: function (event) {
      event.target.classList.remove('drop-target');
      event.relatedTarget.classList.remove('can-drop');
    },

    ondrop: function (event) {
      //delete Bookmark here!
      let deleteID = event.relatedTarget.id;
      // send clicked ID to background.js
      chrome.runtime.sendMessage({ deleteBookmark: deleteID }, function (response) {
      });
      event.relatedTarget.classList.add('drop-ok');
    },

    ondropdeactivate: function (event) {
      event.target.classList.remove('drop-active');
      event.target.classList.remove('drop-target');
    }
  });
}
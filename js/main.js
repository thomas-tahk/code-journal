
var $photoUrl = document.querySelector('input#p-url');
var $photoPreview = document.querySelector('img');

function photoChange(e) {
  $photoPreview.setAttribute('src', $photoUrl.value);
}
$photoUrl.addEventListener('input', photoChange);

var $entryForm = document.querySelector("[data-view='entry-form'] > form");
var $formInputs = document.querySelectorAll('input, textarea');

var $unorderedList = document.querySelector('#entries-list');

function submitHandler(event) {
  event.preventDefault();
  if (data.editing === null) {
    var dataPoint = {};
    for (let i = 0; i < $formInputs.length; i++) {
      const inputName = $formInputs[i].getAttribute('name');
      dataPoint[inputName] = $formInputs[i].value;
    }
    dataPoint.entryId = data.nextEntryId;
    data.nextEntryId += 1;
    data.entries.unshift(dataPoint);
    $unorderedList.prepend(renderEntry(dataPoint));
  } else if (data.editing !== null) {
    var editEntryId = data.editing.entryId;
    for (let d = 0; d < data.entries.length; d++) {
      if (data.entries[d].entryId === editEntryId) {
        var editEntry = data.entries[d];
      }
    }
    for (let i = 0; i < $formInputs.length; i++) {
      const inputName = $formInputs[i].getAttribute('name');
      if (editEntry[inputName] !== $formInputs[i].value) {
        editEntry[inputName] = $formInputs[i].value;
      }
    }
    var $editEntree = document.querySelector(`[data-entry-id="${editEntry.entryId}"]`);
    var newEntree = renderEntry(editEntry);
    $editEntree.replaceWith(newEntree);
    // reset editing to null
    data.editing = null;
  }

  hiddenToggler('entries');

  // reset form
  $photoPreview.setAttribute('src', 'images/placeholder-image-square.jpg');
  $entryForm.reset();
}

$entryForm.addEventListener('submit', submitHandler);

/*
<li>
  <div class="row no-wrap">
    <div class="half-column">
      <img src="https://www.freecodecamp.org/news/content/images/size/w2000/2022/06/pankaj-patel-1IW4HQuauSU-unsplash.jpg">
    </div>
    <div class="half-column">
      <div class="wrapper">
        <h3 class="title">JavaScript</h3>
        <a href="#"><i class="fa-solid fa-pencil fa-lg"></i></a>
      </div>
      <p class="notes">JavaScript, often abbreviated JS, is a programming language that is one of the core technologies of the World Wide Web,
        alongside HTML and CSS. As of 2022, 98% of websites use JavaScript on the client side for web page behavior,
        often incorporating third-party libraries. All major web browsers have a dedicated JavaScript engine to execute the
        code on users' devices.</p>
    </div>
  </div>
</li>
*/

function renderEntry(entry) {
  const $newListItem = document.createElement('li');
  $newListItem.setAttribute('data-entry-id', entry.entryId);
  const title = entry.title;
  const pUrl = entry['p-url'];
  const notes = entry.notes;

  const $entryImage = document.createElement('img');
  $entryImage.setAttribute('src', pUrl);

  const $entryTitle = document.createElement('h3');
  $entryTitle.setAttribute('class', 'title');
  $entryTitle.textContent = title;

  const $editIcon = document.createElement('i');
  $editIcon.classList.add('fa-solid');
  $editIcon.classList.add('fa-pencil');
  $editIcon.classList.add('fa-lg');
  const $editIconLink = document.createElement('a');
  $editIconLink.setAttribute('href', '#');
  $editIconLink.appendChild($editIcon);

  const $titleAndIcon = document.createElement('div');
  $titleAndIcon.classList.add('wrapper');
  $titleAndIcon.appendChild($entryTitle);
  $titleAndIcon.appendChild($editIconLink);

  const $entryNotes = document.createElement('p');
  $entryNotes.setAttribute('class', 'notes');
  $entryNotes.textContent = notes;

  var $rowNoWrap = document.createElement('div');
  $rowNoWrap.classList.add('row');
  $rowNoWrap.classList.add('no-wrap');
  var $halfColumnLeft = document.createElement('div');
  $halfColumnLeft.classList.add('column-half');
  var $halfColumnRight = document.createElement('div');
  $halfColumnRight.classList.add('column-half');

  $halfColumnLeft.appendChild($entryImage);
  $halfColumnRight.appendChild($titleAndIcon);
  $halfColumnRight.appendChild($entryNotes);
  $rowNoWrap.appendChild($halfColumnLeft);
  $rowNoWrap.appendChild($halfColumnRight);

  $newListItem.appendChild($rowNoWrap);

  return $newListItem;
}

function createEntries(event) {
  for (let i = 0; i < data.entries.length; i++) {
    const entry = renderEntry(data.entries[i]);
    $unorderedList.appendChild(entry);
  }
  return $unorderedList;
}

window.addEventListener('DOMContentLoaded', function (event) {
  createEntries(event);
  hiddenToggler(data.view);
});

var $entriesPage = document.querySelector("[data-view='entries']");
var $entryFormPage = document.querySelector("[data-view='entry-form']");
var $navBar = document.querySelector('#navbar');
var $entriesWrapper = document.querySelector('.wrapper');
var formHeading = document.querySelector('h2');

function hiddenToggler(string) {
  if (string === 'entries') {
    $entriesPage.classList.remove('hidden');
    $entryFormPage.classList.add('hidden');
  } else if (string === 'entry-form') {
    $entriesPage.classList.add('hidden');
    $entryFormPage.classList.remove('hidden');
  }
  data.view = string;
}

$navBar.addEventListener('click', function (event) {
  if (event.target.matches('.not-button')) {
    deleteButton.classList.add('hidden');
    hiddenToggler($entriesPage.getAttribute('data-view'));
  }
});
$entriesWrapper.addEventListener('click', function (event) {
  if (event.target.matches('.button-like')) {
    // reset any previously existing entry form materials
    $photoPreview.setAttribute('src', 'images/placeholder-image-square.jpg');
    $entryForm.reset();
    formHeading.textContent = 'New Entry';
    deleteButton.classList.add('hidden');
    hiddenToggler($entryFormPage.getAttribute('data-view'));
  }
});

function renderDeleteButton() {
  var newButton = document.createElement('button');
  newButton.classList.add('unbutton');
  newButton.classList.add('hidden');
  newButton.setAttribute('type', 'button');
  newButton.textContent = 'Delete Entry';
  return newButton;
}

var $deleteWatcher = document.querySelector('.row > .column-full');
$deleteWatcher.appendChild(renderDeleteButton());
var deleteButton = document.querySelector('.unbutton');

$unorderedList.addEventListener('click', function (event) {
  if (event.target.matches('i')) {
    hiddenToggler('entry-form');
    formHeading.textContent = 'Edit Entry';
    deleteButton.classList.remove('hidden');
    // this seems like a bad way to access that ancestral li element
    var editItem = event.target.parentElement.parentElement.parentElement.parentElement.parentElement;
    var editId = Number(editItem.getAttribute('data-entry-id'));
    for (let d = 0; d < data.entries.length; d++) {
      if (data.entries[d].entryId === editId) {
        data.editing = data.entries[d];
      }
    }
    for (let i = 0; i < $formInputs.length; i++) {
      const inputName = $formInputs[i].getAttribute('name');
      if (inputName === 'title') {
        $formInputs[i].value = data.editing.title;
      }
      if (inputName === 'p-url') {
        $formInputs[i].value = data.editing['p-url'];
        photoChange(event);
      }
      if (inputName === 'notes') {
        $formInputs[i].value = data.editing.notes;
      }
    }
  }
});

function renderModal() {
  var newModal = document.createElement('div');
  newModal.classList.add('modal-show');
  newModal.classList.add('hidden');
  var modalContent = document.createElement('div');
  modalContent.classList.add('modal-content');
  var confirmText = document.createElement('p');
  confirmText.textContent = 'Are you sure you want to delete this entry?';
  var confirmButton = document.createElement('button');
  confirmButton.setAttribute('type', 'button');
  confirmButton.classList.add('confirm');
  confirmButton.textContent = 'CONFIRM';
  var cancelButton = document.createElement('button');
  cancelButton.setAttribute('type', 'button');
  cancelButton.classList.add('cancel');
  cancelButton.textContent = 'CANCEL';
  modalContent.appendChild(confirmText);
  modalContent.appendChild(cancelButton);
  modalContent.appendChild(confirmButton);
  newModal.appendChild(modalContent);
  return newModal;
}

$deleteWatcher.appendChild(renderModal());
var $modal = document.querySelector('.modal-show');
$deleteWatcher.addEventListener('click', function (event) {
  if (event.target.matches('.unbutton')) {
    $modal.classList.remove('hidden');
  }
});

var $modalContent = document.querySelector('.modal-content');
$modalContent.addEventListener('click', function (event) {
  if (event.target.matches('.cancel')) {
    $modal.classList.add('hidden');
    event.stopPropagation();
  } else if (event.target.matches('.confirm')) {
    // remove from data.entries
    var currEditId = data.editing.entryId;
    for (let d = 0; d < data.entries.length; d++) {
      if (currEditId === data.entries[d].entryId) {
        data.entries.splice(d, 1);
      }
    }
    // remove from dom tree
    var $allEntries = document.querySelectorAll('[data-entry-id]');
    for (let i = 0; i < $allEntries.length; i++) {
      if (currEditId === Number($allEntries[i].getAttribute('data-entry-id'))) {
        $unorderedList.removeChild($allEntries[i]);
      }
    }
    data.editing = null;
    $modal.classList.add('hidden');
    hiddenToggler('entries');
    event.stopPropagation();
  }
});

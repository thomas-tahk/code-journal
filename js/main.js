
var $photoUrl = document.querySelector('input#p-url');
var $photoPreview = document.querySelector('img');
$photoUrl.addEventListener('input', function (e) {
  $photoPreview.setAttribute('src', $photoUrl.value);
});

var $entryForm = document.querySelector("[data-view='entry-form'] > form");
var $formInputs = document.querySelectorAll('input, textarea');

function submitHandler(event) {
  event.preventDefault();
  var dataPoint = {};
  for (let i = 0; i < $formInputs.length; i++) {
    const inputName = $formInputs[i].getAttribute('name');
    dataPoint[inputName] = $formInputs[i].value;
  }
  dataPoint.entryId = data.nextEntryId;
  data.nextEntryId += 1;
  data.entries.unshift(dataPoint);
  $photoPreview.setAttribute('src', 'images/placeholder-image-square.jpg');
  $entryForm.reset();
}

$entryForm.addEventListener('submit', submitHandler);

/*
<li>
  <img src="https://www.freecodecamp.org/news/content/images/size/w2000/2022/06/pankaj-patel-1IW4HQuauSU-unsplash.jpg">
    <h3 class="title">JavaScript</h3>
    <p class="notes">JavaScript, often abbreviated JS, is a programming language that is one of the core technologies of the World Wide Web,
      alongside HTML and CSS. As of 2022, 98% of websites use JavaScript on the client side for web page behavior,
      often incorporating third-party libraries. All major web browsers have a dedicated JavaScript engine to execute the
      code on users' devices.</p>
</li>
*/

function renderEntry(entry) {
  const $newListItem = document.createElement('li');
  const title = entry.title;
  const pUrl = entry['p-url'];
  const notes = entry.notes;

  const $entryImage = document.createElement('img');
  $entryImage.setAttribute('src', pUrl);

  const $entryTitle = document.createElement('h3');
  $entryTitle.setAttribute('class', 'title');
  $entryTitle.textContent = title;

  const $entryNotes = document.createElement('p');
  $entryNotes.setAttribute('class', 'notes');
  $entryNotes.textContent = notes;

  $newListItem.appendChild($entryImage);
  $newListItem.appendChild($entryTitle);
  $newListItem.appendChild($entryNotes);
  return $newListItem;
}

function createEntries(event) {
  var unorderedList = document.querySelector('#entries-list');
  for (let i = 0; i < data.entries.length; i++) {
    const entry = renderEntry(data.entries[i]);
    unorderedList.appendChild(entry);
  }
  return unorderedList;
}

window.addEventListener('DOMContentLoaded', createEntries);

var $entriesPage = document.querySelector("[data-view='entries']");
var $entryFormPage = document.querySelector("[data-view='entry-form']");

// var $entriesButton = document.querySelector('.not-button');
// var $newEntryButton = document.querySelector('.button-like');

var $navBar = document.querySelector('#navbar');
var $entriesWrapper = document.querySelector('.wrapper');

function hiddenToggler(event) {
  if (event.target.matches('.not-button')) {
    $entriesPage.classList.remove('hidden');
    $entryFormPage.classList.add('hidden');
  } else if (event.target.matches('.button-like')) {
    $entriesPage.classList.add('hidden');
    $entryFormPage.classList.remove('hidden');
  }
}
$navBar.addEventListener('click', hiddenToggler);
$entriesWrapper.addEventListener('click', hiddenToggler);

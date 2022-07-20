
var $photoUrl = document.querySelector('input#p-url');
var $photoPreview = document.querySelector('img');
$photoUrl.addEventListener('input', function (e) {
  $photoPreview.setAttribute('src', $photoUrl.value);
});

var $entryForm = document.querySelector("[data-view='entry-form'] > form");
var $formInputs = document.querySelectorAll('input, textarea');

var $unorderedList = document.querySelector('#entries-list');

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
  // update entries and show entries page without reload
  $unorderedList.prepend(renderEntry(dataPoint));
  hiddenToggler('entries');
  // reset form
  $photoPreview.setAttribute('src', 'images/placeholder-image-square.jpg');
  $entryForm.reset();
}

$entryForm.addEventListener('submit', submitHandler);

/*
<li>
  <div class = row no-wrap>
    <div class="half-column">
      <img src="https://www.freecodecamp.org/news/content/images/size/w2000/2022/06/pankaj-patel-1IW4HQuauSU-unsplash.jpg">
    </div>
    <div class="half-column">
      <h3 class="title">JavaScript</h3>
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

  var $rowNoWrap = document.createElement('div');
  $rowNoWrap.classList.add('row');
  $rowNoWrap.classList.add('no-wrap');
  var $halfColumnLeft = document.createElement('div');
  $halfColumnLeft.classList.add('column-half');
  var $halfColumnRight = document.createElement('div');
  $halfColumnRight.classList.add('column-half');

  $halfColumnLeft.appendChild($entryImage);
  $halfColumnRight.appendChild($entryTitle);
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
    hiddenToggler($entriesPage.getAttribute('data-view'));
  }
});
$entriesWrapper.addEventListener('click', function (event) {
  if (event.target.matches('.button-like')) {
    hiddenToggler($entryFormPage.getAttribute('data-view'));
  }
});

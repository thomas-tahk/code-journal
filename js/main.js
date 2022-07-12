/* Test-use stuff:
Ada Lovelace
https://miro.medium.com/max/1400/a.pn
Augusta Ada King, Countess of Lovelace was an
English mathematician and writer, chiefly known for her
work on Charles Babbage's proposed mechanical general-purpose
computer, the Analytical Engine.
*/

var $photoUrl = document.querySelector('input#p-url');
var $photoPreview = document.querySelector('.photo-url > img');
$photoUrl.addEventListener('input', function (e) {
  $photoPreview.setAttribute('src', $photoUrl.value);
});

var $entryForm = document.querySelector("[data-view='entry-form'] > form");
var $formInputs = document.querySelectorAll('form > div > input');

function submitHandler(event) {
  event.preventDefault();
  var dataPoint = {};
  for (let i = 0; i < $formInputs.length; i++) {
    const inputName = $formInputs[i].getAttribute('name');
    dataPoint[inputName] = $formInputs[i].value;
  }
  dataPoint.nextEntryId = data.nextEntryId;
  data.nextEntryId += 1;
  data.entries.unshift(dataPoint);
  $photoPreview.setAttribute('src', '');
  $entryForm.reset();
}

$entryForm.addEventListener('submit', submitHandler);

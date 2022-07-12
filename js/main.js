/* Test-use stuff:
Ada Lovelace
https://media.newyorker.com/photos/590952556552fa0be682c157/master/w_2560%2Cc_limit/ada-lovelace-290.jpeg
Augusta Ada King, Countess of Lovelace was an
English mathematician and writer, chiefly known for her
work on Charles Babbage's proposed mechanical general-purpose
computer, the Analytical Engine.
*/

var $photoUrl = document.querySelector('input#p-url');
var $photoPreview = document.querySelector('img');
$photoUrl.addEventListener('input', function (e) {
  $photoPreview.setAttribute('src', $photoUrl.value);
});

var $entryForm = document.querySelector("[data-view='entry-form'] > form");
var $formInputs = document.querySelectorAll('input');

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
  $photoPreview.setAttribute('src', 'images/placeholder-image-square.jpg');
  $entryForm.reset();
}

$entryForm.addEventListener('submit', submitHandler);

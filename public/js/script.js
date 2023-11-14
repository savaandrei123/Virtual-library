function editCategory(categoryId, categoryName) {

  document.getElementById('add-form').style.display = 'none';
  document.getElementById('upload-form').style.display = 'block';

  document.getElementById('upload-form').querySelector('input[name="name"]').value = categoryName;
  document.getElementById('upload-form').action = '/categories/update/' + categoryId;
}



document.addEventListener("DOMContentLoaded", function () {
  var colors = ["cyan", "lime", "yellow", "orange", "red", "blue", "purple", "pink", "green", "brown"];
  var listItems = document.querySelectorAll('.menu li');

  listItems.forEach(function (li, index) {
    var colorIndex = index % colors.length;
    li.style.setProperty("--li-color", colors[colorIndex]);
  });
});



const ratingInput = document.querySelector('.rating-input');
const ratingValue = document.getElementById('rating-value');

ratingInput.addEventListener('input', () => {
  const value = ratingInput.value;
  ratingValue.textContent = `Nota: ${value}`;
});
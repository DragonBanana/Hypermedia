
//Get the modal
var modalLogin = document.getElementById('id01');
var modalRegister = document.getElementById('id02');

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modalLogin || event.target == modalRegister) {
    modal.style.display = "none";
  }
}

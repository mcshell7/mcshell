(function() {
  'use strict';
  window.addEventListener('load', function() {
    var form = document.getElementById('frmContact');
  	  form.addEventListener('submit', function(event) {
        if (form.checkValidity() === false) {
          event.preventDefault();
          event.stopPropagation();
          setValidationResponse();
        }
        form.classList.add('was-validated');
      }, false);
  }, false);
})();

function setValidationResponse() {
	var emailRegex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;

	var userName = document.getElementById("userName").value;
	var userEmail = document.getElementById("userEmail").value;
	var subject = document.getElementById("subject").value;
	var content = document.getElementById("message").value;

	if (userName == "") {
		markAsInvalid("userName", "required");
	} else {
		markAsValid("userName");
	}
  if (userEmail == "") {
		markAsInvalid("userEmail", "required");
	} else if(!emailRegex.test(userEmail)) {
		markAsInvalid("userEmail", "invalid");
	} else {
		markAsValid("userEmail");
	}
	if (subject == "") {
		markAsInvalid("subject", "required");
	} else {
		markAsValid("subject");
	}

	if (content == "") {
		markAsInvalid("content", "required");
	} else {
		markAsValid("content");
	}
}

function markAsValid(id) {
	document.getElementById(id+"-info").style.display = "none";
}

function markAsInvalid(id, feedback) {
	document.getElementById(id+"-info").style.display = "inline";
	document.getElementById(id+"-info").innerText = feedback;
}

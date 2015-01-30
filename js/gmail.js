$(document).ready(function () {

    var SERVER = 'https://vast-earth-2490.herokuapp.com';

// check for new emails

	$("#check-emails").bind('click', checkEmails)
	function checkEmails(e) {
		$.get(SERVER+'/email/new', function(data) {
			console.log(data);
			$("#number-new-emails").text('('+Object.keys(data).length+')'); // number of new emails next to "Inbox"
			$.each( data, function( key, value ) {
				$("#emails li:first").before(addEmail(key, value));
			});	
		});
	};

	// add new emails to the list of emails

	function addEmail(id, email){
		return '<li data-id="'+ id +'">'+
	          '<div class="checked" data-checked="false"></div>'+
	              '<div class="starred" data-starred="'+email.started+'"></div>'+
	              '<div class="from">'+email.from+'</div>'+
	              '<div class="subject">'+email.subject+'</div>'+
	              '<div class="preview">'+email.preview+'</div>'+
	            '</li>';
	};
	 

	// get full text of email

	$("#emails").delegate("li", "click", fullEmail)

	function fullEmail(e) {
		var emailId = $(this).data("id");
		var self = this;

		$.get(SERVER+'/email/'+emailId, function(data) {
			var emailText = data.email;
			var emailPreview = data.preview;
			$("li[data-id='"+emailId+"'] .preview").html(emailText);
		});
			$(self).children(".preview").click(function() {
				// e.stopPropagation();
				// console.log($(self).children(".preview"));
				$(self).children(".preview").text("test");
				return false;
			});
	};


	// send email

	$("#send").bind('click', sendEmail)

	function sent() {
		alert("Message sent!")
	}

	function sendEmail(e) {
		$.ajax({
			type: "post",
			url: SERVER+'/email',
			data: $("#blank-to").val(),
			success: sent
		});
		$('#compose-email').modal('hide')

	};

})
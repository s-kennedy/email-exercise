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
	              '<div class="starred" data-starred="'+email.started+'"><img src="images/star4.png" alt="star0" class="star0"><img src="images/star-lit4.png" alt="star1" class="star1"</div>'+
	              '<div class="from">'+email.from+'</div>'+
	              '<div class="subject">'+email.subject+'</div>'+
	              '<div class="preview">'+email.preview+'</div>'+'<div class="fulltext"></div>'+
	            '</li>';
	};
	 

	// get full text of email

	$("#emails").delegate("li", "click", fullEmail)

	function fullEmail(e) {
		var emailId = $(this).data("id");

		$.get(SERVER+'/email/'+emailId, function(data) {
			var emailText = data.email;

			$("li[data-id='"+emailId+"'] .fulltext").html(emailText);
			$("li[data-id='"+emailId+"'] .preview").hide()
			
		});
			$("li[data-id='"+emailId+"'] .fulltext").click(function() {
				$("li[data-id='"+emailId+"'] .fulltext").hide()
				$("li[data-id='"+emailId+"'] .preview").show()
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
			data: $("#blank-to", "#blank-content").val(),
			success: sent
		});
		$('#compose-email').modal('hide')

	};

// make stars visible only when starred is true

	// $("#emails").delegate("li div.starred").each(function() {

	$("#emails li div.starred").each(function() {
		if ($(this).data("starred") == true) {
			$(this).find("img.star0").hide()
		} else {
			$(this).find("img.star1").hide()
		}

		});

// clicking on stars changes the color

	$("img.star0").bind('click', function() {
		$(this).hide();
		$(this).parent().find("img.star1").show();
		// $(this).parent().data("starred") = true;
	});

	$("img.star1").bind('click', function() {
		$(this).hide();
		$(this).parent().find("img.star0").show();
		// $(this).parent().data("starred") = false;
	});

// archive an email to hide it



})
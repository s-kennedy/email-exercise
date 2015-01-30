$(document).ready(function () {

    var SERVER = 'https://vast-earth-2490.herokuapp.com';

$("#check-emails").bind('click', checkEmails)
function checkEmails(e) {
	$.get(SERVER+'/email/new', function(data) {
		console.log(data)
		$("#number-new-emails").text('('+Object.keys(data).length+')');
		$.each( data, function( key, value ) {
		alert( key + ": " + value );
	});
		$("#emails li:first").before('<li>hey</li>');
	});
};

// $("#emails li .subject").click(function() {
// 	$(this)
// })

})
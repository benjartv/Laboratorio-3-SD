// Userlist data array for filling in info box
var userListData = [];

// DOM Ready =============================================================
$(document).ready(function() {

    // Populate the user table on initial page load
    populateTable();
    // Username link click
    $('#userList table tbody').on('click', 'td a.linkshowuser', showUserInfo);
    // Add User button click
    $('#btnAddUser').on('click', addUser);
    $('#btnSearchU').on('click', searchU);
    $('#btnReboot').on('click', populateTable);

});

// Functions =============================================================

// Fill table with data
function populateTable() {

	userListData = [];
    // Empty content string
    var tableContent = '';

    // jQuery AJAX call for JSON
    $.getJSON( '/users/userlist', function( data ) {
        // For each item in our JSON, add a table row and cells to the content string
        $.each(data, function(){
        	userListData.push(this);
        	//userListData.push(this);
            tableContent += '<tr>';
            tableContent += '<td><a href="#" class="linkshowuser" rel="' + this.rut + '">' + this.rut + '</a></td>';
            tableContent += '<td>' + this.name +' '+ this.apellido + '</td>';
            tableContent += '<td>' + this.institucion + '</td>';
            tableContent += '</tr>';
        });

        // Inject the whole content string into our existing HTML table
        $('#userList table tbody').html(tableContent);
    });
    $.getJSON( '/users/userlist2', function( data ) {
        // For each item in our JSON, add a table row and cells to the content string
        $.each(data, function(){
        	userListData.push(this);
            tableContent += '<tr>';
            tableContent += '<td><a href="#" class="linkshowuser" rel="' + this.rut + '">' + this.rut + '</a></td>';
            tableContent += '<td>' + this.name +' '+ this.apellido + '</td>';
            tableContent += '<td>' + this.institucion + '</td>';
            tableContent += '</tr>';
        });

        // Inject the whole content string into our existing HTML table
        $('#userList table tbody').html(tableContent);
    });
    $.getJSON( '/users/userlist3', function( data ) {
        // For each item in our JSON, add a table row and cells to the content string
        $.each(data, function(){
        	userListData.push(this);
            tableContent += '<tr>';
            tableContent += '<td><a href="#" class="linkshowuser" rel="' + this.rut + '">' + this.rut + '</a></td>';
            tableContent += '<td>' + this.name +' '+ this.apellido + '</td>';
            tableContent += '<td>' + this.institucion + '</td>';
            tableContent += '</tr>';
        });

        // Inject the whole content string into our existing HTML table
        $('#userList table tbody').html(tableContent);
    });
};

function searchU(event){
	// Empty content string
    event.preventDefault();

    tableResponse = '';

    $.getJSON('/users/searchu1', function( data ){

    });

    var inst = {
    	'institucion': $('#searchInstitucion fieldset input#inputSearchInstitucion').val()
    }

    $.ajax({
        type: 'POST',
        data: inst,
        url: '/users/searchu1',
        dataType: 'JSON'
    }).done(function( response ) {

    	$.each(response, function(){
    		tableResponse += '<tr>';
    		tableResponse += '<td><a href="#" class="linkshowuser" rel="' + this.rut + '">' + this.rut + '</a></td>';
            tableResponse += '<td>' + this.name +' '+ this.apellido + '</td>';
            tableResponse += '<td>' + this.institucion + '</td>';
            tableResponse += '</tr>';
    	});

    	$('#searchInstitucion fieldset input').val('');
    	$('#userList table tbody').html(tableResponse);
        
    });

    $.ajax({
        type: 'POST',
        data: inst,
        url: '/users/searchu2',
        dataType: 'JSON'
    }).done(function( response ) {

    	$.each(response, function(){
    		tableResponse += '<tr>';
    		tableResponse += '<td><a href="#" class="linkshowuser" rel="' + this.rut + '">' + this.rut + '</a></td>';
            tableResponse += '<td>' + this.name +' '+ this.apellido + '</td>';
            tableResponse += '<td>' + this.institucion + '</td>';
            tableResponse += '</tr>';
    	});

    	$('#searchInstitucion fieldset input').val('');
    	$('#userList table tbody').html(tableResponse);
        
    });

    $.ajax({
        type: 'POST',
        data: inst,
        url: '/users/searchu3',
        dataType: 'JSON'
    }).done(function( response ) {

    	$.each(response, function(){
    		tableResponse += '<tr>';
    		tableResponse += '<td><a href="#" class="linkshowuser" rel="' + this.rut + '">' + this.rut + '</a></td>';
            tableResponse += '<td>' + this.name +' '+ this.apellido + '</td>';
            tableResponse += '<td>' + this.institucion + '</td>';
            tableResponse += '</tr>';
    	});

    	$('#searchInstitucion fieldset input').val('');
    	$('#userList table tbody').html(tableResponse);
        
    });

};

// Show User Info
function showUserInfo(event) {

    // Prevent Link from Firing
    event.preventDefault();

    // Retrieve username from link rel attribute
    var thisUserName = $(this).attr('rel');

    // Get Index of object based on id value
    var arrayPosition = userListData.map(function(arrayItem) { return arrayItem.rut; }).indexOf(thisUserName);

     // Get our User Object
    var thisUserObject = userListData[arrayPosition];

    //Populate Info Box
    $('#userInfoRut').text(thisUserObject.rut);
    $('#userInfoName').text(thisUserObject.name);
    $('#userInfoLast').text(thisUserObject.apellido);
    $('#userInfoInstitucion').text(thisUserObject.institucion);

};

// Add User
function addUser(event) {
    event.preventDefault();

    // Super basic validation - increase errorCount variable if any fields are blank
    var errorCount = 0;
    $('#addUser input').each(function(index, val) {
        if($(this).val() === '') { errorCount++; }
    });

    // Check and make sure errorCount's still at zero
    if(errorCount === 0) {

        // If it is, compile all user info into one object
        var newUser = {
            'rut': $('#addUser fieldset input#inputUserRut').val(),
            'name': $('#addUser fieldset input#inputUserName').val(),
            'apellido': $('#addUser fieldset input#inputUserLast').val(),
            'institucion': $('#addUser fieldset input#inputUserInstitucion').val()
        }

        // Use AJAX to post the object to our adduser service
        $.ajax({
            type: 'POST',
            data: newUser,
            url: '/users/adduser',
            dataType: 'JSON'
        }).done(function( response ) {

            // Check for successful (blank) response
            if (response.msg === '') {

                // Clear the form inputs
                $('#addUser fieldset input').val('');

                // Update the table
                populateTable();

            }
            else {

                // If something goes wrong, alert the error message that our service returned
                alert('Error: ' + response.msg);

            }
        });
    }
    else {
        // If errorCount is more than 0, error out
        alert('Please fill in all fields');
        return false;
    }
};





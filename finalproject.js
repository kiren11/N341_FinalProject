// Filename: finalproject.html
//  Written by: Kiren Kaur
//  Purpose: To create a working form with custom validation
//  Date: 4/24/18
//  Modification History:
// 04/13/18 - Original build, form Prototype
// 04/16/18	- Pulling through, added data scraping
// 04/20/18	- Simple form validation Added
// 04/23/18	- Custom validation added
// 04/25/18 - Testing
// 04/28/18 - Final Project Testing

	$(document).ready(function() {

		//submit and reset buttons
		$( "input[type='submit']" ).button();
		$( "input[type='reset']" ).button();

    //tabs - explanation of coffee types
		$( "#tabs" ).tabs();

    //slider - amount of espressoShots to add
		$( "#espressoShots" ).spinner({min: 0, max: 20});

    /********************
    NAME: slider function
    PURPOSE: allow user to choose store based on mileage
    PARAMETERS: none
    RETURN VALUE: none
    **********/

    $( function() {
      $( "#datepicker" ).datepicker();
    } );

    /********************
    NAME: slider function
    PURPOSE: allow user to choose store based on mileage
    PARAMETERS: none
    RETURN VALUE: none
    **********/
		$(function() {
			$( "#slider-range" ).slider({
				range: true,
				min: 0,
				max: 168,
				values: [ 5, 20 ],
				slide: function( event, ui ) {
					$( "#range" ).val( ui.values[ 0 ] + " - "+ ui.values[ 1 ] );
				}
			});
			$( "#range" ).val( $( "#slider-range" ).slider( "values", 0 ) +
				" - " + $( "#slider-range" ).slider( "values", 1 ) );
		});

    //autocomplete
		var availableTags = [
			"Espresso",
			"Americano",
			"Macchiato",
			"Cappuccino",
			"Frappaccino",
			"Latte",
			"Mocha",
		];
		$( "#coffeeOrder" ).autocomplete({
			source: availableTags
		});

    /********************
    NAME: validator function
    PURPOSE: to convert values to strings, to concatenate Strings,
            to tell user that validation was successful
    PARAMETERS: none
    RETURN VALUE: none
    **********/
		$.validator.setDefaults({
			submitHandler: function() {
				// Scrape Data
				var strusername = $('#username').val();					// Username
				var strpassword = $('#password').val();			// Password
				var strconfPassword = $('#confPassword').val();			// Confirm Password
				var strdeliveryDate = $('#deliveryDate').val();						// Delivery Day
				var strtelephone = $('#telephone').val();					// Phone
				var stremail = $('#email').val();			// Email
				var strsize = $('input[name="size"]:checked').val();  // coffee size
				var strToppings = "";											// Favorite Rocks
				var strespressoShots = $('#espressoShots').val();					// No. of espresso shots
				var strMiles = $( "#range" ).val();					// Distance to shop
				var strdetailsacter = $( "#details" ).val();		// Extra details

        //Checkboxes
				$('input[name="toppings"]:checked').each(function() {
					strToppings += $(this).val() + " ";
				});

				//dusplay output in outputBox
				$('#outputBox').append("<br><br> Username: " + strusername)
										.append("<br> Password: " + strpassword)
										.append("<br> Confirm: " + strconfPassword)
										.append("<br> Delivery Date: " + strdeliveryDate)
										.append("<br> Phone: " + strtelephone)
										.append("<br> Email: " + stremail)
										.append("<br> Size: " + strsize)
										.append("<br> Extra Toppings: " + strToppings)
										.append("<br> Number of Espresso Shots: " + strespressoShots)
										.append("<br> Find a store is about " + strMiles + " miles away from you")
										.append("<br> Extra details: " + strdetailsacter);

        //validation passes
				alert("Passed validation & submitted.");
			}
		});

    //custom validation
    $("#flintstoneForm").validate({
			rules: {
				userName: {
					required: true,
					maxlength: 10
				},

				password: {
					required: true,
					minlength: 8
				},

				confirmPassword: {
					required: true,
					equalTo: "#password"
				},

				datepicker: {
					required: true,
					date: true
				},

				phone: {
					required: true,
					digits: true,
					maxlength: 10,
          minlength: 10
				},

				email: {
					required: true,
					email: true
				},

				details: {
					required: true,
					maxlength: 100
				},

        coffeeOrder: {
          required: true,
          maxlength: 20
        },

        espressoShots: {
          required: true,
					digits: true
        }
      },

    //messages to show if error
    messages: {

        //username, message if empty, or too short
        userName: {
					required: " Please enter a username",
					maxlength: $.validator.format(" Must not have more than {0} characters")
				},

        //pass, message if empty, or too short
				password: {
					required: " Please provide a password",
					minlength: $.validator.format(" Must have at least {0} characters")
				},

        //the 2 pass fields must match
				confirmPassword: {
					required: " Please confirm the password",
					equalTo: " Passwords must match."
				},

        //delivery date, message if empty, or not valid date
				datepicker: {
					required: " Please enter a delivery date",
					date: " Please enter a valid delivery date"
				},

        //phone number, message if empty, more than 10 digits,
				phone: {
					required: " Please enter a phone number",
					digits: " Please enter digits only",
					maxlength: " Only 10 characters allowed",
          minlength: "Must be 10 characters"
				},

        //email, message if empty, or not valid
				email: {
					required: " Please enter an email address",
					email: " Please enter a valid email address"
				},

        //details, max character limit, cant be empty
				details: {
					maxlength: " 100 character limit",
          required: "Please enter a way to make your coffee customized"
				},

        //must not be empty
        coffeeOrder: {
          required: " Please select a coffee type!"
        },

        //slider field must have value, must be number
        espressoShots: {
          required: " Please select the number of espresso shots.",
          digits: "Please enter a number value here"
        }
			}
	});
});

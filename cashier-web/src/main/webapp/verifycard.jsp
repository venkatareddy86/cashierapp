<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<%@ page import="org.owasp.validator.html.*" %>
<%@ page import="java.util.Calendar" %>


<%
	String POLICY_FILE_LOCATION = "/WEB-INF/antisamy-1.4.4.xml";
	Policy policy = Policy.getInstance(application.getResourceAsStream(POLICY_FILE_LOCATION));
	AntiSamy as = new AntiSamy();
	String ott = request.getParameter("OTT");
	CleanResults cr = null;
	if (ott != null) {
		cr = as.scan(ott, policy, AntiSamy.SAX);
		ott = cr.getCleanHTML();
	}

    String title = request.getParameter("Title");
	if (title != null) {
		cr = as.scan(title, policy, AntiSamy.SAX);
		title = cr.getCleanHTML();
	}
	
	String firstName = request.getParameter("FirstName");
	if (firstName != null) {
		cr = as.scan(firstName, policy, AntiSamy.SAX);
		firstName = cr.getCleanHTML();
	}

	String lastName = request.getParameter("LastName");
	if (lastName != null) {
		cr = as.scan(lastName, policy, AntiSamy.SAX);
		lastName = cr.getCleanHTML();
	}

	String address1 = request.getParameter("Address1");
	if (address1 != null) {
		cr = as.scan(address1, policy, AntiSamy.SAX);
		address1 = cr.getCleanHTML();
	}

	String address2 = request.getParameter("Address2");
	if (address2 != null) {
		cr = as.scan(address2, policy, AntiSamy.SAX);
		address2 = cr.getCleanHTML();
	}

	String address3 = request.getParameter("Address3");
	if (address3 != null) {
		cr = as.scan(address3, policy, AntiSamy.SAX);
		address3 = cr.getCleanHTML();
	}

	String city = request.getParameter("City");
	if (city != null) {
		cr = as.scan(city, policy, AntiSamy.SAX);
		city = cr.getCleanHTML();
	}

	String zipCode = request.getParameter("ZipCode");
	if (zipCode != null) {
		cr = as.scan(zipCode, policy, AntiSamy.SAX);
		zipCode = cr.getCleanHTML();
	}
	
	String stateCode = request.getParameter("StateCode");
	if (stateCode != null) {
		cr = as.scan(stateCode, policy, AntiSamy.SAX);
		stateCode = cr.getCleanHTML();
	}
	
	String countryCode = request.getParameter("CountryCode");
	if (countryCode != null) {
		cr = as.scan(countryCode, policy, AntiSamy.SAX);
		countryCode = cr.getCleanHTML();
	}
	
	String phoneNumber = request.getParameter("PhoneNumber");
	if (phoneNumber != null) {
		cr = as.scan(phoneNumber, policy, AntiSamy.SAX);
		phoneNumber = cr.getCleanHTML();
	}
	
	String email = request.getParameter("Email");
	if (email != null) {
		cr = as.scan(email, policy, AntiSamy.SAX);
		email = cr.getCleanHTML();
	}
	
	String cancelUrl = request.getParameter("cancel_url");
	if (cancelUrl != null) {
		cr = as.scan(cancelUrl, policy, AntiSamy.SAX);
		cancelUrl = cr.getCleanHTML();
	}

	String ourReference = request.getParameter("our_reference");
	if (ourReference != null) {
		cr = as.scan(ourReference, policy, AntiSamy.SAX);
		ourReference = cr.getCleanHTML();
	}
	
	String authToken = request.getParameter("authToken");
	if (authToken != null) {
		cr = as.scan(authToken, policy, AntiSamy.SAX);
		authToken = cr.getCleanHTML();
	}

	// validate target_url
	  String targetUrl = request.getParameter("hosted_payment");
	//String pattern = "https://[^/]*\\.wpstn\\.com/.*";
	//boolean isRequestOk = targetUrl != null && targetUrl.matches(pattern);
	  boolean isRequestOk = true;
%>

<html>
	<head>
		<title>Demo credit card entry</title>
		<link rel="stylesheet" type="text/css" href="assets/styles/portal.css">
		<script src="scripts/vendor.js"></script>
		<script src="scripts/services.js"></script>
	</head>

	<body class="cashier-app-body">
	<div id="cashier-app-wrapper">
	<div class="cashier-app" ng-app="verifyAddCard" ng-controller="addCardCtrl">

	<% if (isRequestOk) { %>
	<h2 class="page-title">Add Card</h2>


	<form name="dummyForm" class="form-horizontal cashier-app__form" autocomplete="off" novalidate  ng-submit="submit($event)">
			<fieldset class="fieldset fieldset--with-legend">
			<legend class="fieldset__legend">Enter your card information</legend>
			<div class="form-group">
				<label for="billing-cc-number" class="col-xs-12 col-sm-4 control-label required">Debit or Credit Card Number</label>
				<div class="col-xs-12 col-sm-4">
					<input name="cardNumber" size="16" maxlength="16" autocomplete="off" type="text"  class="form-control" placeholder="1234567890123456" required pattern="\d*" ng-minlength="16" ng-model="cardNumber">

					<div ng-messages="dummyForm.cardNumber.$error" ng-if="dummyForm.$submitted">
						<label class="error" for="cardNumber" class="error" ng-message="pattern" >Card number is in invalid format.</label>
						<label class="error" for="cardNumber" class="error" ng-message="minlength" >Please enter a 16 digit number.</label>
						<label class="error" for="cardNumber" class="error" ng-message="required" >This field is required.</label>
					</div>
				</div>
			</div>
			<div class="form-group form-inline" role="group" aria-labelledby="expDateGroup">
				<label id="expDateGroup" class="col-xs-12 col-sm-4 control-label required"><strong>Expiration Date</strong></label>
				<div class="col-xs-12 col-sm-4">

					<label for="cardMonth" class="sr-only">Expiration month</label>
					<select id="cardMonth" name="cardMonth" class="form-control" ng-model="cardMonth" required ng-change="updateDate()">
						<option value="">Month</option>
						<option value="01">01</option>
						<option value="02">02</option>
						<option value="03">03</option>
						<option value="04">04</option>
						<option value="05">05</option>
						<option value="06">06</option>
						<option value="07">07</option>
						<option value="08">08</option>
						<option value="09">09</option>
						<option value="10">10</option>
						<option value="11">11</option>
						<option value="12">12</option>
					</select>
					<label for="cardYear" class="sr-only">Expiration year</label>
					<select id="cardYear" name="cardYear" class="form-control" ng-model="cardYear" required ng-change="updateDate()">
						<option value="">Year</option>
						<%
							int year = Calendar.getInstance().get(Calendar.YEAR);
							for(int i=year;i<=year+7;i++){
								out.print("<option value='"+i+"'>"+i+"</option>");
							}
						%>

					</select>

					<div ng-messages="dummyForm.cardMonth.$error" ng-if="dummyForm.$submitted">

						<label class="error" for="cardMonth" class="error" ng-message="required" >Expiration month is required.</label>
						<label class="error" for="cardMonth" class="error" ng-message="monthyeargreater" >Expiry Month cannot be less than current month.</label>

					</div>
					<div ng-messages="dummyForm.cardYear.$error" ng-if="dummyForm.$submitted">

						<label class="error" for="cardYear" class="error" ng-message="required" >Expiration year is required.</label>
					</div>

					<input type="hidden" name="cardExpire" size="4" maxlength="4" autocomplete="off" ng-model="cardExpire" />
				</div>
			</div>
			<div class="form-group">
				<label for="billing-cvv" class="col-xs-12 col-sm-4 control-label required" aria-label="CVV number">CVV</label>
				<div class="col-sm-7">
					<input type="text" name="cardCvv" class="input-ccv form-control" maxlength="4" value='' ng-model="cardCVV" pattern="\d*" ng-minlength="3" ng-maxlength="4" required>

					<div ng-messages="dummyForm.cardCvv.$error" ng-if="dummyForm.$submitted">
						<label class="error" for="cardCvv" class="error" ng-message="required">CVV is required.</label>
						<label class="error" for="cardCvv" class="error" ng-message="pattern">CVV is invalid.</label>
						<label class="error" for="cardCvv" class="error" ng-message="minlength">CVV is invalid.</label>
						<label class="error" for="cardCvv" class="error" ng-message="maxlength">CVV is invalid.</label>
					</div>

				</div>
			</div>
		</fieldset>

		<fieldset class="fieldset fieldset--with-legend">
			<legend class="fieldset__legend">Name (as it appears on the card)</legend>

			<div class="form-group">
				<label for="nameOnCard1" class="col-xs-12 col-sm-4 control-label required">First name</label>
				<div class="col-xs-12 col-sm-4">
					<input name="cardFirstName" class="form-control" type="text" ng-init="cardFirstName = '<%=firstName%>'" ng-model="cardFirstName" pattern="^([a-zA-Z\s]+)$" required ng-minlength="2" ng-minlength="30">

					<div ng-messages="dummyForm.cardFirstName.$error" ng-if="dummyForm.$submitted">
						<label class="error" for="cardFirstName" class="error" ng-message="required" >First Name is required.</label>
						<label class="error" for="cardFirstName" class="error" ng-message="pattern" >First Name must contain characters only.</label>
						<label class="error" for="cardFirstName" class="error" ng-message="minlength" >First Name must be between 2 and 30 characters long.</label>
						<label class="error" for="cardFirstName" class="error" ng-message="maxlength" >First Name must be between 2 and 30 characters long.</label>
					</div>

				</div>
			</div>
			<div class="form-group">
				<label for="nameOnCard2" class="col-xs-12 col-sm-4 control-label required">Last name</label>
				<div class="col-xs-12 col-sm-4">
					<input name="cardLastName" class="form-control" type="text" ng-init="cardLastName ='<%=lastName%>'" ng-model="cardLastName" pattern="^([a-zA-Z\s]+)$" required ng-minlength="2" ng-minlength="30">
					<div ng-messages="dummyForm.cardLastName.$error" ng-if="dummyForm.$submitted">
						<label class="error" for="cardLastName" class="error" ng-message="required" >Last Name is required.</label>
						<label class="error" for="cardLastName" class="error" ng-message="pattern" >Last Name must contain characters only.</label>
						<label class="error" for="cardLastName" class="error" ng-message="minlength" >Last Name must be between 2 and 30 characters long.</label>
						<label class="error" for="cardLastName" class="error" ng-message="maxlength" >Last Name must be between 2 and 30 characters long.</label>
					</div>
				</div>
			</div>
		</fieldset>

		<fieldset class="fieldset fieldset--with-legend">
			<legend class="fieldset__legend">Billing Address</legend>
			<div class="form-group">

				<div class="col-xs-12 col-sm-4"></div>
				<div class="col-xs-12 col-sm-7">
					<div class="cashier-app__form-checkbox">
						<label for="addressSame" class="checkbox">
							<input type="checkbox" id="addressSame" checked="" ng-true-value="false" ng-false-value="true" ng-model="newAddress" ng-click="changeAddress()"> Billing Address same as my registered address</label>

						<div id="mainAddress" class="pad010" ng-class="{hide : newAddress}">
							<p><%=address1%>,<br>
								<%=address2%>,<br>
								<%=city%>,<br>
								<%=stateCode%><br>
								<%=zipCode%><br>

								<input type="hidden" ng-model="oldAddress1" name="oldAddress1"  ng-init="oldAddress1 = '<%=address1%>'" />
								<input type="hidden" ng-model="oldAddress2" name="oldAddress2" ng-init="oldAddress2 = '<%=address2%>'" />
								<input type="hidden" ng-model="oldCity" name="oldCity" ng-init="oldCity = '<%=city%>'"  />
								<input type="hidden" ng-model="oldState" name="oldState" ng-init="oldState = '<%=stateCode%>'" />
								<input type="hidden" ng-model="oldZip" name="oldZip" ng-init="oldZip = '<%=zipCode%>'" />
							</p>
						</div>
					</div>
				</div>
			</div>


			<div class="add-card-address-fields" id="newAddress" ng-class="{hide : !newAddress}">
				<div class="form-group">
					<label class="col-xs-12 col-sm-4 control-label">Address</label>
					<div class="col-xs-12 col-sm-4"><input class="form-control" name="cardAddress1" type="text"  ng-model="cardAddress1"  ng-init="cardAddress1 = '<%=address1%>'"  pattern="([a-zA-Z0-9\s]+)$" required ng-minlength="5" ng-maxlength="50"></div>
					<div ng-messages="dummyForm.cardAddress1.$error" ng-if="dummyForm.$submitted">
						<label class="error" for="cardAddress1" class="error" ng-message="required" >Address is required.</label>
						<label class="error" for="cardAddress1" class="error" ng-message="minlength" >Address must be between 5 and 50 characters long.</label>
						<label class="error" for="cardAddress1" class="error" ng-message="maxlength" >Address must be between 5 and 50 characters long.</label>
						<label class="error" for="cardAddress1" class="error" ng-message="pattern" >Address must contain numbers or letters only. Periods and other special characters are not allowed.</label>
					</div>
				</div>
				<div class="form-group">
					<label class="col-xs-12 col-sm-4 control-label"></label>
					<div class="col-xs-12 col-sm-4"><input class="form-control" name="cardAddress2" type="text"  ng-model="cardAddress2" ng-init="cardAddress2 = '<%=address2%>'"></div>
				</div>
				<div class="form-group">
					<label class="col-xs-12 col-sm-4 control-label">City</label>
					<div class="col-xs-12 col-sm-4"><input name="cardCity" class="form-control" type="text" ng-model="cardCity" ng-init="cardCity = '<%=city%>'" pattern="^[a-zA-Z]+([a-zA-Z\'\s]+)?$" required ng-minlength="3" ng-maxlength="20"></div>
					<div ng-messages="dummyForm.cardCity.$error" ng-if="dummyForm.$submitted">
						<label class="error" for="cardCity" class="error" ng-message="required" >City is required.</label>
						<label class="error" for="cardCity" class="error" ng-message="minlength" >City must be between 3 and 20 characters.</label>
						<label class="error" for="cardCity" class="error" ng-message="maxlength" >City must be between 3 and 20 characters.</label>
						<label class="error" for="cardCity" class="error" ng-message="pattern" >City field must contain characters only.</label>
					</div>
				</div>
				<div class="form-group">
					<label class="col-xs-12 col-sm-4 control-label">State</label>
					<div class="col-xs-12 col-sm-4">
						<!--<input class="form-control" type="text" name="cardState" ng-model="cardState" ng-init="cardState = '<%=stateCode%>'" required>-->
					<select name="cardState" class="form-control" ng-model="cardState" ng-init="cardState = '<%=stateCode%>'" required>
						<option value="AL">AL</option>
						<option value="AK">AK</option>
						<option value="AZ">AZ</option>
						<option value="AR">AR</option>
						<option value="CA">CA</option>
						<option value="CO">CO</option>
						<option value="CT">CT</option>
						<option value="DE">DE</option>
						<option value="DC">DC</option>
						<option value="FL">FL</option>
						<option value="GA">GA</option>
						<option value="HI">HI</option>
						<option value="ID">ID</option>
						<option value="IL">IL</option>
						<option value="IN">IN</option>
						<option value="IA">IA</option>
						<option value="KS">KS</option>
						<option value="KY">KY</option>
						<option value="LA">LA</option>
						<option value="ME">ME</option>
						<option value="MD">MD</option>
						<option value="MA">MA</option>
						<option value="MI">MI</option>
						<option value="MN">MN</option>
						<option value="MS">MS</option>
						<option value="MO">MO</option>
						<option value="MT">MT</option>
						<option value="NE">NE</option>
						<option value="NV">NV</option>
						<option value="NH">NH</option>
						<option value="NJ">NJ</option>
						<option value="NM">NM</option>
						<option value="NY">NY</option>
						<option value="NC">NC</option>
						<option value="ND">ND</option>
						<option value="OH">OH</option>
						<option value="OK">OK</option>
						<option value="OR">OR</option>
						<option value="PA">PA</option>
						<option value="RI">RI</option>
						<option value="SC">SC</option>
						<option value="SD">SD</option>
						<option value="TN">TN</option>
						<option value="TX">TX</option>
						<option value="UT">UT</option>
						<option value="VT">VT</option>
						<option value="VA">VA</option>
						<option value="WA">WA</option>
						<option value="WV">WV</option>
						<option value="WI">WI</option>
						<option value="WY">WY</option>
					</select>

						</div>
					<div ng-messages="dummyForm.cardState.$error" ng-if="dummyForm.$submitted">
						<label class="error" for="cardState" class="error" ng-message="required" >State is required.</label>
					</div>
				</div>
				<div class="form-group">
					<label class="col-xs-12 col-sm-4 control-label">Zip Code</label>
					<div class="col-xs-12 col-sm-4"><input class="form-control" type="text" name="cardZip" ng-model="cardZip" ng-init="cardZip = '<%=zipCode%>'" required pattern="^[0-9]{5}$"></div>
					<div ng-messages="dummyForm.cardState.$error" ng-if="dummyForm.$submitted">
						<label class="error" for="cardState" class="error" ng-message="required" >Zip Code is required.</label>
						<label class="error" for="cardState" class="error" ng-message="required" >Zip Code is invalid.</label>
					</div>
				</div>
			</div>

		</fieldset>


		<div class="btn-centered">
			<a class="btn btn-default" ng-click="cancel()">Cancel</a>
			<button type="submit" class="btn btn-primary" data-loading-text="Adding Card..." >Add Card</button>
		</div>
	</form>

	<form id="hiddenForm" name="cardEntry" action="<%=targetUrl%>" method="POST" ng-submit="true">
		<input type="hidden" name="Action" value="Add">
		<input type="hidden" name="OTT" value="<%=ott%>">

		<input name="billing-cc-number" type="hidden"  id="cardNumber" />
		<input name="billing-cc-exp" type="hidden"  id="cardExpire" />
		<input name="billing-cvv" type="hidden"    id="cardCVV" />
		<input name="billing-first-name" type="hidden"  id="cardFirstName" />
		<input name="billing-last-name"  type="hidden"  id="cardLastName" />
		<input name="billing-address1" type="hidden"   id="cardAddress1" />
		<input name="billing-address2" type="hidden"  id="cardAddress2" />
		<input name="billing-city"  type="hidden"  id="cardCity" />
		<input name="billing-state" type="hidden" id="cardState"  />
		<input name="billing-postal" type="hidden" id="cardZip"   />
	</form>

	<form id="cancleForm" method="get" action="<%=cancelUrl%>">
        <input type="hidden" name="ourReference" value="<%=ourReference%>" />
        <input type="hidden" name="authToken" value="<%=authToken%>">
    </form>


	<%} else { %>
		<p>
			Invalid request!
		</p>
		<% } %>
    </div>
	</div>



		<!--
		<form method="POST" name="cardEntry" autocomplete="off" action="<%=targetUrl%>">


			<input type="hidden" name="Title" value="<%=title%>">
			<input type="hidden" name="FirstName" value="<%=firstName%>">
			<input type="hidden" name="LastName" value="<%=lastName%>">
			<input type="hidden" name="Address1" value="<%=address1%>">
			<input type="hidden" name="Address2" value="<%=address2%>">
			<input type="hidden" name="Address3" value="<%=address3%>">
			<input type="hidden" name="City" value="<%=city%>">
			<input type="hidden" name="StateCode" value="<%=stateCode%>">
			<input type="hidden" name="ZipCode" value="<%=zipCode%>">
			<input type="hidden" name="CountryCode" value="<%=countryCode%>">
			<input type="hidden" name="PhoneNumber" value="<%=phoneNumber%>">
			<input type="hidden" name="Email" value="<%=email%>">



		</form>
		-->
<script>
	var app = angular.module('verifyAddCard', ['ngAnimate', 'ngSanitize', 'ngMessages', 'cashier.services']);

	app.controller('addCardCtrl', function($scope, utilsService) {
		$scope.newAddress = false;

		utilsService.updateHeight();

		$scope.changeAddress = function(){
			if(!this.newAddress){
				$scope.cardAddress1 = $scope.oldAddress1;
				$scope.cardAddress2 = $scope.oldAddress2;
				$scope.cardCity = $scope.oldCity;
				$scope.cardState = $scope.oldState;
				$scope.cardZip = $scope.oldZip;
			}

			utilsService.updateHeight();
		}

		$scope.updateDate = function(){

			$scope.cardExpire = $scope.cardMonth + ($scope.cardYear ? $scope.cardYear.slice(2) : '');

			if ($scope.cardYear !== '' && $scope.cardMonth !== '') {
				var year = parseInt($scope.cardYear, 10);
				var month = parseInt($scope.cardMonth, 10);

				if (year === new Date().getFullYear()) {
					return $scope.dummyForm.cardMonth.$setValidity("monthyeargreater",month >= new Date().getMonth() + 1);
				} else if (year < new Date().getFullYear()) {
					$scope.dummyForm.cardMonth.$setValidity("monthyeargreater",false);
				} else {
					$scope.dummyForm.cardMonth.$setValidity("monthyeargreater",true);
				}
			} else {
				$scope.dummyForm.cardMonth.$setValidity("monthyeargreater",true)
			}

		}

		$scope.submit = function(e){
			if($scope.dummyForm.$valid){
				var els = document.getElementById("hiddenForm").elements;

				for(var i=0;i<els.length;i++){
					var id = els[i].id;

					if(this[id]){
						els[i].value = this[id];
					}
				}

				document.getElementById("hiddenForm").submit();
			} else {
                utilsService.updateHeight(true);
            }
		}

		$scope.cancel = function(){
			document.getElementById("cancleForm").submit();
		}
	});
</script>

	</body>
</html>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<%@ page import="org.owasp.validator.html.*" %>
<%@ page import="java.util.Calendar" %>
<%
    String POLICY_FILE_LOCATION = "/WEB-INF/antisamy-1.4.4.xml";
    Policy policy = Policy.getInstance(application.getResourceAsStream(POLICY_FILE_LOCATION));
    AntiSamy as = new AntiSamy();
    CleanResults cr = null;

    String firstName = request.getParameter("first_name");
    if (firstName != null) {
        cr = as.scan(firstName, policy, AntiSamy.SAX);
        firstName = cr.getCleanHTML();
    }

    String lastName = request.getParameter("last_name");
    if (lastName != null) {
        cr = as.scan(lastName, policy, AntiSamy.SAX);
        lastName = cr.getCleanHTML();
    }

    String address1 = request.getParameter("street_address");
    if (address1 != null) {
        cr = as.scan(address1, policy, AntiSamy.SAX);
        address1 = cr.getCleanHTML();
    }

    String city = request.getParameter("city");
    if (city != null) {
        cr = as.scan(city, policy, AntiSamy.SAX);
        city = cr.getCleanHTML();
    }

    String zipCode = request.getParameter("post_code");
    if (zipCode != null) {
        cr = as.scan(zipCode, policy, AntiSamy.SAX);
        zipCode = cr.getCleanHTML();
    }

    String stateCode = request.getParameter("state");
    if (stateCode != null) {
        cr = as.scan(stateCode, policy, AntiSamy.SAX);
        stateCode = cr.getCleanHTML();
    }

    String countryCode = request.getParameter("country_id");
    if (countryCode != null) {
        cr = as.scan(countryCode, policy, AntiSamy.SAX);
        countryCode = cr.getCleanHTML();
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

    String netbanxReference = request.getParameter("netbanx_reference");
    if (netbanxReference != null) {
        cr = as.scan(netbanxReference, policy, AntiSamy.SAX);
        netbanxReference = cr.getCleanHTML();
    }

    // validate target_url
    String targetUrl = request.getParameter("hosted_payment");
    String pattern = "https://[^/]*\\.netbanx\\.com/.*";
    boolean isRequestOk = targetUrl != null && targetUrl.matches(pattern);
%>

<html>
    <head>
        <title>Credit Card Entry</title>
        <link rel="stylesheet" type="text/css" href="assets/styles/cashierapp-portal.min.css">
        <script src="scripts/vendor.js"></script>
        <!--<script src="scripts/app.js"></script>-->
    </head>

    <body class="cashier-app-body">
        <div id="cashier-app-wrapper">
            <div class="cashierapp-standalone" ng-app="cardEntryApp" ng-controller="cardEntryCtrl">
                <div class="cashier-app">
                    <h2 class="page-title">Add New Card</h2>

                    <% if (isRequestOk) { %>
                        <form method="post" id="cardEntryForm" name="cardEntryForm" autocomplete="off" action="<%= targetUrl %>" class="form-horizontal cashier-app__form" novalidate autocomplete="off" ng-submit="onSubmit($event)">
                            <fieldset class="fieldset">
                                <div class="form-group">
                                    <label class="col-xs-24 col-sm-8 control-label">First name:</label>
                                    <div class="col-xs-24 col-sm-8">
                                        <div class="form-control-static"><%= firstName %></div>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label class="col-xs-24 col-sm-8 control-label">Last name:</label>
                                    <div class="col-xs-24 col-sm-8">
                                        <div class="form-control-static"><%= lastName %></div>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label class="col-xs-24 col-sm-8 control-label">Address:</label>
                                    <div class="col-xs-24 col-sm-8">
                                        <div class="form-control-static"><%= address1 %></div>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label class="col-xs-24 col-sm-8 control-label">City:</label>
                                    <div class="col-xs-24 col-sm-8">
                                        <div class="form-control-static"><%= city %></div>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label class="col-xs-24 col-sm-8 control-label">Zip Code:</label>
                                    <div class="col-xs-24 col-sm-8">
                                        <div class="form-control-static"><%= zipCode %></div>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label class="col-xs-24 col-sm-8 control-label">State:</label>
                                    <div class="col-xs-24 col-sm-8">
                                        <div class="form-control-static"><%= stateCode %></div>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label class="col-xs-24 col-sm-8 control-label">Country:</label>
                                    <div class="col-xs-24 col-sm-8">
                                        <div class="form-control-static"><%= countryCode %></div>
                                    </div>
                                </div>
                            </fieldset>

                            <fieldset class="fieldset">
                                <div class="form-group">
                                    <label for="billing-cc-number" class="col-xs-24 col-sm-8 control-label">Card Number</label>
                                    <div class="col-xs-24 col-sm-8">
                                        <input id="cardNum" name="cardNum" size="16" maxlength="16" autocomplete="off" type="text"  class="form-control" placeholder="1234567890123456" required pattern="\d*" ng-minlength="16" ng-model="cardNum">

                                        <div ng-messages="cardEntryForm.cardNum.$error" ng-if="formSubmitted">
                                            <label class="error" for="cardNum" class="error" ng-message="pattern" >Card number is in invalid format.</label>
                                            <label class="error" for="cardNum" class="error" ng-message="minlength" >Please enter a 16 digit number.</label>
                                            <label class="error" for="cardNum" class="error" ng-message="required" >This field is required.</label>
                                        </div>
                                    </div>
                                </div>
                                <div class="form-group form-inline" role="group" aria-labelledby="expDateGroup">
                                    <label id="expDateGroup" class="col-xs-24 col-sm-8 control-label"><strong>Expiration Date</strong></label>
                                    <div class="col-xs-24 col-sm-8">
                                        <label for="cardExpiryMonth" class="sr-only">Expiration month</label>
                                        <select id="cardExpiryMonth" name="cardExpiryMonth" class="form-control" ng-model="cardExpiryMonth" required ng-change="updateDate()">
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

                                        <label for="cardExpiryYear" class="sr-only">Expiration year</label>
                                        <select id="cardExpiryYear" name="cardExpiryYear" class="form-control" ng-model="cardExpiryYear" required ng-change="updateDate()">
                                            <option value="">Year</option>
                                            <%
                                                int year = Calendar.getInstance().get(Calendar.YEAR);
                                                for (int i = year; i <= year + 7; i++) {
                                                    out.print("<option value='" + i + "'>" + i + "</option>");
                                                }
                                            %>
                                        </select>

                                        <div ng-messages="cardEntryForm.cardExpiryMonth.$error" ng-if="formSubmitted">
                                            <label class="error" for="cardExpiryMonth" class="error" ng-message="required" >Expiration month is required.</label>
                                            <label class="error" for="cardExpiryMonth" class="error" ng-message="monthyeargreater" >Expiry Month cannot be less than current month.</label>
                                        </div>
                                        <div ng-messages="cardEntryForm.cardExpiryYear.$error" ng-if="formSubmitted">
                                            <label class="error" for="cardExpiryYear" class="error" ng-message="required" >Expiration year is required.</label>
                                        </div>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label for="cvdNumber" class="col-xs-24 col-sm-8 control-label" aria-label="CVD number">CVD</label>
                                    <div class="col-xs-24 col-sm-8">
                                        <input type="text" id="cvdNumber" name="cvdNumber" class="input-ccv form-control" maxlength="4" value='' ng-model="cvdNumber" pattern="\d*" ng-minlength="3" ng-maxlength="4" required>

                                        <div ng-messages="cardEntryForm.cvdNumber.$error" ng-if="formSubmitted">
                                            <label class="error" for="cvdNumber" class="error" ng-message="required">CVD is required.</label>
                                            <label class="error" for="cvdNumber" class="error" ng-message="pattern">CVD is invalid.</label>
                                            <label class="error" for="cvdNumber" class="error" ng-message="minlength">CVD is invalid.</label>
                                            <label class="error" for="cvdNumber" class="error" ng-message="maxlength">CVD is invalid.</label>
                                        </div>
                                    </div>
                                </div>
                            </fieldset>

                            <input type="hidden" name="storeCardIndicator" value="true">

                            <div class="btn-centered">
                                <a class="btn btn-default" ng-click="onCancel()" ng-class="{disabled: isSubmitInProgress}">Cancel</a>
                                <button type="submit" class="btn btn-primary" name='submit' ng-disabled="isSubmitInProgress">Add Card</button>
                            </div>
                        </form>

                        <form id="cancelForm" name="cancelForm" method="get" action="<%= cancelUrl %>">
                            <input type="hidden" name="ourReference" value="<%= ourReference %>" />
                            <input type="hidden" name="netbanxReference" value="<%= netbanxReference %>" />
                        </form>
                    <% } else { %>
                        <p>Invalid request!</p>
                    <% } %>
                </div>

                <footer>
                    <div class="cashier-app cashier-app__footer">
                        <a href="/cashierapp/terms-and-conditions.html" target="_blank">Cashier Terms and Conditions</a> |
                        <a href="/cashierapp/privacy-policy.html" target="_blank">Privacy Policy</a>
                        <div class="cashier-app__copyright">Copyright &#169; 2016 IGT.</div>
                    </div>
                </footer>
            </div>
        </div>

        <script>
            (function() {
                var app = angular.module('cardEntryApp', ['ngAnimate', 'ngSanitize', 'ngMessages']);

                app.controller('cardEntryCtrl', function($scope) {
                    $scope.formSubmitted = false;
                    $scope.isSubmitInProgress = false;

                    $scope.onSubmit = function(e) {
                        $scope.formSubmitted = true;

                        if ($scope.cardEntryForm.$valid) {
                            $scope.isSubmitInProgress = true;

                            try {
                                document.getElementById('cardEntryForm').submit();
                            } catch (e) {}
                        } else {
                            e.preventDefault();
                        }
                    }

                    $scope.onCancel = function() {
                        $scope.isSubmitInProgress = true;
                        document.getElementById('cancelForm').submit();
                    }

                    $scope.updateDate = function() {
                        if ($scope.cardExpiryYear !== '' && $scope.cardExpiryMonth !== '') {
                            var year = parseInt($scope.cardExpiryYear, 10);
                            var month = parseInt($scope.cardExpiryMonth, 10);

                            if (year === new Date().getFullYear()) {
                                return $scope.cardEntryForm.cardExpiryMonth.$setValidity('monthyeargreater', month >= new Date().getMonth() + 1);
                            } else if (year < new Date().getFullYear()) {
                                $scope.cardEntryForm.cardExpiryMonth.$setValidity('monthyeargreater', false);
                            } else {
                                $scope.cardEntryForm.cardExpiryMonth.$setValidity('monthyeargreater', true);
                            }
                        } else {
                            $scope.cardEntryForm.cardExpiryMonth.$setValidity('monthyeargreater', true)
                        }
                    }
                });
            })();
        </script>
    </body>
</html>

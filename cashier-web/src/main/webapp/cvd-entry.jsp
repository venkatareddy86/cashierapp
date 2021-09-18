<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<%@ page import="org.owasp.validator.html.*" %>
<%
    String POLICY_FILE_LOCATION = "/WEB-INF/antisamy-1.4.4.xml";
    Policy policy = Policy.getInstance(application.getResourceAsStream(POLICY_FILE_LOCATION));
    AntiSamy as = new AntiSamy();
    CleanResults cr = null;

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
            <div class="cashierapp-standalone" ng-app="cvdEntryApp" ng-controller="cvdEntryCtrl">
                <div class="cashier-app">
                    <h2 class="page-title">Enter card CVD number</h2>

                    <% if (isRequestOk) { %>
                        <form method="post" id="cvdEntryForm" name="cvdEntryForm" autocomplete="off" action="<%= targetUrl %>" class="form-horizontal cashier-app__form" novalidate autocomplete="off" ng-submit="onSubmit($event)">
                            <fieldset class="fieldset">
                                <div class="form-group">
                                    <label for="cvdNumber" class="col-xs-24 col-sm-8 control-label" aria-label="CVD number">CVD</label>
                                    <div class="col-xs-24 col-sm-8">
                                        <input type="text" id="cvdNumber" name="cvdNumber" class="input-ccv form-control" maxlength="4" value='' ng-model="cvdNumber" pattern="\d*" ng-minlength="3" ng-maxlength="4" required>

                                        <div ng-messages="cvdEntryForm.cvdNumber.$error" ng-if="formSubmitted">
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
                                <button type="submit" class="btn btn-primary" name='submit' ng-disabled="isSubmitInProgress">Complete transaction</button>
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
                var app = angular.module('cvdEntryApp', ['ngAnimate', 'ngSanitize', 'ngMessages']);

                app.controller('cvdEntryCtrl', function($scope) {
                    $scope.formSubmitted = false;
                    $scope.isSubmitInProgress = false;

                    $scope.onSubmit = function(e) {
                        $scope.formSubmitted = true;

                        if ($scope.cvdEntryForm.$valid) {
                            $scope.isSubmitInProgress = true;

                            try {
                                document.getElementById('cvdEntryForm').submit();
                            } catch (e) {}
                        } else {
                            e.preventDefault();
                        }
                    }

                    $scope.onCancel = function() {
                        $scope.isSubmitInProgress = true;
                        document.getElementById('cancelForm').submit();
                    }
                });
            })();
        </script>
    </body>
</html>

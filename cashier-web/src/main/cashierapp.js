(function () {

    CashierApp = function () {
        this.options = {
            iframeElement: null,
            notification: function (response) {
                console.log("Default impl", response);
            },
            titleBar: function (response) {
                console.log("Default impl", response);
            }
        };
    }
    CashierApp.prototype.ca_actions_enum = {
        CLEANUP: "cleanUp",
        NOTIFICATION: "notification",
        TITLEBAR: "titleBar",
        LANDINGPARMS: "landingParms",
        REFRESHBALANCE: "refreshPlayerBalance"
    }

    CashierApp.prototype.initialise = function (params) {
        var actions = params['actionsList'];
        for (var param in params) {
            if (params.hasOwnProperty(param)) {
                this.options[param] = params[param];
            }
        }
        this.options.notification = actions[this.ca_actions_enum.NOTIFICATION];

        if (this.options.cashierDomain == null || this.options.cashierDomain.length < 1) {
            this.options.notification("cashierDomainIsMandatory", { type: 'error' });
            return false;
        }
        if (this.options.tempSessionId === null) {
            this.options.notification("tempSessionIdIsMandatory", { type: 'error' });
            return false;
        }
        if (this.options.displayType == 'embediframe') {
            if (this.options.containerElement == null) {
                this.options.notificationHandler("containerElementIsMandatory", { type: 'error' });
                return false;
            } else {
                createIframe(this.options.containerElement);
            }
        }
        if (this.options.displayType == "lightboxiframe") {
            if (document.getElementById("myModal")) {
                document.getElementById("myModal").remove();
            }
            document.body.appendChild(getModelTemplate());
        }

        this.options.iframeElement = document.getElementById('cashierappiframe');
        this.options.tempSessionId = encodeURIComponent(this.options.tempSessionId);

        createCashierappForm(this.options);
        bindWindowEventHandler(this.options);

    }
    function createIframe(element) {
        element.innerHTML = '<iframe id="cashierappiframe" name="cashierappiframe" style="display:none" width="100%" border="0" scrolling="no" frameborder="0" ></iframe>';
    }
    function bindWindowEventHandler(options) {
        window.addEventListener('message', function (e) {
            if (e && e.data) {
                var obj = e.data;
                if (obj.method == "updateHeight") {
                    var iframeHeight = obj.args[0];
                    iframeHeight = iframeHeight + 10;
                    if (iframeHeight <= 350) {
                        iframeHeight = 350;
                    }
                    options.iframeElement.height = iframeHeight;
                } else {
                    if (obj.method) {
                        options.notification(obj.method, { type: 'info' });
                    }
                }
            }
        });
    }

    function createFormElement(form, options, name) {
        var formEle = document.createElement("input");
        formEle.value = options[name];
        if (formEle.value) {
            formEle.name = name;
            form.appendChild(formEle);
        }
    }
    function createCashierappForm(options) {
        if (document.getElementById('cashierapppostform')) { document.getElementById('cashierapppostform').remove(); }
        var form = document.createElement("form");
        form.method = "POST";
        form.id = "cashierapppostform";
        form.action = options.cashierDomain + "/cashierapppng/index.jsp";
        createFormElement(form, options, "tempSessionId");
        createFormElement(form, options, "cashierSystemId"); // Need to remove it, cashierSystemId not required in SDK 
        createFormElement(form, options, "transactionId");
        createFormElement(form, options, "profile");

        if (options.displayType == "lightboxiframe") {
            form.target = 'cashierappiframe';
            document.body.appendChild(form);
            form.submit();
            $('#myModal').modal({ backdrop: 'static' });
            $('#myModal').modal('show');

        } else if (options.displayType == "fullpage") {
            document.body.appendChild(form);
            form.submit();
        } else if (options.displayType == "embediframe") {
            form.target = options.iframeElement.name;
            document.body.appendChild(form);
            form.submit();
            options.iframeElement.style.display = "block";
        }

    }


    function getModelTemplate() {
        var myString = '<div class="modal fade" id="myModal">' +
            '<div class="modal-dialog">' +
            '<div class="modal-content bmd-modalContent">' +
            '<div class="modal-body">' +
            '<div class="close-button">' +
            '<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>' +
            '</div>' +
            '<div class="cashierappmodal-iframe">' +
            '<iframe id="cashierappiframe" name="cashierappiframe" width="100%" frameborder="0" scrolling="no"></iframe>' +
            '</div>' +
            '</div>' +
            '</div>' +
            '</div>' +
            '</div>';
        return htmlToElements(myString);
    }
    function htmlToElements(html) {
        var template = document.createElement('template');
        template.innerHTML = html;
        return template.content.childNodes[0];
    }

}());
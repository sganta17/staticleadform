!function () {
    "use strict";
    var e = function () {
        function e(e) {
            return e.indexOf("?") >= 0 ? e.split("?")[1] : e
        }
        function a(e) {
            e = decodeURIComponent(e);
            try {
                return JSON.parse(e)
            } catch (a) { return e }
        }
        var t = this;


        var form = document.forms.leadForm;
        form.onsubmit = function (event) {
            MM.submitLead(event);
        },

            this.updateAddressField = function (address) {
                $("#isAddressValid").val("true");
                $("#address").val(address);
                var inputField = document.getElementById('address');
                inputField.setCustomValidity("");
            },
            this.onChangeClientName = function (e) {

                // Get HTML head element
                var head = document.getElementsByTagName('HEAD')[0];

                var list = document.head.getElementsByTagName("link");

                var listLength = list.length;
                for (let i = 0; i < listLength; i++) {

                    if (list[i].href.indexOf("mass-mutual") >= 0) {
                        head.removeChild(list[i]);
                    }
                }

                let clientname = $("#clientName").val();

                // Create new link Element
                var link = document.createElement('link');

                // set the attributes for link element
                link.rel = 'stylesheet';

                link.type = 'text/css';

                link.href = '../stylesheets/_mass-mutual-' + clientname + '.css';

                // Append link element to HTML head
                head.appendChild(link);


                if (clientname === "mmbu") {
                    $("#contactMandatory").addClass("displayNone");
                } else if (clientname === "mmjebit") {

                    $("#contactDiv").addClass("displayNone");
                } else {

                    $("#contactDiv").removeClass("displayNone");
                    $("#contactMandatory").removeClass("displayNone");
                }

            },
            this.validateAddress = function () {
                var inputField = document.getElementById('address');
                inputField.setCustomValidity("");
                var address = document.getElementById('leadExistingAddress');
                if (address && address.style.visibility === "hidden") {
                    let isAddressValid = $("#isAddressValid").val();
                    if (isAddressValid === "false" && inputField.value === "") {

                        inputField.setCustomValidity("Please fill out this field");
                    } else if (isAddressValid === "false") {

                        inputField.setCustomValidity("Please choose from the list");
                    }
                }
            },
            this.validateName = function (fieldId) {
                var fieldValue = $("#" + fieldId).val();
                var nameFormat = /^[a-zA-Z0-9'._ -]+$/;
                if (fieldValue == '' || fieldValue.length == 1) {
                    $("#" + fieldId).attr('style', 'color: red', 'border-bottom-color: red !important');
                    $("#" + fieldId).addClass("addBorderRed");
                    document.getElementById("span" + fieldId).style.color = "red";

                    return false;

                }
                else if (fieldValue.length > 0 && fieldValue.match(nameFormat)) {
                    //$("#"+fieldId).css("border-bottom-color","#858da3");
                    $("#" + fieldId).attr('style', 'border-bottom-color: #858da3 !important');
                    $("#" + fieldId).removeClass("addBorderRed");
                    document.getElementById("span" + fieldId).style.color = "#696969";

                    return true;

                }
                else {
                    //$("#"+fieldId).css("border-bottom-color","red");
                    $("#" + fieldId).attr('style', 'color: red', 'border-bottom-color: red !important');
                    $("#" + fieldId).addClass("addBorderRed");
                    document.getElementById("span" + fieldId).style.color = "red";

                    return false;
                }
            }

        this.ValidateEmail = function (mail) {
            if (/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9._-]+\.[a-zA-Z]{2,4}$/.test(mail)) {
                return (true);
            }
            return (false);
        },

            this.emailValidator = function (fieldId) {
                var fieldValue = $("#" + fieldId).val();

                if (fieldValue == '') {
                    $("#" + fieldId).attr('style', 'border-bottom-color: red !important');
                    $("#" + fieldId).addClass("addBorderRed");
                    document.getElementById("span" + fieldId).style.color = "red";
                    return false;
                }
                else {
                    var result = MM.ValidateEmail(fieldValue);
                    if (result == false) {
                        $("#" + fieldId).attr('style', 'color: red', 'border-bottom-color: red !important');
                        $("#" + fieldId).addClass("addBorderRed");
                        document.getElementById("span" + fieldId).style.color = "red";
                        return false;
                    }
                    else {
                        $("#" + fieldId).attr('style', 'border-bottom-color: #858da3 !important');
                        $("#" + fieldId).removeClass("addBorderRed");
                        document.getElementById("span" + fieldId).style.color = "#696969";
                        return true;
                    }
                }
            },



            this.ValidationPhone = function (fieldVal) {
                var phoneno = /[\(]\d{3}[\)] \d{3}[\-]\d{4}$/;
                if (fieldVal.match(phoneno)) {
                    return true;
                } else {
                    return false;
                }
            },
            this.phoneValidator = function (fieldId) {
                var fieldValue = $("#" + fieldId).val();
                if (fieldValue == '') {
                    $("#" + fieldId).attr('style', 'border-bottom-color: red !important');
                    $("#" + fieldId).addClass("addBorderRed");
                    document.getElementById("span" + fieldId).style.color = "red";
                    return false;
                }
                else {
                    var result = MM.ValidationPhone(fieldValue);
                    if (result == false) {
                        $("#" + fieldId).attr('style', 'color: red', 'border-bottom-color: red !important');
                        $("#" + fieldId).addClass("addBorderRed");
                        document.getElementById("span" + fieldId).style.color = "red";
                        return false;
                    }
                    else {
                        $("#" + fieldId).attr('style', 'border-bottom-color: #858da3 !important');
                        $("#" + fieldId).removeClass("addBorderRed");
                        document.getElementById("span" + fieldId).style.color = "#696969";
                        return true;
                    }
                }
            },

            this.appendAddressData = function (data) {
                var appendData = "<ul>";
                if (data && data.suggestions && data.suggestions.length > 0) {
                    for (let i = 0; i < data.suggestions.length; i++) {

                        let address = data.suggestions[i].street_line + ","
                            + data.suggestions[i].city + "," + data.suggestions[i].state + "," +
                            data.suggestions[i].zipcode;

                        appendData += "<li>";
                        appendData += '<span class="handpointer" onclick="MM.updateAddressField(' + "'" + address + "'" + ')">';
                        appendData += '<a tabindex="4" class="pull-left col-sm-24 paddingZero handpointer">';
                        appendData += "<p class='blackTxt'>" + address + "</p>";

                        appendData += "</a>";
                        appendData += "</span>";
                        appendData += "</li>";


                    }
                } else {

                    appendData += "<li class='qtip-widget'>";
                    appendData += "<p class='blackTxt'>No record found!.</p>";
                    appendData += "</li>";


                }
                appendData += "</ul>";

                $("#leadExistingAddress").html(appendData);
                document.getElementById("leadExistingAddress").style.visibility = "visible";

            },
            this.pullAddressDetails = function () {
                var address = $("#address").val();
                $.ajax({
                    //  url: "https://us-autocomplete-pro.api.smartystreets.com/lookup?auth-token=IHtD3yyIKidvSsTZByPu&auth-id=7c65f708-ed0d-2ece-ef51-3ef641ebde9d&search=" + address + "&max_results=5",
                    url: "https://us-autocomplete-pro.api.smartystreets.com/lookup?key=131839317940580630&search=" + address + "&max_results=5",
                    type: "GET",
                    headers: {
                        'Access-Control-Allow-Origin': '*',
                        'Content-Type': 'application/json'
                    },

                    crossDomain: true,
                    dataType: 'jsonp',
                    contentType: "application/json;charset=utf-8",
                    success: function (data) {
                        MM.appendAddressData(data);
                    }
                });


            },
            this.clearFormFields = function () {
                $("#name").val("");
                $("#mobileNumber").val("");
                $("#email").val("");
                $("#address").val("");
                $("#valsubmit-button").val("Send Request");
            },
            this.showLeadForm = function () {

                $("#thankyouNote").addClass("displayNone");
                $("#formDisplay").removeClass("displayNone");
            },
            this.showThankYouNote = function () {

                $("#thankyouNote").removeClass("displayNone");
                $("#formDisplay").addClass("displayNone");
            },

            this.getParameterByName = function (name, url) {
                name = name.replace(/[\[\]]/g, '\\$&');
                var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
                    results = regex.exec(url);
                if (!results) return null;
                if (!results[2]) return '';
                return decodeURIComponent(results[2].replace(/\+/g, ' '));
            },

            this.submitLead = function (event) {
                event.preventDefault();
                const url = document.referrer;

                let source = MM.getParameterByName("utm_source", url);
                let medium = MM.getParameterByName("utm_medium", url);
                let campaign = MM.getParameterByName("utm_campaign", url);
                let term = MM.getParameterByName("utm_term", url);
                let content = MM.getParameterByName("utm_content", url);

                let name = $("#name").val();
                let mobileNumber = $("#mobileNumber").val();
                let email = $("#email").val();
                let address = $("#address").val();
                let clientname = $("#clientName").val();
                var modeOfComm = new Array();
                $('input[name="modeOfComm"]:checked').each(function () {
                    modeOfComm.push($(this).val());
                });

                if (modeOfComm.length === 0) {
                    modeOfComm.push('none');
                }

                let global = "";

                let isValidEmail = MM.emailValidator("email");

                let isValidPhone = MM.phoneValidator("mobileNumber");

                let isValidName = MM.validateName("name");

                let isAddressValid = $("#isAddressValid").val();

                if (!isValidEmail || !isValidPhone || !isValidName || isAddressValid === "false") {
                    global = false;
                }


                if (global === false) {
                    $("#errorMessage").html("Fill missing mandatory fields");
                    return false;
                } else {
                    $("#valsubmit-button").val("Saving...");
                    var element = {
                        "clientname": clientname,
                        "name": name,
                        "mobileNumber": mobileNumber,
                        "email": email,
                        "address": address,
                        "modeOfComm": modeOfComm.toString(),
                        "source": source,
                        "medium": medium,
                        "campaign": campaign,
                        "term": term,
                        "content": content
                    };

                    return $.ajax({
                        url: "https://sm6i8t8xuk.execute-api.us-east-1.amazonaws.com/default/leadform",
                        type: "POST",
                        data: JSON.stringify(element),
                        contentType: "application/json;charset=utf-8",
                        dataType: 'text',
                        success: function (data) {
                            console.log("form submitted.");
                            MM.showThankYouNote();
                            MM.clearFormFields();
                        }
                    });

                }



            }

    };

    window.MM = new e
}(window);

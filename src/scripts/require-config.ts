declare var require: any;
require.config({
    paths: {
        text: "scripts/vendors/text/text",
        "knockout": "scripts/vendors/knockout/knockout-latest",
        "jquery": "scripts/vendors/jquery/jquery.min",
        "bootstrap": "scripts/vendors/bootstrap/bootstrap.min",
        "base-component": "scripts/components/base",
        "all-component": "scripts/components/all",
        "popup-component": "scripts/components/popup/popup",
        "request-step1": "scripts/components/request-step1/request-step1",
        "request-step2": "scripts/components/request-step2/request-step2",
        "radioButton": "scripts/components/radioButton/radioButton",
        "dropDownPopup": "scripts/components/dropDownPopup/dropDownPopup",
        "modal": "scripts/vendors/bootstrap/modal",
    },
    shim: {
        "all-component": {
            deps: ["base-component", "popup-component", "request-step1", "request-step2", "radioButton", "dropDownPopup", "modal"]
        },
        "bootstrap": ["jquery"],
    }
});
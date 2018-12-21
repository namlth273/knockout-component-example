import { RequestViewModel } from "scripts/request/requestViewModel";

require(["knockout", "all-component"], function (ko: any, components: any) {

    class RadioButton implements IRadioOption {
        id: KnockoutObservable<number>;
        value: KnockoutObservable<string>;

        constructor (id: number, value: string){
            var that = this;
            that.id = ko.observable(id);
            that.value = ko.observable(value);
        }
    }

    class HelloViewModel {
        isActive: KnockoutObservable<boolean> = ko.observable(true);
        helloText: KnockoutObservable<string> = ko.observable("Hello!!!");
        triggerStepId: KnockoutObservable<EnumComponentId> = ko.observable(EnumComponentId.Popup);
        windowSize: KnockoutObservable<number> = ko.observable(null);
        isMobile: KnockoutComputed<boolean> = ko.computed(() => {
            return false;
        });
        isModalActive: KnockoutObservable<boolean> = ko.observable(false);
        requestViewModel: KnockoutObservable<RequestViewModel> = ko.observable(new RequestViewModel());
        isChecked: KnockoutObservable<boolean> = ko.observable(false);
        radioOptions: KnockoutObservableArray<RadioButton>;
        activeRadioId: KnockoutObservable<number> = ko.observable(-1);
        isDropDownActive: KnockoutObservable<boolean> = ko.observable(false);
        dropDownTemplate: KnockoutObservable<string> = ko.observable("templateDropDown");

        btnActiveClick: (stepId: EnumComponentId) => void;
        btnDropDownClick: () => void;

        constructor() {
            var that = this;

            that.windowSize($(window).width());

            that.btnActiveClick = (stepId: EnumComponentId) => {
                that.triggerStepId(stepId);
                that.isModalActive(true);
                that.requestViewModel().triggerStepId(stepId);
            }

            that.btnDropDownClick = () => {
                that.isDropDownActive(!that.isDropDownActive());
            }

            $(window).resize(function () {
                that.windowSize($(window).width());
            });

            that.isMobile = ko.computed(() => {
                return that.windowSize() < 992;
            });

            that.radioOptions = ko.observable([
                new RadioButton(1, "option 1"),
                new RadioButton(2, "option 2"),
            ]);
        }
    }

    // ko.bindingHandlers.winsize = {
    //     init: function (element: any, valueAccessor: any) {
    //         var value = valueAccessor();
    //         value($(window).width());

    //         $(window).resize(function () {
    //             var value = valueAccessor();
    //             value($(window).width());
    //         });
    //     }
    // }

    ko.applyBindings(new HelloViewModel());

});
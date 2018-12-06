import { RequestViewModel } from "scripts/request/requestViewModel";

require(["knockout", "all-component"], function (ko: any, components: any) {
    
    class HelloViewModel {
        isActive: KnockoutObservable<boolean> = ko.observable(true);
        helloText: KnockoutObservable<string> = ko.observable("Hello!!!");
        triggerStepId: KnockoutObservable<EnumComponentId> = ko.observable(EnumComponentId.Popup);
        windowSize: KnockoutObservable<number> = ko.observable(null);
        isMobile: KnockoutComputed<boolean> = ko.computed(() => {
            return false;
        });
        isMainModalVisible: KnockoutObservable<boolean> = ko.observable(false);
        requestViewModel: KnockoutObservable<RequestViewModel> = ko.observable(new RequestViewModel());

        btnActiveClick: (stepId: EnumComponentId) => void;

        constructor() {
            var that = this;

            that.windowSize($(window).width());

            that.btnActiveClick = (stepId: EnumComponentId) => {
                //that.requestViewModel().isInEditMode(true);
                that.triggerStepId(stepId);
                that.isMainModalVisible(true);
                that.requestViewModel().triggerStepId(stepId);
            }

            $(window).resize(function () {
                that.windowSize($(window).width());
            });

            that.isMobile = ko.computed(() => {
                return that.windowSize() < 992;
            });
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
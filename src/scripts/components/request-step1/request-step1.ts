import { RequestViewModel } from "scripts/request/requestViewModel";

require(["knockout", "base-component"], function(ko: any) {
    
    interface IRequestStep1Param extends IComponentParamBase {
        request: KnockoutObservable<RequestViewModel>;
    }

    class RequestStep1SelectorViewModel {
        currentStepId: KnockoutObservable<string> = ko.observable(EnumComponentId.Step1);
        isActive: KnockoutComputed<boolean> = ko.computed(() => { return true; });
        templateId: KnockoutObservable<string> = ko.observable("hello from step 1");
        requestViewModel: KnockoutObservable<RequestViewModel> = ko.observable(null);
        step1Click: () => void;
        
        constructor(params: IRequestStep1Param) {
            var that = this;

            if (params.request != null) {
                that.requestViewModel(params.request());
            }

            that.isActive = ko.computed(() => {
                return that.currentStepId() === params.request().triggerStepId();
            });

            that.step1Click = () => {
                that.requestViewModel().triggerStepId(EnumComponentId.Step2);
            }
        }
    }

    class RequestStep1SelectorComponent {
        constructor() {
            return {
                viewModel: RequestStep1SelectorViewModel,
                template: { require: ("text!./scripts/components/request-step1/request-step1.html") }
            };
        }
    }

    ko.components.register("request-step1-selector", new RequestStep1SelectorComponent());

});
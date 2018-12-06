import { RequestViewModel } from "scripts/request/requestViewModel";

require(["knockout"], function(ko: any) {
    
    interface IRequestStep1Param extends IComponentParamBase {
        request: KnockoutObservable<RequestViewModel>;
    }

    class RequestStep1SelectorViewModel {
        currentStepId: KnockoutObservable<string> = ko.observable(EnumComponentId.Step2);
        isActive: KnockoutComputed<boolean> = ko.computed(() => { return true; });
        templateId: KnockoutObservable<string> = ko.observable("hello from step 2");
        requestViewModel: KnockoutObservable<RequestViewModel> = ko.observable(null);
        step2Click: () => void;

        constructor(params: IRequestStep1Param) {
            var that = this;

            that.isActive = ko.computed(() => {
                return that.currentStepId() === params.request().triggerStepId();
            });

            if (params.request != null) {
                that.requestViewModel(params.request());
            }

            that.step2Click = () => {
                that.requestViewModel().triggerStepId(EnumComponentId.Step1);
            }
        }
    }

    class RequestStep1SelectorComponent {
        constructor() {
            return {
                viewModel: RequestStep1SelectorViewModel,
                template: { require: ("text!./scripts/components/request-step2/request-step2.html") }
            };
        }
    }

    ko.components.register("request-step2-selector", new RequestStep1SelectorComponent());

});
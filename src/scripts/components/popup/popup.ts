import { RequestViewModel } from "scripts/request/requestViewModel";

require(["knockout", "base-component"], function(ko: any, baseComponent: any) {
    
    interface IPopupParam extends IComponentParamBase {
        request: KnockoutObservable<RequestViewModel>;
        isModalActive: KnockoutObservable<boolean>;
    }
    
    // class MainModalOption implements IModalOptions {
    //     backdrop: boolean;
    //     keyboard: boolean;
    //     duration: number;
    //     content?: string;
    //     isModalActive: KnockoutObservable<boolean> = ko.observable(false);
    // }

    class PopupSelectorViewModel {
        currentStepId: KnockoutObservable<string> = ko.observable(EnumComponentId.Popup);
        isActive: KnockoutComputed<boolean> = ko.computed(() => { return true; });
        templateId: KnockoutObservable<string> = ko.observable("Go to Step 1");
        requestViewModel: KnockoutObservable<RequestViewModel> = ko.observable(null);
        popupClick: () => void;
        openModalClick: () => void;
        mainModal: KnockoutObservable<Modal> = ko.observable(null);

        constructor(params: IPopupParam) {
            var that = this;

            var option = new MainModalOption();
            option.backdrop = true;
            option.keyboard = true;
            option.duration = 100;
            option.isModalActive = params.isModalActive;
            //option.content = content;

            that.mainModal(new Modal(document.getElementById("exampleModal"), option));

            if (params.request != null) {
                that.requestViewModel(params.request());
            }

            // that.isActive = ko.computed(() => {
            //     return that.currentStepId() === that.requestViewModel().triggerStepId();
            // });

            that.popupClick = () => {
                that.requestViewModel().triggerStepId(EnumComponentId.Step1);
                // that.requestViewModel().isInEditMode(!that.requestViewModel().isInEditMode());
            }

            that.openModalClick = () => {
                if (that.requestViewModel().triggerStepId() == EnumComponentId.Popup)
                    that.requestViewModel().triggerStepId(EnumComponentId.Step1);

                that.mainModal().open();
            }

            if (params.isModalActive())
            {
                that.mainModal().open();
            }
        }
    }

    class PopupSelectorComponent {
        constructor() {
            return {
                viewModel: PopupSelectorViewModel,
                template: { require: ("text!./scripts/components/popup/popup.html") }
            };
        }
    }

    ko.components.register("popup-selector", new PopupSelectorComponent());

});
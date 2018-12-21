require(["knockout", "base-component"], function(ko: any, baseComponent: any) {

    interface IPopupParam extends IComponentParamBase {
        isModalActive: KnockoutObservable<boolean>;
        modalId: KnockoutObservable<string>;
    }

    class CustomPopupViewModel {
        templateId: KnockoutObservable<string> = ko.observable(undefined);
        modalId: KnockoutObservable<string> = ko.observable(undefined);
        modal: KnockoutObservable<Modal> = ko.observable(undefined);

        constructor(params: IPopupParam) {
            var that = this;

            that.modalId = params.modalId;

            var option = new MainModalOption();
            option.isModalActive = params.isModalActive;
            
            that.modal(new Modal(document.getElementById(that.modalId()), option));

            params.isModalActive.subscribe((newValue) => {
                if (newValue) {
                    that.modal().open();
                }
            });
        }
    }

    class CustomPopupSelectorComponent {
        constructor() {
            return {
                viewModel: CustomPopupViewModel,
                template: "<div></div>"
            };
        }
    }

    ko.components.register("custom-popup", new CustomPopupSelectorComponent());

});

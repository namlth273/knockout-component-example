require(["knockout", "base-component"], function(ko: any, baseComponent: any) {

    interface IDropDownPopupParam {
        isActive: KnockoutObservable<boolean>;
    }
    
    class DropDownPopupViewModel {
        helloText: KnockoutObservable<string> = ko.observable("hello from dropdown component");
        isActive: KnockoutComputed<boolean> = ko.computed(() => { return false; });
        
        constructor(params: IDropDownPopupParam) {
            var that = this;

            that.isActive = ko.computed(() => {
                return  params.isActive();
            });
        }
    }

    class DropDownPopupComponent {
        constructor() {
            return {
                viewModel: DropDownPopupViewModel,
                template: { require: ("text!./scripts/components/dropDownPopup/dropDownPopup.html") }
            };
        }
    }

    ko.components.register("dropdown-popup-selector", new DropDownPopupComponent());

});
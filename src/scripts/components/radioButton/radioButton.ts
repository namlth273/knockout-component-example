require(["knockout"], function(ko: any) {
    
    interface IRadioButtonParam {
        isSelected: KnockoutObservable<boolean>;
    }

    class RadioButtonParam implements IRadioButtonParam {
        isSelected: KnockoutObservable<boolean>;
    }
    
    class RadioButtonViewModel {
        isSelected: KnockoutComputed<boolean> = ko.computed(() => { return false; });
        radioClick: () => void;

        constructor(params: IRadioButtonParam) {
            var that = this;
            that.init(params);
        }

        init = (params: IRadioButtonParam) => {
            if (params == null) {
                params = new RadioButtonParam();
                params.isSelected(false);
            }

            this.isSelected = ko.computed(() => {
                return params.isSelected();
            });

            this.radioClick = () => {
                params.isSelected(!params.isSelected());
            }
        }


    }

    class RadioButtonComponent {
        constructor() {
            return {
                viewModel: RadioButtonViewModel,
                template: { require: ("text!./scripts/components/radioButton/radioButton.html") }
            };
        }
    }

    ko.components.register("radio-button-selector", new RadioButtonComponent());

});
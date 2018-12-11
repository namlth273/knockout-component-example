require(["knockout", "base-component"], function (ko: any) {

    interface IRadioButtonParam {
        option: IRadioOption;
        activeRadioId: KnockoutObservable<number>;
    }

    class RadioButtonParam implements IRadioButtonParam {
        option: IRadioOption;
        activeRadioId: KnockoutObservable<number>;
    }

    class RadioButtonViewModel {
        isChecked: KnockoutComputed<boolean> = ko.computed(() => {
            return false;
        });

        radioClick: () => void;

        constructor(params: IRadioButtonParam) {
            var that = this;
            that.init(params);
        }

        init = (params: IRadioButtonParam) => {
            
            this.isChecked = ko.computed(() => {
                return params.activeRadioId() == params.option.id();
            });

            this.radioClick = () => {
                if (!this.isChecked()) {
                    params.activeRadioId(params.option.id());
                }
            }
        }
    }

    class RadioButtonComponent {
        constructor() {
            return {
                viewModel: RadioButtonViewModel,
                template: {
                    require: ("text!./scripts/components/radioButton/radioButton.html")
                }
            };
        }
    }

    ko.components.register("radio-button-selector", new RadioButtonComponent());

});
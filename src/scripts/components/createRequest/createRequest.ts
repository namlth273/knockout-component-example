require(["knockout", "base-component"], function(ko: any, baseComponent: any) {

    class CreateRequestViewModel {
        modalId: KnockoutObservable<string> = ko.observable("createRequestId");
        modalTitle: KnockoutObservable<string> = ko.observable("Create Request");
        isModalActive: KnockoutObservable<boolean> = ko.observable(false);
        popupClick: () => void;

        constructor() {
            var that = this;

            that.popupClick = () => {
                that.isModalActive(!that.isModalActive());
            }
        }
    }

    class CreateRequestComponent {
        constructor() {
            return {
                viewModel: CreateRequestViewModel,
                template: { require: ("text!./scripts/components/createRequest/createRequest.html") }
            };
        }
    }

    ko.components.register("create-request", new CreateRequestComponent());

});

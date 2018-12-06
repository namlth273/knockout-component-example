import * as ko from "knockout";

export class RequestViewModel {
    isInEditMode: KnockoutObservable<boolean> = ko.observable(false);
    clientName: KnockoutObservable<string> = ko.observable("Nam Le");
    clientAddress: KnockoutObservable<string> = ko.observable("Tran Nhan Ton");
    triggerStepId: KnockoutObservable<EnumComponentId> = ko.observable(EnumComponentId.Popup);

    constructor() {

    }
}

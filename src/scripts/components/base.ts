interface IComponentParamBase {
    triggerStepId: KnockoutObservable<EnumComponentId>;
    isActive: KnockoutObservable<boolean>;
}

enum EnumComponentId {
    Popup = "PopupId",
    Step1 = "Step1",
    Step2 = "Step2",
}

interface IRadioOption {
    id: KnockoutObservable<number>;
    value: KnockoutObservable<string>;
}

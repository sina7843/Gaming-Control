type __VLS_Props = {
    modelValue: string;
    label?: string;
    placeholder?: string;
    type?: string;
    icon?: string;
    error?: string | null;
    autocomplete?: string;
};
declare var __VLS_1: {};
type __VLS_Slots = {} & {
    right?: (props: typeof __VLS_1) => any;
};
declare const __VLS_base: import("vue").DefineComponent<__VLS_Props, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {} & {
    "update:modelValue": (v: string) => any;
}, string, import("vue").PublicProps, Readonly<__VLS_Props> & Readonly<{
    "onUpdate:modelValue"?: ((v: string) => any) | undefined;
}>, {
    error: string | null;
    type: string;
    icon: string;
    autocomplete: string;
}, {}, {}, {}, string, import("vue").ComponentProvideOptions, false, {}, any>;
declare const __VLS_export: __VLS_WithSlots<typeof __VLS_base, __VLS_Slots>;
declare const _default: typeof __VLS_export;
export default _default;
type __VLS_WithSlots<T, S> = T & {
    new (): {
        $slots: S;
    };
};

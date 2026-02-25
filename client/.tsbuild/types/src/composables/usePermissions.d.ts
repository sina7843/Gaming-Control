export declare function usePermissions(): {
    isAdmin: import("vue").ComputedRef<boolean>;
    isStaff: import("vue").ComputedRef<boolean>;
    canManagePricing: import("vue").ComputedRef<boolean>;
    canManageDiscount: import("vue").ComputedRef<boolean>;
    canManageResources: import("vue").ComputedRef<boolean>;
    canViewReports: import("vue").ComputedRef<boolean>;
};

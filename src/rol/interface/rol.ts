interface Permission {
  id: string;
  label: string;
}

export interface ModulePermissions {
  [module: string]: Permission[];
}

export interface PermissionsState {
  [permissionId: string]: boolean;
}



import { ROLE_PERMISSIONS } from "./rolePermissions";

export function hasPermission(role, permission) {
  const permissions = ROLE_PERMISSIONS[role];

  if (!permissions) return false;

  return permissions.includes(permission);
}

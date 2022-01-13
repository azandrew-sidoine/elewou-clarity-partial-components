import { appAccessControlList } from './access-control-list';

export const adminAuthorizations = [
  appAccessControlList.create_departments,
  appAccessControlList.update_departments,
  appAccessControlList.delete_departments,
  appAccessControlList.list_departments,
  appAccessControlList.manage_departments,
  appAccessControlList.create_modules,
  appAccessControlList.update_modules,
  appAccessControlList.delete_modules,
  appAccessControlList.list_modules,
  appAccessControlList.create_roles,
  appAccessControlList.update_roles,
  appAccessControlList.delete_roles,
  appAccessControlList.list_roles,
  appAccessControlList.create_organisations,
  appAccessControlList.update_organisations,
  appAccessControlList.delete_organisations,
  appAccessControlList.list_organisations,
];

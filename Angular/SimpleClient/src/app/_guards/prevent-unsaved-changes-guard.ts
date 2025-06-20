// import { inject } from '@angular/core';
// import { CanDeactivateFn } from '@angular/router';
// import { MemberEdit } from '../_components/member/member-edit/member-edit';
// import { ModalService } from '../_services/modal';

// export const preventUnsavedChangesGuard: CanDeactivateFn<MemberEdit> = async (component) => {
//   const modalService = inject(ModalService);

//   if (component.editForm?.dirty) {
//     const result = await modalService.showModal(
//       'Unsaved Changes',
//       'Are you sure you want to leave without saving?',
//       'Yes, Leave',
//       'Cancel'
//     );
//     return result ?? false;
//   }

//   return true;
// };

import { CanDeactivateFn } from '@angular/router';
import { MemberEdit } from '../_components/member/member-edit/member-edit';

export const preventUnsavedChangesGuard: CanDeactivateFn<MemberEdit> = (
  component
) => {
  if (component.editForm?.dirty) {
    return confirm(
      'Are you sure, you want to continue?\nAny unsaved changes will be lost.'
    );
  }
  return true;
};

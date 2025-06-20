import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { catchError } from 'rxjs';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const router = inject(Router);
  const toastr = inject(ToastrService);

  // observerables need pipe to perform RxJs
  return next(req).pipe(
    catchError((error) => {
      // based on the status we need to handle
      switch (error.status) {
        case 400:
          if (error.error.errors) {
            // if it is a validation error
            const modalStateErrors = [];
            for (const key in error.error.errors) {
              if (error.error.errors[key]) {
                modalStateErrors.push(error.error.errors[key]);
              }
            }
            throw modalStateErrors.flat();
          } else {
            toastr.error(error.error, error.status);
          }
          break;
        // for unauthorized error
        case 401:
          toastr.error('Unauthorized', error.status);
          break;
        // for not found error
        case 404:
          router.navigateByUrl('/not-found');
          break;
        // for server error
        case 500:
          const navigationExtras: NavigationExtras = {
            state: { error: error.error },
          };
          router.navigateByUrl('/server-error', navigationExtras);
          break;
        // default block
        default:
          toastr.error('Something unexpected went wrong');
          break;
      }

      // by default the next has to throw errors, if encountered. hence this is the default error.
      throw error;
    })
  );
};

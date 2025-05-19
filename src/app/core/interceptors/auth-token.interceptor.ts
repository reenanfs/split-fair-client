import { HttpInterceptorFn } from '@angular/common/http';
import { fetchAuthSession } from 'aws-amplify/auth';
import { from, switchMap } from 'rxjs';

export const authTokenInterceptor: HttpInterceptorFn = (req, next) => {
  try {
    return from(fetchAuthSession()).pipe(
      switchMap((session) => {
        const token = session.tokens?.idToken;

        if (token) {
          const authReq = req.clone({
            setHeaders: {
              Authorization: `Bearer ${session.tokens?.idToken}`,
            },
          });

          return next(authReq);
        }

        return next(req);
      }),
    );
  } catch {
    return next(req);
  }
};

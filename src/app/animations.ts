import {
   transition,
   trigger,
   query,
   style,
   animate,
   group,
   animateChild
} from '@angular/animations';
export const slideInAnimation =
   trigger('routeAnimations', [
        transition('* => *', [
             style({ position: 'relative' }),
             group([
                  query(':enter',[
                      style({
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        opacity: 0
                      }),
                      animate('0.3s ease-in-out', 
                      style({
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        opacity: 1
                      }))
                  ], {
                    optional: true
                  }),
                  query(':leave', [
                      style({
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        opacity: 1
                      }),
                      animate('0.3s ease-in-out', 
                      style({
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        opacity: 0
                      }))
                  ], {
                    optional: true
                  })
             ])
        ])
]);
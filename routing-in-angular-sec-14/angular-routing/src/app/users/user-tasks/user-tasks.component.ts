import {
  Component,
  input,
  inject,
  computed,
  OnInit,
  DestroyRef,
} from '@angular/core';
import { UsersService } from '../users.service';
import {
  ActivatedRoute,
  RouterLink,
  RouterOutlet,
  ResolveFn,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from '@angular/router';
@Component({
  selector: 'app-user-tasks',
  standalone: true,
  imports: [RouterOutlet, RouterLink],
  templateUrl: './user-tasks.component.html',
  styleUrl: './user-tasks.component.css',
})
export class UserTasksComponent {
  // userId = input.required<string>(); // the url encoded thing will always be string
  userName = input.required<string>();
  message = input.required<string>();
  private usersService = inject(UsersService);
  private activatedRoute = inject(ActivatedRoute); //alternative to input signal function
  private destroyRef = inject(DestroyRef);

  // ngOnInit(): void {
  //accessing route data in components
  //   //An observable of the static and resolved data of this route.
  //   //therefore emits data whenever route data changes.
  //   this.activatedRoute.data.subscribe({
  //     next: (data) => {
  //       console.log('merged data', data);
  //     },
  //   });
}

// userName = computed(() =>
//   this.usersService.users.find((u) => u.id === this.userId())?.name
// );

// ngOnInit(): void {
//   console.log('Input Data:', this.message());
//   console.log(this.activatedRoute);
//   const subscription = this.activatedRoute.paramMap.subscribe({
//     next: (paramMap) => {
//       this.userName =
//         this.usersService.users.find((u) => u.id === paramMap.get('userId'))
//           ?.name || '';
//     },
//   });

//   this.destroyRef.onDestroy(() => subscription.unsubscribe());
// }

//resolver function
export const resolveUserName: ResolveFn<string> = (
  activatedRoute: ActivatedRouteSnapshot,
  routerState: RouterStateSnapshot
) => {
  const usersService = inject(UsersService);
  const userName =
    usersService.users.find(
      (u) => u.id === activatedRoute.paramMap.get('userId')
    )?.name || '';
  return userName;
};

export const resolveTitle: ResolveFn<string> = (
  activatedRoute: ActivatedRouteSnapshot,
  routerState: RouterStateSnapshot
) => {
  return resolveUserName(activatedRoute, routerState) + "'s Tasks";
};

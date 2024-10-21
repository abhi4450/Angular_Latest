import {
  Directive,
  effect,
  input,
  inject,
  TemplateRef,
  ViewContainerRef,
} from '@angular/core';
import { Permission } from './auth.model';
import { AuthService } from './auth.service';
@Directive({
  selector: '[appAuth]',
  standalone: true,
})
export class AuthDirective {
  userType = input.required<Permission>({ alias: 'appAuth' });
  private authService = inject(AuthService);
  private templateRef = inject(TemplateRef); // reference to the template to which this directive was added
  private viewContainerRef = inject(ViewContainerRef); //The view container ref gives you access
  // to the place in the DOM where this directive is being used.
  constructor() {
    effect(() => {
      if (this.authService.activePermission() === this.userType()) {
        this.viewContainerRef.createEmbeddedView(this.templateRef);
      } else {
        this.viewContainerRef.clear();
      }
    }); //we can run some code here whenever signal value changes
  }
}

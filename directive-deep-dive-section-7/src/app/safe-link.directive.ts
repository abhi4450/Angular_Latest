import { Directive, ElementRef, inject, input } from '@angular/core';
import { LogDirective } from './log.directive';

@Directive({
  selector: 'a[appSafeLink]',
  standalone: true, //means you can use it without ngModule directive
  host: {
    '(click)': 'onConfirmLeavePage($event)', // just as with the component decorator,

    // the directive decorator allows us to add attributes

    // or event listeners to the host element

    // that is controlled or enhanced by this directive.

    // So to this anchor element

    // with this attribute here, in this case.
  },
  hostDirectives: [LogDirective],
})
export class SafeLinkDirective {
  queryParam = input('myapp', { alias: 'appSafeLink' }); //default 'myapp'
  private hostElementRef = inject<ElementRef<HTMLAnchorElement>>(ElementRef);
  constructor() {
    console.log('SafeLinkDirective is active!');
  }
  onConfirmLeavePage(event: MouseEvent) {
    const wantsToLeave = window.confirm('Do you want to leave the app!?');
    console.log(wantsToLeave);
    if (wantsToLeave) {
      const address = this.hostElementRef.nativeElement.href;
      this.hostElementRef.nativeElement.href =
        address + '?from=' + this.queryParam();
      return;
      // const address = (event.target as HTMLAnchorElement).href;
      // (event.target as HTMLAnchorElement).href = address + this.queryParam();

      // return;
    }
    event.preventDefault();
  }
}

//if you were building a Directive for a NgModule-based
//Angular application, you'd set "standalone" to "false" and add the directive
// to the "declarations" array of an NgModule(like a component)

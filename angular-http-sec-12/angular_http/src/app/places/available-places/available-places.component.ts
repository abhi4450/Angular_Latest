import { Component, signal, inject, OnInit, DestroyRef } from '@angular/core';

import { Place } from '../place.model';
import { PlacesComponent } from '../places.component';
import { PlacesContainerComponent } from '../places-container/places-container.component';
import { HttpClient } from '@angular/common/http';
import { catchError, map, throwError } from 'rxjs';
import { PlacesService } from '../places.service';
@Component({
  selector: 'app-available-places',
  standalone: true,
  templateUrl: './available-places.component.html',
  styleUrl: './available-places.component.css',
  imports: [PlacesComponent, PlacesContainerComponent],
})
export class AvailablePlacesComponent implements OnInit {
  places = signal<Place[] | undefined>(undefined);
  isFetching = signal(false);
  error = signal('');

  //special service provided by angular to work with http request & responses.
  private httpClient = inject(HttpClient);
  private destroyRef = inject(DestroyRef);
  private placesService = inject(PlacesService);
  // constructor(private httpClient: HttpClient) {}

  //Now get then actually returns an observable
  //you need to subscribe in order to really trigger
  // that request
  ngOnInit() {
    this.isFetching.set(true);
    const subscription = this.placesService.loadAvailablePlaces().subscribe({
      next: (places) => {
        console.log(places);
        this.places.set(places);
      },
      complete: () => {
        this.isFetching.set(false);
      },
      error: (error: Error) => {
        this.error.set(error.message);
      },
    });

    this.destroyRef.onDestroy(() => {
      subscription.unsubscribe();
    });
  }
  onSelectPlace(selectedPlace: Place) {
    const subscription = this.placesService
      .addPlaceToUserPlaces(selectedPlace)
      .subscribe({
        next: (resData) => console.log(resData),
      });
    this.destroyRef.onDestroy(() => {
      subscription.unsubscribe();
    });
  }
}

// export class AvailablePlacesComponent implements OnInit {
//   places = signal<Place[] | undefined>(undefined);
//   isFetching = signal(false);
//   error = signal('');

//   //special service provided by angular to work with http request & responses.
//   private httpClient = inject(HttpClient);
//   private destroyRef = inject(DestroyRef);
//   // constructor(private httpClient: HttpClient) {}

//   //Now get then actually returns an observable
//   //you need to subscribe in order to really trigger
//   // that request
//   ngOnInit() {
//     this.isFetching.set(true);
//     const subscription = this.httpClient
//       .get<{ places: Place[] }>('http://localhost:3000/places')
//       .pipe(
//         map((resData) => resData.places),
//         catchError((error) =>
//           throwError(
//             () =>
//               new Error(
//                 'Something went wrong fetching the available places. Please try again later.'
//               )
//           )
//         )
//       )
//       .subscribe({
//         next: (places) => {
//           console.log(places);
//           this.places.set(places);
//         },
//         complete: () => {
//           this.isFetching.set(false);
//         },
//         error: (error: Error) => {
//           this.error.set(error.message);
//         },
//       });

//     this.destroyRef.onDestroy(() => {
//       subscription.unsubscribe();
//     });
//   }
//   onSelectPlace(selectedPlace: Place) {
//     this.httpClient
//       .put('http://localhost:3000/user-places', {
//         placeId: selectedPlace.id,
//       })
//       .subscribe({
//         next: (resData) => console.log(resData),
//       });
//   }
// }

//when using a module-based approach

// import { NgModule } from '@angular/core';
// import { FormsModule } from '@angular/forms';
// import { provideHttpClient } from '@angular/common/http';

// @NgModule({
//   declarations: [
//     AppComponent,
//     PlacesComponent,

//   ],
//   imports: [BrowserModule, FormsModule],
//   providers: [provideHttpClient()],
//   bootstrap: [AppComponent],
// })
// export class AppModule {}

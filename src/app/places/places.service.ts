import {Injectable} from '@angular/core';
import {IPlace, IPlaceCreate, IPlaceUpdate} from './places.model';
import {AuthService} from "../auth/auth.service";
import {BehaviorSubject, Observable} from "rxjs";
import {delay, map, take, tap} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class PlacesService {
  private _places: BehaviorSubject<IPlace[]> = new BehaviorSubject([
    {
      id: 'p1',
      title: 'Manhattan Mansion',
      description: 'In the heart of New York City.',
      imageURL: 'https://lonelyplanetimages.imgix.net/mastheads/GettyImages-538096543_medium.jpg?sharp=10&vib=20&w=1200',
      price: 149.99,
      availableFrom: new Date('2019-01-01'),
      availableTo: new Date('2019-12-31'),
      userId: 'dd0c1776-e790-45f0-9e25-e1f85711656a'
    },
    {
      id: 'p2',
      title: 'L\'Amour Toujours',
      description: 'A romantic place in Paris!',
      imageURL: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e6/Paris_Night.jpg/1024px-Paris_Night.jpg',
      price: 189.99,
      availableFrom: new Date('2019-01-01'),
      availableTo: new Date('2019-12-31'),
      userId: '19060b2d-7c0a-4a26-8f6b-45344d8b0db7'
    },
    {
      id: 'p3',
      title: 'The Foggy Palace',
      description: 'Not your average city trip!',
      imageURL: 'https://upload.wikimedia.org/wikipedia/commons/0/01/San_Francisco_with_two_bridges_and_the_fog.jpg',
      price: 99.99,
      availableFrom: new Date('2019-01-01'),
      availableTo: new Date('2019-12-31'),
      userId: 'fe1fa495-026b-48e2-ba0d-4b48247ecc24',
    }
  ]);

  get places(): Observable<IPlace[]> {
    return this._places.asObservable();
  }

  constructor(private _authService: AuthService) {
  }

  getPlace(placeId: string): Observable<IPlace> {
    return this.places.pipe(take(1), map(
      (places) => ({...places.find((place) => place.id === placeId)})
    ));
  }

  addPlace(dto: IPlaceCreate) {
    const newPlace: IPlace = {
      ...dto,
      id: Math.random().toString(),
      imageURL: 'https://lonelyplanetimages.imgix.net/mastheads/GettyImages-538096543_medium.jpg?sharp=10&vib=20&w=1200',
      userId: this._authService.userId
    };

    return this.places.pipe(take(1), delay(1000), tap((places) => {
        this._places.next(places.concat(newPlace));
    }));
  }

  updatePlace(placeId: string, dto: IPlaceUpdate) {
    return this.places.pipe(take(1), delay(1000), tap(places => {
      const updatedPlaceIndex = places.findIndex(place => place.id === placeId);
      const updatedPlaces = [...places];
      const oldPlace = {...updatedPlaces[updatedPlaceIndex]};

      updatedPlaces[updatedPlaceIndex] = {
        ...oldPlace,
        title: dto.title,
        description: dto.description
      };

      this._places.next(updatedPlaces);
    }));
  }
}

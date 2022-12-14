import {Injectable} from '@angular/core';
import {IPlace, IPlaceCreate, IPlaceUpdate} from './places.model';
import {AuthService} from "../auth/auth.service";
import {BehaviorSubject, Observable, of, throwError} from "rxjs";
import {map, switchMap, take, tap} from "rxjs/operators";
import {HttpClient} from "@angular/common/http";
import {environment as env} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class PlacesService {
  private _entity = 'offered-places';
  private _postFixURL = '.json';

  private _places: BehaviorSubject<IPlace[]> = new BehaviorSubject([]);

  get places(): Observable<IPlace[]> {
    return this._places.asObservable();
  }

  constructor(private _authService: AuthService, private _http: HttpClient) {
  }

  fetchPlaces() {
    return this._http.get<{ [key: string]: IPlace }>(`${env.api}/${this._entity}${this._postFixURL}`)
      .pipe(
        map((result) => {
          const places = [];
          for (const key in result) {
            if (result.hasOwnProperty(key)) {
              const item: IPlace = {
                ...result[key],
                id: key,
              };
              places.push(item);
            }
          }
          return places;
        }),
        tap(places => {
          this._places.next(places);
        })
      );
  }

  getPlace(placeId: string): Observable<IPlace> {
    return this._http.get(`${env.api}/${this._entity}/${placeId}${this._postFixURL}`)
      .pipe(switchMap(place => place ? of(({...place, id: placeId}) as IPlace) : throwError(null)));
  }

  addPlace(dto: IPlaceCreate) {
    const newPlace: IPlace = {
      ...dto,
      id: Math.random().toString(),
      imageURL: 'https://lonelyplanetimages.imgix.net/mastheads/GettyImages-538096543_medium.jpg?sharp=10&vib=20&w=1200',
      userId: this._authService.userId
    };

    return this._http.post<{ name: string }>(`${env.api}/${this._entity}${this._postFixURL}`, {
      ...newPlace,
      id: null
    })
      .pipe(
        switchMap((result) => {
          newPlace.id = result.name;
          return this.places;
        }),
        take(1),
        tap((places) => {
          this._places.next(places.concat(newPlace));
        })
      );
  }

  updatePlace(placeId: string, dto: IPlaceUpdate) {
    let updatedPlaces: IPlace[];
    return this.places.pipe(
      take(1),
      switchMap((places) => {
        if (!places || places.length <= 0) {
          return this.fetchPlaces();
        } else {
          return of(places);
        }
      }),
      switchMap((places) => {
        const updatedPlaceIndex = places.findIndex(place => place.id === placeId);
        const updatedPlaces = [...places];
        const oldPlace = {...updatedPlaces[updatedPlaceIndex]};

        updatedPlaces[updatedPlaceIndex] = {
          ...oldPlace,
          title: dto.title,
          description: dto.description
        };

        console.log({...updatedPlaces[updatedPlaceIndex], id: null});

        return this._http.put(
          `${env.api}/${this._entity}/${placeId}${this._postFixURL}`,
          {...updatedPlaces[updatedPlaceIndex], id: null}
        );
      }),
      tap(() => {
        this._places.next(updatedPlaces);
      })
    );
  }
}

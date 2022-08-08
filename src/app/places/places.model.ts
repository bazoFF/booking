export interface IPlace {
  id: string;
  title: string;
  description: string;
  imageURL: string;
  price: number;
  availableFrom: Date;
  availableTo: Date;
  userId: string;
}

export interface IPlaceCreate {
  title: string;
  description: string;
  price: number;
  availableFrom: Date;
  availableTo: Date;
}

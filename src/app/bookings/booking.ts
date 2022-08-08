export interface IBooking {
  id: string;
  placeId: string;
  userId: string;
  placeTitle: string;
  placeImage: string;
  firstName: string;
  lastName: string;
  guestNumber: number;
  bookedFrom: Date;
  bookedTo: Date;
}

export interface IBookingCreate extends IBookingStartCreate {
  placeId: string;
  placeTitle: string;
  placeImage: string;
}

export interface IBookingStartCreate {
  firstName: string;
  lastName: string;
  guestNumber: number;
  dateFrom: Date;
  dateTo: Date;
}

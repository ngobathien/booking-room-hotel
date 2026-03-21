export interface Hotel {
  _id?: string;
  name: string;
  phone: string;
  email: string;
  address: string;
  description?: string;
  policy?: string;
  images: string[];
}

export type CreateHotelDto = Omit<Hotel, "_id">;
export type UpdateHotelDto = Partial<CreateHotelDto>;

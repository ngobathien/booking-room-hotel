export interface Amenity {
  _id: string;
  name: string;
}

export interface AmenityContextType {
  amenities: Amenity[];
  loading: boolean;
  fetchAmenities: () => Promise<void>;
  createAmenity: (name: string) => Promise<Amenity>;
  updateAmenity: (id: string, name: string) => Promise<Amenity>;
  deleteAmenity: (id: string) => Promise<void>;
}

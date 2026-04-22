export interface Amenity {
  _id: string;
  name: string;
  icon?: string;
}

export interface AmenityContextType {
  amenities: Amenity[];
  loading: boolean;
  fetchAmenities: () => Promise<void>;
  createAmenity: (name: string, icon?: string) => Promise<Amenity>;
  updateAmenity: (id: string, name: string, icon?: string) => Promise<Amenity>;
  deleteAmenity: (id: string) => Promise<void>;
}

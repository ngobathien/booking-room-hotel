// src/hooks/useAmenitiesAction.ts
import { useState, useEffect } from "react";
import type { Amenity } from "../../types/amenity.types";
import * as AmenityAPI from "../../common/services/amenities.service";

export const useAmenitiesAction = () => {
  const [amenities, setAmenities] = useState<Amenity[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchAmenities = async () => {
    setLoading(true);
    try {
      const data = await AmenityAPI.getAllAmenities();
      setAmenities(data);
    } finally {
      setLoading(false);
    }
  };

  const addAmenity = async (name: string) => {
    const newAmenity = await AmenityAPI.createAmenity({ name });
    setAmenities((prev) => [...prev, newAmenity]);
  };

  const editAmenity = async (id: string, name: string) => {
    const updated = await AmenityAPI.updateAmenity(id, { name });
    setAmenities((prev) => prev.map((a) => (a._id === id ? updated : a)));
  };

  const removeAmenity = async (id: string) => {
    await AmenityAPI.deleteAmenity(id);
    setAmenities((prev) => prev.filter((a) => a._id !== id));
  };

  useEffect(() => {
    fetchAmenities();
  }, []);

  return {
    amenities,
    loading,
    fetchAmenities,
    addAmenity,
    editAmenity,
    removeAmenity,
  };
};

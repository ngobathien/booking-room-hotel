export interface Review {
  _id: string;
  userId: {
    _id: string;
    fullName: string;
    avatar?: string;
  };
  roomId: string;
  rating: number;
  comment: string;
  createdAt: string;
}

export interface CreateReviewPayload {
  roomId: string;
  rating: number;
  comment: string;
}

export interface ReviewAverage {
  avgRating: number;
  total: number;
}

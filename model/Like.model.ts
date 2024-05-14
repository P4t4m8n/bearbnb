export interface WishListModel {
  id: string;
  notes: string;
  stay: {
    stayId: string;
    name: string;
    type: string;
    image: string;
    bedrooms: { beds: string[] }[];
    description: string;
    location: {
      city: string;
      country: string;
    };
    rating: number;
  };
}

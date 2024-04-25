export interface Image {
    id: string;
    url: string;
    stayId: string;
}

export interface Amenity {
    id: string;
    name: string;
}

export interface Label {
    id: string;
    name: string;
}

export interface User {
    id: string;
    fullname: string;
    email: string;
    imgUrl: string;
    stays: Stay[];
    reviews: Review[];
    likes: Like[];
}

export interface Location {
    id: string;
    country: string;
    countryCode: string;
    city: string;
    address: string;
    lat: number;
    lng: number;
    stay?: Stay;
}

export interface Review {
    id: string;
    text: string;
    rate: number;
    userId: string;
    user: User;
    stayId: string;
    stay: Stay;
}

export interface Like {
    id: string;
    userId: string;
    user: User;
    stayId: string;
    stay: Stay;
}

export interface Stay {
    id: string;
    name: string;
    type: string;
    images: Image[];
    price: number;
    summary: string;
    capacity: number;
    amenities: Amenity[];
    labels: Label[];
    hostId: string;
    host: User;
    locationId: string;
    location: Location;
    reviews: Review[];
    likes: Like[];
    rating: number;
}

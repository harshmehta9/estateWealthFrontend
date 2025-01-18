export interface PriceRange {
  bhk: string;
  price: number;
  _id: string;
}

export interface Configuration {
  bhk: string;
  carpetArea: number;
  _id: string;
}

export interface PricingDetail {
  carpetArea: number;
  totalPrice: number;
  downPayment: number;
  parking: number;
  unitPlanImage: string;
  _id: string;
}

export interface FAQ {
  question: string;
  answer: string;
  _id: string;
}

export interface Property {
  _id: string;
  name: string;
  location: {
    address: string;
    googleMapLink: string;
  };
  possession: {
    target: string;
    reraPossession: string;
  };
  prosAndCons: {
    pros: string[];
    cons: string[];
  };
  priceRange: PriceRange[];
  images: string[];
  landParcel: number;
  towers: number;
  configurations: Configuration[];
  reraNumbers: string[];
  about: string;
  videoLink: string;
  internalAmenities: string[];
  externalAmenities: string[];
  masterPlanImage: string;
  floorPlanImage: string;
  pricingDetails: PricingDetail[];
  paymentScheme: string;
  offer: string;
  faqs: FAQ[];
}
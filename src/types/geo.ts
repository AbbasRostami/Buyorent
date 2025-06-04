export type POIType =
  | "subway_entrance"
  | "bus_station"
  | "supermarket"
  | "school"
  | "hospital"
  | "pharmacy"
  | "bank"
  | "restaurant"
  | "cafe"
  | "parking"
  | "police"
  | "fire_station"
  | "post_office"
  | "university"
  | "library"
  | "museum";

export interface POIQueryConfig {
  key: string;
  value: string;
  type: POIType;
}

export interface POIDisplay {
  type: POIType;
  icon: string;
  label: string;
}

export const POI_QUERY_CONFIGS: POIQueryConfig[] = [
  { key: "railway", value: "subway_entrance", type: "subway_entrance" },
  { key: "amenity", value: "bus_station", type: "bus_station" },
  { key: "amenity", value: "supermarket", type: "supermarket" },
  { key: "amenity", value: "school", type: "school" },
  { key: "amenity", value: "hospital", type: "hospital" },
  { key: "amenity", value: "pharmacy", type: "pharmacy" },
  { key: "amenity", value: "bank", type: "bank" },
  { key: "amenity", value: "restaurant", type: "restaurant" },
  { key: "amenity", value: "cafe", type: "cafe" },
  { key: "amenity", value: "parking", type: "parking" },
  { key: "amenity", value: "police", type: "police" },
  { key: "amenity", value: "fire_station", type: "fire_station" },
  { key: "amenity", value: "post_office", type: "post_office" },
  { key: "amenity", value: "university", type: "university" },
  { key: "amenity", value: "library", type: "library" },
  { key: "amenity", value: "museum", type: "museum" },
];

export const POI_DISPLAY_CONFIG: Record<POIType, POIDisplay> = {
  subway_entrance: {
    type: "subway_entrance",
    icon: "🚇",
    label: "ایستگاه مترو",
  },
  bus_station: {
    type: "bus_station",
    icon: "🚌",
    label: "ایستگاه اتوبوس",
  },
  supermarket: {
    type: "supermarket",
    icon: "🛒",
    label: "سوپرمارکت",
  },
  school: {
    type: "school",
    icon: "🏫",
    label: "مدرسه",
  },
  hospital: {
    type: "hospital",
    icon: "🏥",
    label: "بیمارستان",
  },
  pharmacy: {
    type: "pharmacy",
    icon: "💊",
    label: "داروخانه",
  },
  bank: {
    type: "bank",
    icon: "🏦",
    label: "بانک",
  },
  restaurant: {
    type: "restaurant",
    icon: "🍽️",
    label: "رستوران",
  },
  cafe: {
    type: "cafe",
    icon: "☕",
    label: "کافه",
  },
  parking: {
    type: "parking",
    icon: "🅿️",
    label: "پارکینگ",
  },
  police: {
    type: "police",
    icon: "👮",
    label: "کلانتری",
  },
  fire_station: {
    type: "fire_station",
    icon: "🚒",
    label: "ایستگاه آتش‌نشانی",
  },
  post_office: {
    type: "post_office",
    icon: "📮",
    label: "دفتر پست",
  },
  university: {
    type: "university",
    icon: "🎓",
    label: "دانشگاه",
  },
  library: {
    type: "library",
    icon: "📚",
    label: "کتابخانه",
  },
  museum: {
    type: "museum",
    icon: "🏛️",
    label: "موزه",
  },
};

export interface Coordinates {
  lat: number;
  lon: number;
}

export interface POI {
  name: string;
  distance: number;
  walkingTime: number;
  type: POIType;
}

export interface NearbyPOIsProps {
  address: string;
}

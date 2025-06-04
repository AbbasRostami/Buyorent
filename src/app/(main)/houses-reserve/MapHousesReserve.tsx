"use client";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-routing-machine";
import "leaflet-routing-machine/dist/leaflet-routing-machine.css";
import L from "leaflet";
import { useState, useEffect, useRef } from "react";
import { IoLocationOutline, IoSearchOutline } from "react-icons/io5";
import toast from "react-hot-toast";

import { renderToStaticMarkup } from "react-dom/server";
import { GiPositionMarker } from "react-icons/gi";
import { useTheme } from "next-themes";
import { HouseReserveProps } from "@/types/HousesReserve";
import Link from "next/link";
import Image from "next/image";
import { FaLocationCrosshairs } from "react-icons/fa6";

// Create a function to generate custom icon for each property
const createCustomIcon = (imageUrl: string) => {
  const iconMarkup = renderToStaticMarkup(
    <div className="relative">
      <Image
        unoptimized
        src={imageUrl || <FaLocationCrosshairs size={20} />}
        alt="property"
        width={50}
        height={50}
        className="w-20 h-20 rounded-full object-cover border-2 border-white shadow-lg"
        style={{ objectFit: "cover", width: "100%", height: "100%" }}
      />
    </div>
  );

  return new L.DivIcon({
    html: iconMarkup,
    className: "",
    iconSize: [40, 40],
    iconAnchor: [20, 40],
  });
};

delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
});

// Create default marker icon
const defaultIcon = new L.Icon({
  iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png",
  shadowUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

function FlyToLocation({ position }: { position: [number, number] }) {
  const map = useMap();
  useEffect(() => {
    if (
      Array.isArray(position) &&
      position.length === 2 &&
      typeof position[0] === "number" &&
      typeof position[1] === "number" &&
      position[0] !== 0 &&
      position[1] !== 0
    ) {
      map.flyTo(position, 13);
    }
  }, [position, map]);

  return null;
}

interface SearchResult {
  display_name: string;
  lat: string;
  lon: string;
}

function RoutingMachine({
  start,
  end,
}: {
  start: [number, number];
  end: [number, number];
}) {
  const map = useMap();
  const routingControlRef = useRef<L.Routing.Control | null>(null);

  useEffect(() => {
    if (!map) return;

    if (routingControlRef.current) {
      try {
        map.removeControl(routingControlRef.current);
      } catch (error) {
        console.log("Error removing routing control:", error);
      }
      routingControlRef.current = null;
    }

    const routingControl = L.Routing.control({
      waypoints: [L.latLng(start[0], start[1]), L.latLng(end[0], end[1])],
      routeWhileDragging: false,
      showAlternatives: false,
      fitSelectedRoutes: true,
      lineOptions: {
        styles: [{ color: "#0000FF", weight: 5, opacity: 0.8 }],
        extendToWaypoints: true,
        missingRouteTolerance: 0,
      },
      show: false,
      createMarker: function () {
        return null; // Disable default markers
      },
    }).addTo(map);

    routingControlRef.current = routingControl;

    routingControl.on("routeselected", function (e) {
      const bounds = L.latLngBounds(e.route.coordinates);
      map.fitBounds(bounds, { padding: [50, 50] });
    });

    return () => {
      if (routingControlRef.current) {
        try {
          map.removeControl(routingControlRef.current);
        } catch (error) {
          console.log("Error cleaning up routing control:", error);
        }
        routingControlRef.current = null;
      }
    };
  }, [map, start, end]);

  return null;
}

export default function MapHousesReserve({
  data,
}: {
  data: HouseReserveProps[];
}) {
  const [userLocation, setUserLocation] = useState<[number, number]>();
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [selectedLocation, setSelectedLocation] = useState<
    [number, number] | null
  >(null);
  const [showSearchResults, setShowSearchResults] = useState(false);
  const [distances, setDistances] = useState<
    { id: string; distance: number }[]
  >([]);
  const [selectedProperty, setSelectedProperty] = useState<string | null>(null);

  const isInIran = (lat: number, lng: number) => {
    return lat > 25.0 && lat < 39.5 && lng > 44.0 && lng < 63.5;
  };

  const handleLocateUser = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const { latitude, longitude } = pos.coords;
          console.log("موقعیت واقعی:", latitude, longitude);

          if (isInIran(latitude, longitude)) {
            setUserLocation([latitude, longitude]);
          } else {
            toast.error("موقعیت شما خارج از ایران تشخیص داده شد!");
            setUserLocation([36.5633, 53.0601]);
          }
        },
        (err) => {
          console.error("خطا:", err);
          alert("خطا در دریافت موقعیت!");
        },
        {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 0,
        }
      );
    }
  };

  const handleSearch = async () => {
    if (!searchQuery.trim()) {
      setShowSearchResults(false);
      return;
    }

    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
          searchQuery
        )}&countrycodes=ir&limit=7`,
        {
          headers: {
            Accept: "application/json",
            "User-Agent": "NextLevelApp/1.0",
          },
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log("Search results:", data);

      if (Array.isArray(data) && data.length > 0) {
        setSearchResults(data);
        setShowSearchResults(true);
      } else {
        setSearchResults([]);
        setShowSearchResults(false);
        toast.error("نتیجه‌ای یافت نشد");
      }
    } catch (error) {
      console.error("Search error:", error);
      setSearchResults([]);
      setShowSearchResults(false);
      toast.error("خطا در جستجوی موقعیت");
    }
  };

  const calculateDistance = (
    lat1: number,
    lon1: number,
    lat2: number,
    lon2: number
  ) => {
    const R = 6371; // Radius of the earth in km
    const dLat = deg2rad(lat2 - lat1);
    const dLon = deg2rad(lon2 - lon1);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(deg2rad(lat1)) *
        Math.cos(deg2rad(lat2)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c;
    return distance;
  };

  const deg2rad = (deg: number) => {
    return deg * (Math.PI / 180);
  };

  const handleSelectLocation = (result: SearchResult) => {
    const newLocation: [number, number] = [
      parseFloat(result.lat),
      parseFloat(result.lon),
    ];
    setSelectedLocation(newLocation);
    setShowSearchResults(false);
    setSearchQuery(result.display_name);
    setSelectedProperty(null);

    const newDistances = data.map((property) => ({
      id: property.id,
      distance: calculateDistance(
        parseFloat(result.lat),
        parseFloat(result.lon),
        property.location.lat,
        property.location.lng
      ),
    }));
    setDistances(newDistances);
  };

  const handlePropertyClick = (
    propertyId: string,
    propertyLocation: [number, number]
  ) => {
    if (selectedLocation) {
      setSelectedProperty(propertyId);
    }
  };

  // Add debounce for search
  useEffect(() => {
    const timer = setTimeout(() => {
      if (searchQuery.trim()) {
        handleSearch();
      } else {
        setSearchResults([]);
        setShowSearchResults(false);
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [searchQuery]);

  const defaultCenter: [number, number] =
    data?.length > 0
      ? [data[0].location.lat, data[0].location.lng]
      : [36.5633, 53.0601];
  const { theme } = useTheme();
  const tileLayerUrl =
    theme === "dark"
      ? "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
      : "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";

  return (
    <div className="relative w-full h-full">
      <div className="absolute z-[1000] top-4 right-4 flex flex-col gap-2">
        <button
          onClick={handleLocateUser}
          className="flex gap-2 text-black font-medium dark:bg-gray-800 dark:text-amber-50 bg-white p-2 rounded-full shadow-lg hover:shadow-xl transition-all w-fit"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 text-[#E89300]"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
            />
          </svg>
          دریافت موقعیت من
        </button>

        <div className="relative w-64">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              if (!e.target.value.trim()) {
                setShowSearchResults(false);
              }
            }}
            placeholder="جستجوی موقعیت..."
            className="w-full px-4 py-2 rounded-full shadow-lg border border-gray-200 dark:bg-gray-800 dark:text-white dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-[#E89300] bg-white"
          />
          <button
            onClick={handleSearch}
            className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-500 hover:text-[#E89300]"
          >
            <IoSearchOutline size={20} />
          </button>
        </div>

        {showSearchResults && searchResults.length > 0 && (
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg mt-1 max-h-60 overflow-y-auto z-[1001] w-64">
            {searchResults.map((result, index) => (
              <button
                key={index}
                onClick={() => handleSelectLocation(result)}
                className="w-full px-4 py-2 text-right hover:bg-gray-100 dark:hover:bg-gray-700 text-sm border-b border-gray-100 dark:border-gray-700 last:border-b-0"
              >
                {result.display_name}
              </button>
            ))}
          </div>
        )}
      </div>

      <MapContainer
        center={selectedLocation || defaultCenter}
        zoom={selectedLocation ? 13 : 6}
        className="h-full w-full dark:bg-gray-800 dark:invert dark:hue-rotate-180"
        key={userLocation?.join(",") || "default-map"}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          maxZoom={20}
        />

        {data?.map((property) => (
          <Marker
            key={property.id}
            icon={createCustomIcon(property?.photos?.[0])}
            position={[property.location.lat, property.location.lng]}
            eventHandlers={{
              click: () =>
                handlePropertyClick(property.id, [
                  property.location.lat,
                  property.location.lng,
                ]),
            }}
          >
            <Popup className="custom-popup">
              <Link
                href={`/mortgage-and-house-rent/${property.id}`}
                className="popup-inner"
              >
                <div className="w-[270px] bg-gradient-to-r from-[#cf9952] to-[#E89300] backdrop-blur-sm rounded-xl p-3 flex items-center gap-3 shadow-lg border border-white/20">
                  <div className="relative shrink-0">
                    <img
                      src={
                        property?.photos?.[0] ||
                        "https://via.placeholder.com/64x64?text=%3A)"
                      }
                      alt={property.title}
                      className="w-14 h-14 rounded-full object-cover border-2 border-white shadow-md"
                    />
                    <div className="absolute -bottom-1 -right-1 bg-red-600 text-white text-xs px-1.5 py-0.5 rounded-full shadow-sm">
                      ٪5
                    </div>
                  </div>

                  <div className="flex flex-col justify-between w-full text-white overflow-hidden">
                    <h3 className="font-bold text-lg truncate">
                      {property.title}
                    </h3>

                    <div className="flex items-center gap-1 text-sm text-white/90 mb-1">
                      <IoLocationOutline size={18} />
                      <span className="truncate whitespace-nowrap">
                        {property.address}
                      </span>
                    </div>

                    {selectedLocation && (
                      <div className="text-sm text-white/90 mb-1">
                        فاصله:{" "}
                        {distances
                          .find((d) => d.id === property.id)
                          ?.distance.toFixed(1)}{" "}
                        کیلومتر
                      </div>
                    )}

                    <div className="flex justify-center gap-1 items-baseline text-sm font-semibold">
                      <div className="flex items-baseline gap-1">
                        <span className="text-white">
                          {property.price?.toLocaleString()}
                        </span>
                      </div>
                      <span className="text-white dark:text-amber-50 text-xs">
                        تومان
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            </Popup>
          </Marker>
        ))}

        {selectedLocation && selectedProperty && (
          <>
            <RoutingMachine
              start={selectedLocation}
              end={[
                data.find((p) => p.id === selectedProperty)?.location.lat || 0,
                data.find((p) => p.id === selectedProperty)?.location.lng || 0,
              ]}
            />
            <Marker position={selectedLocation} icon={defaultIcon}>
              <Popup className="custom-popup">
                <div className="w-[200px] bg-gradient-to-r from-blue-500 to-blue-600 backdrop-blur-sm rounded-xl p-3 flex flex-col items-center gap-2 shadow-lg border border-white/20">
                  <div className="flex items-center gap-2 text-white">
                    <IoLocationOutline size={20} className="text-blue-200" />
                    <span className="font-medium">موقعیت انتخاب شده</span>
                  </div>
                  <div className="w-full h-[1px] bg-white/20"></div>
                  <div className="text-sm text-blue-100 text-center">
                    {searchQuery}
                  </div>
                </div>
              </Popup>
            </Marker>
            <Marker
              position={[
                data.find((p) => p.id === selectedProperty)?.location.lat || 0,
                data.find((p) => p.id === selectedProperty)?.location.lng || 0,
              ]}
              icon={createCustomIcon(
                data.find((p) => p.id === selectedProperty)?.photos?.[0] || ""
              )}
            >
              <Popup>
                <div className="text-center font-semibold text-lg text-blue-600">
                  مقصد
                </div>
              </Popup>
            </Marker>
          </>
        )}

        {userLocation && (
          <>
            <Marker position={userLocation} icon={defaultIcon}>
              <Popup className="text-center font-semibold text-lg text-blue-600 bg-white shadow-lg rounded-lg border border-gray-200">
                <span className="text-xl font-medium p-4 ">
                  🎯 موقعیت فعلی شما{" "}
                </span>
              </Popup>
            </Marker>
            <FlyToLocation position={userLocation} />
          </>
        )}
      </MapContainer>
    </div>
  );
}

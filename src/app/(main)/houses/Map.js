"use client";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { useState, useEffect } from "react";
import { IoLocationOutline } from "react-icons/io5";
import toast from "react-hot-toast";

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

function FlyToLocation({ position }) {
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

export default function Map({ properties }) {
  const [userLocation, setUserLocation] = useState(null);
  const isInIran = (lat, lng) => {
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
  return (
    <div className="relative w-full h-full">
      <button
        onClick={handleLocateUser}
        className="absolute z-[1000] flex gap-2 top-4 right-4 text-black font- bg-white p-2 rounded-full shadow-lg hover:shadow-xl transition-all"
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

      <MapContainer
        center={[36.5633, 53.0601]}
        zoom={5}
        className="h-full w-full"
        key={userLocation?.join(",") || "default-map"}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {properties.map((property) => (
          <Marker
            key={property.id}
            position={[
              property.location_coords?.lat || 0,
              property.location_coords?.lng || 0,
            ]}
          >
            <Popup>
              <div className="w-[295px] h-[106px] bg-gradient-to-r from-[#cf9952] to-[#E89300]  backdrop-blur-sm rounded-[16px] flex items-center p-3 text-white gap-3 shadow-xl border border-white/20">
                <div className="relative">
                  <img
                    src={property.image || "https://via.placeholder.com/80"}
                    alt={property.title}
                    className="w-16 h-16 rounded-full object-cover border-2 border-white shadow-sm"
                  />
                  {property.discountPercent && (
                    <div className="absolute -bottom-1 -right-1 bg-red-500 text-xs px-2 py-0.5 rounded-full">
                      ٪{property.discountPercent}
                    </div>
                  )}
                </div>

                <div className="flex flex-col justify-between h-full flex-1">
                  <div>
                    <h3 className="font-bold text-2xl truncate mb-1 text-white/90">
                      {property.title}
                    </h3>
                    <div className="flex items-center gap-1 text-xs text-white/80">
                      <IoLocationOutline size={23} className="shrink-0" />
                      <span className="truncate font-medium text-lg">
                        {property.location}
                      </span>
                    </div>
                  </div>

                  {/* قیمت و جزئیات */}
                  <div className="space-y-1">
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex items-baseline gap-1">
                        <span className="text-medium font-bold line-through opacity-75">
                          {property.oldPrice?.toLocaleString()}
                        </span>
                        <span className="text-medium font-bold">
                          {property.price?.toLocaleString()}
                        </span>
                      </div>
                      <span className="text-medium font-bold">تومان</span>
                    </div>
                  </div>
                </div>
              </div>
            </Popup>
          </Marker>
        ))}

        {userLocation && (
          <>
            <Marker position={userLocation}>
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

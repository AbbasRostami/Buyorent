"use client";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { useState, useEffect } from "react";
import { IoLocationOutline } from "react-icons/io5";
import toast from "react-hot-toast";

import { renderToStaticMarkup } from "react-dom/server";
import { GiPositionMarker } from "react-icons/gi";
import { useTheme } from "next-themes";

const iconMarkup = renderToStaticMarkup(
  <GiPositionMarker size={30} color="red" />
);
const customIcon = new L.DivIcon({
  html: iconMarkup,
  className: "",
  iconSize: [30, 30],
  iconAnchor: [15, 30],
});

function FlyToLocation() {
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

export default function MapHousesReserve({ data }) {
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

  const defaultCenter =
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
      <button
        onClick={handleLocateUser}
        className="absolute z-[1000] flex gap-2 top-4 right-4 text-black font-medium dark:bg-gray-800 dark:text-amber-50 bg-white p-2 rounded-full shadow-lg hover:shadow-xl transition-all"
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
        center={defaultCenter}
        zoom={6}
        className="h-full w-full"
        key={userLocation?.join(",") || "default-map"}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url={tileLayerUrl}
        />
        {data?.map((property) => (
          <Marker
            key={property.id}
            icon={customIcon}
            position={[property.location.lat, property.location.lng]}
          >
            <Popup className="custom-popup">
              <div className="popup-inner">
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
                    {property.discountPercent && (
                      <div className="absolute -bottom-1 -right-1 bg-red-600 text-white text-xs px-1.5 py-0.5 rounded-full shadow-sm">
                        ٪{property.discountPercent}
                      </div>
                    )}
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

                    <div className="flex justify-center gap-3 items-baseline text-sm font-semibold">
                      <div className="flex items-baseline gap-1">
                        {property.oldPrice && (
                          <span className="line-through opacity-70 text-xs">
                            {property.oldPrice.toLocaleString()}
                          </span>
                        )}
                        <span className="text-white">
                          {property.price?.toLocaleString()}
                        </span>
                      </div>
                      <span className="text-white text-xs">تومان</span>
                    </div>
                  </div>
                </div>
              </div>
            </Popup>
          </Marker>
        ))}

        {userLocation && (
          <>
            <Marker position={userLocation} icon={customIcon}>
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

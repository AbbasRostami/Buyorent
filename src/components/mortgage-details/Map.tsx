"use client";
import React from "react";
import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import { renderToStaticMarkup } from "react-dom/server";
import { GiPositionMarker } from "react-icons/gi";
import Image from "next/image";
import image from "../../assets/Avatar2.png";
import { IoLocationOutline } from "react-icons/io5";
import { MotionButton } from "../../utils/providers/MotionWrapper";

const iconMarkup = renderToStaticMarkup(
  <GiPositionMarker size={40} color="blue" />
);
const customIcon = new L.DivIcon({
  html: iconMarkup,
  className: "",
  iconSize: [30, 30],
  iconAnchor: [15, 30],
});

const MapSingleReserve = ({ data }: any) => {
  const position: [number, number] = data.location;

  return (
    <div className="relative rounded-2xl overflow-hidden z-0 w-full h-72">
      <MotionButton
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 2.4 }}
        className="text-lg font-bold border mb-4 border-color2 px-4 py-2 rounded-full text-color1"
      >
        موقعیت مکانی
      </MotionButton>
      <MapContainer
        center={position}
        zoom={15}
        scrollWheelZoom={true}
        className="h-full w-full"
      >
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={position} icon={customIcon}>
          <Popup>
            <div className="w-[295px] h-[106px] overflow-hidden bg-gradient-to-r from-[#cf9952] to-[#E89300] backdrop-blur-sm rounded-[16px] flex items-center p-3 text-white gap-3 shadow-xl border border-white/20">
              <div className="relative shrink-0">
                <Image
                  src={data?.photos?.[0] || image}
                  alt="هتل"
                  width={64}
                  height={64}
                  className="w-16 h-16 rounded-full object-cover border-2 border-white shadow-sm"
                />
                <div className="absolute -bottom-1 -right-1 bg-red-500 text-sm px-2 py-0.5 rounded-full">
                  % {data?.rooms}
                </div>
              </div>

              <div className="flex flex-col justify-between h-full flex-1">
                <div>
                  <h3 className="font-bold text-2xl mb-1 text-white/90 truncate w-full max-w-[170px]">
                    {data?.title}
                  </h3>
                  <div className="flex items-center gap-1 text-xs text-white/80">
                    <IoLocationOutline size={23} className="shrink-0" />
                    <span className="truncate overflow-hidden text-ellipsis">
                      {data?.address}
                    </span>
                  </div>
                </div>

                <div className="space-y-1">
                  <div className="flex items-center justify-center gap-1">
                    <div className="flex items-baseline gap-1">
                      <span className="text-medium font-bold line-through opacity-75">
                        ۲,۵۰۰,۰۰۰
                      </span>
                      <span className="text-medium font-bold">
                        {Number(data?.price)
                          .toLocaleString("en-US")
                          .replace(/\d/g, (d) => "۰۱۲۳۴۵۶۷۸۹"[+d])}
                      </span>
                    </div>
                    <span className="text-medium font-bold">تومان</span>
                  </div>
                </div>
              </div>
            </div>
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
};

export default MapSingleReserve;

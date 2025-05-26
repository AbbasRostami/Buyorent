import { Field, ErrorMessage, useFormikContext } from "formik";
import { useEffect, useRef, useState } from "react";
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import toast from "react-hot-toast";
import { renderToStaticMarkup } from "react-dom/server";
import { GiPositionMarker } from "react-icons/gi";
import L from "leaflet";
import { FaLocationPinLock, FaMapLocationDot } from "react-icons/fa6";

const iconMarkup = renderToStaticMarkup(
  <GiPositionMarker size={30} color="red" />
);
const customIcon = new L.DivIcon({
  html: iconMarkup,
  className: "",
  iconSize: [30, 30],
  iconAnchor: [15, 30],
});

const defaultPosition: [number, number] = [36.5659, 53.0586];

function LocationMarker({
  onMapPick,
}: {
  onMapPick: (lat: number, lng: number) => void;
}) {
  const { setFieldValue, values } = useFormikContext<any>();
  const markerRef = useRef<any>(null);

  useMapEvents({
    click(e) {
      setFieldValue("location", [e.latlng.lat, e.latlng.lng]);
      setFieldValue("address", ""); // Clear address input on manual pick
      onMapPick(e.latlng.lat, e.latlng.lng);
    },
  });

  return Array.isArray(values.location) &&
    values.location.length === 2 &&
    typeof values.location[0] === "number" &&
    typeof values.location[1] === "number" ? (
    <Marker position={values.location} ref={markerRef} icon={customIcon} />
  ) : null;
}

export default function Step2Address() {
  const { values, setFieldValue } = useFormikContext<any>();
  const [locationTouched, setLocationTouched] = useState(false);
  const prevLocation = useRef<any>(null);
  const [suggestions, setSuggestions] = useState<any[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [inputValue, setInputValue] = useState(values.address || "");
  const [mapCenter, setMapCenter] = useState<[number, number]>(
    Array.isArray(values.location) &&
      values.location.length === 2 &&
      typeof values.location[0] === "number" &&
      typeof values.location[1] === "number"
      ? values.location
      : defaultPosition
  );
  const [selectedAddressTitle, setSelectedAddressTitle] = useState<string>("");

  useEffect(() => {
    // Toast logic
    if (
      Array.isArray(values.location) &&
      values.location.length === 2 &&
      typeof values.location[0] === "number" &&
      typeof values.location[1] === "number"
    ) {
      if (!locationTouched) {
        toast.success("موقعیت انتخاب شد");
        setLocationTouched(true);
      } else if (
        prevLocation.current &&
        (prevLocation.current[0] !== values.location[0] ||
          prevLocation.current[1] !== values.location[1])
      ) {
        toast.success("موقعیت جدید اعمال شد");
      }
      prevLocation.current = values.location;
    }
  }, [values.location]);

  // Nominatim search
  const searchLocation = async (query: string) => {
    if (!query.trim()) {
      setSuggestions([]);
      return;
    }
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
          query
        )}&countrycodes=ir&limit=7`
      );
      const data = await response.json();
      setSuggestions(data);
    } catch (error) {
      setSuggestions([]);
    }
  };

  const handleSuggestionClick = (suggestion: any) => {
    const lat = parseFloat(suggestion.lat);
    const lon = parseFloat(suggestion.lon);
    setFieldValue("location", [lat, lon]);
    setFieldValue("address", suggestion.display_name);
    setInputValue(suggestion.display_name);
    setSuggestions([]);
    setShowSuggestions(false);
    setMapCenter([lat, lon]);
    setSelectedAddressTitle(suggestion.display_name);
  };

  // For map pick, clear address input and address title
  const handleMapPick = () => {
    setInputValue("");
    setSelectedAddressTitle("");
  };

  return (
    <div className="rounded-xl p-6 mt-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4 items-center">
        <div className="relative">
          <label className="block mb-1 text-sm font-medium">نشانی ملک:</label>
          <input
            type="text"
            value={inputValue}
            onChange={(e) => {
              setInputValue(e.target.value);
              setFieldValue("address", e.target.value);
              searchLocation(e.target.value);
              setShowSuggestions(true);
            }}
            onFocus={() => setShowSuggestions(true)}
            className="form-input w-full z-[99999]"
            placeholder="مثال: ساری، دنیای آرزو، پژوهشگاه سپهرگان"
            autoComplete="off"
          />
          <ErrorMessage
            name="address"
            component="div"
            className="text-red-500 text-xs mt-1"
          />
          {showSuggestions && suggestions.length > 0 && (
            <div className="absolute z-[99999] w-full mt-1 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 max-h-60 overflow-auto">
              {suggestions.map((suggestion, index) => (
                <div
                  key={index}
                  className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer text-sm"
                  onClick={() => handleSuggestionClick(suggestion)}
                >
                  {suggestion.display_name}
                </div>
              ))}
            </div>
          )}
        </div>
        <div className="text-center">
          <p className="mb-2 text-xl font-normal text-gray-700 dark:text-gray-300">
            با انتخاب موقعیت مکانی ملک خود از روی نقشه به راحتی
            <br />
            <span className="text-amber-600 dark:text-amber-200 font-bold text-lg ml-1">
              موقعیت ملک را
            </span>
            تعیین کنید.
          </p>
        </div>
      </div>
      <div className="mb-4">
        <MapContainer
        zoom={6}
          center={mapCenter}
          className="h-full w-full dark:bg-gray-800 z-0 dark:invert dark:hue-rotate-180"
          style={{ height: "300px", width: "100%", borderRadius: "1rem" }}
        >
          <TileLayer
            maxZoom={20}
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <LocationMarker onMapPick={handleMapPick} />
        </MapContainer>
      </div>
      {Array.isArray(values.location) &&
        values.location.length === 2 &&
        typeof values.location[0] === "number" &&
        typeof values.location[1] === "number" && (
          <p className="text-center text-sm text-gray-600 mt-8 dark:text-gray-300 flex flex-col justify-center items-start gap-8">
            {selectedAddressTitle && (
              <span className="font-bold flex items-center gap-2">
                <FaLocationPinLock size={20} className="text-green-500" />
                عنوان ملک: {selectedAddressTitle} -
              </span>
            )}
            <span className="font-bold flex items-center gap-2">
              <FaMapLocationDot size={20} className="text-blue-500" />
              موقعیت ملک: {values.location[0].toFixed(6)},{" "}
              {values.location[1].toFixed(6)}
            </span>
          </p>
        )}
    </div>
  );
}

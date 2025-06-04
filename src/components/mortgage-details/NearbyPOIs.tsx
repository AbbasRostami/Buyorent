"use client";

import { useEffect, useState } from "react";
import { getCoordinates, getNearbyPOIs } from "@/services/geo";
import {
  NearbyPOIsProps,
  POI,
  POI_DISPLAY_CONFIG,
  POI_QUERY_CONFIGS,
} from "@/types/geo";
import { Skeleton } from "@heroui/react";

export function NearbyPOIs({ address }: NearbyPOIsProps) {
  const [pois, setPois] = useState<POI[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [usingFallback, setUsingFallback] = useState(false);

  useEffect(() => {
    async function fetchPOIs() {
      try {
        setLoading(true);
        setError(null);

        const coordinates = await getCoordinates(address);

        const isFallback =
          coordinates.lat === 35.6892 && coordinates.lon === 51.389;

        setUsingFallback(isFallback);

        const poiPromises = POI_QUERY_CONFIGS.map((poi) =>
          getNearbyPOIs(coordinates.lat, coordinates.lon, poi)
        );

        const results = await Promise.all(poiPromises);
        const validPOIs = results.filter((poi): poi is POI => poi !== null);

        setPois(validPOIs);
      } catch (err) {
        setError("خطا در دریافت اطلاعات مکان‌های نزدیک");
        console.error("Error fetching POIs:", err);
      } finally {
        setLoading(false);
      }
    }

    if (address) {
      fetchPOIs();
    }
  }, [address]);

  if (loading) {
    return (
      <div>
        <button className="text-lg font-bold border border-color2 mb-4 px-4 py-2 rounded-full text-color1">
          مکان‌های نزدیک
        </button>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-x-4 gap-y-3 text-[16px] font-medium">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((i) => (
            <div
              key={i}
              className="flex flex-col pr-3 border-r-3 border-[#d27700]"
            >
              <div className="w-full flex flex-col gap-2">
                <Skeleton className="h-3 w-3/5 rounded-lg" />
                <Skeleton className="h-3 w-4/5 rounded-lg" />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div>
        <button className="text-lg font-bold border border-color2 mb-4 px-4 py-2 rounded-full text-color1">
          مکان‌های نزدیک
        </button>
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  if (pois.length === 0) {
    return (
      <div>
        <button className="text-lg font-bold border border-color2 mb-4 px-4 py-2 rounded-full text-color1">
          مکان‌های نزدیک
        </button>
        <p className="text-gray-500">مکان نزدیکی یافت نشد</p>
      </div>
    );
  }

  return (
    <div>
      <button className="text-lg font-bold border border-color2 mb-4 px-4 py-2 rounded-full text-color1">
        مکان‌های نزدیک
      </button>
      {usingFallback && (
        <p className="text-gray-700 dark:text-gray-100 mb-4 bg-amber-50 dark:bg-amber-900/20 p-3 rounded-lg">
          توجه: به دلیل عدم دسترسی به مختصات دقیق آدرس، فاصله‌ها به صورت تقریبی
          نمایش داده می‌شوند.
        </p>
      )}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-x-4 gap-y-6 text-[16px] font-medium">
        {pois.map((poi) => {
          const display = POI_DISPLAY_CONFIG[poi.type];
          return (
            <div
              key={poi.type}
              className="flex flex-col pr-3 border-r-3 border-[#d27700]"
            >
              <span className="text-[#d27700] dark:text-amber-400">
                {display.icon} {display.label}
              </span>
              <span className="text-gray-800 dark:text-gray-100">
                {poi.distance < 1000
                  ? `${poi.distance} متر`
                  : `${(poi.distance / 1000).toFixed(1)} کیلومتر`}{" "}
                ({poi.walkingTime} دقیقه)
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

import Image from "next/image";
import React from "react";

const About = () => {
  const properties = Array.from({ length: 9 }, (_, index) => ({
    id: index + 1,
    title: "آپارتمان لوکس زعفرانیه",
    location: "تهران · زعفرانیه",
    price: "۱۵,۰۰۰,۰۰۰ تومان",
    oldPrice: "۱۶,۵۰۰,۰۰۰ تومان",
    discount: "۷.۱۵٪ تخفیف",
    imageUrl: "https://4kwallpapers.com/images/walls/thumbs_3t/22112.jpg",
  }));
  
  return (
    <div className="bg-white p-6 mt-20">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-screen-xl mx-auto">
        {properties.map((property) => (
          <div
            key={property.id}
            className="bg-white rounded-lg shadow-lg overflow-hidden"
          >
            <img
              src={property.imageUrl}
              alt="Property Image"
              width={400}
              height={300}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h3 className="text-lg font-semibold text-gray-800">
                {property.title}
              </h3>
              <p className="text-sm text-gray-500">{property.location}</p>
              <div className="flex space-x-4 my-4">
                <div className="bg-gray-200 text-gray-700 py-1 px-3 rounded-full text-xs">
                  ۲ خواب
                </div>
                <div className="bg-gray-200 text-gray-700 py-1 px-3 rounded-full text-xs">
                  ۲ حمام
                </div>
                <div className="bg-gray-200 text-gray-700 py-1 px-3 rounded-full text-xs">
                  پارکینگ
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xl font-bold text-gray-800">
                  {property.price}
                </span>
                <span className="text-sm text-gray-500 line-through">
                  {property.oldPrice}
                </span>
              </div>
              <div className="mt-2 text-sm text-red-500">
                {property.discount}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default About;

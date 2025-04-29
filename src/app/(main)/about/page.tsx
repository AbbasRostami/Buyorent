
import React from 'react'

const page = () => {
  return (
    <div>
      <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
  <div className="flex gap-4 items-center flex-col sm:flex-row">
    <button className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 sm:w-auto">
      Deploy now
    </button>


    <a
      className="rounded-full border border-solid border-black/[.08] dark:border-white/[.145] transition-colors flex items-center justify-center hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a] hover:border-transparent font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 w-full sm:w-auto md:w-[158px]"
      href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
      target="_blank"
      rel="noopener noreferrer"
    >
      Read our docs
    </a>
  </div>

  {/* کارت‌ها با تصاویر */}
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-6xl mt-10">
    {[
      {
        title: "کارت اول",
        desc: "توضیحی کوتاه درباره کارت اول",
        img: "https://4kwallpapers.com/images/walls/thumbs_3t/22112.jpg",
      },
      {
        title: "کارت دوم",
        desc: "توضیحی کوتاه درباره کارت دوم",
        img: "https://4kwallpapers.com/images/walls/thumbs_3t/22114.jpg",
      },
      {
        title: "کارت سوم",
        desc: "توضیحی کوتاه درباره کارت سوم",
        img: "https://4kwallpapers.com/images/walls/thumbs_3t/21958.jpg",
      },
      {
        title: "کارت اول",
        desc: "توضیحی کوتاه درباره کارت اول",
        img: "https://4kwallpapers.com/images/walls/thumbs_3t/22112.jpg",
      },
      {
        title: "کارت دوم",
        desc: "توضیحی کوتاه درباره کارت دوم",
        img: "https://4kwallpapers.com/images/walls/thumbs_3t/22114.jpg",
      },
      {
        title: "کارت سوم",
        desc: "توضیحی کوتاه درباره کارت سوم",
        img: "https://4kwallpapers.com/images/walls/thumbs_3t/21958.jpg",
      },
    ].map((item, idx) => (
      <div
        key={idx}
        className="bg-white dark:bg-neutral-900 rounded-2xl overflow-hidden shadow-md transition-transform hover:scale-[1.02]"
      >
        <img src={item.img} alt={item.title} className="w-full h-48 object-cover" />
        <div className="p-4">
          <h3 className="text-lg font-bold">{item.title}</h3>
          <p className="text-sm text-gray-600 dark:text-gray-300 mt-2">{item.desc}</p>
        </div>
      </div>
    ))}
  </div>
</div>

    </div>
  )
}

export default page

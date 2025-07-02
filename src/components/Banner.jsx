import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

const Banner = () => {
  const banners = [
    {
      image: "https://assets-in-gm.bmscdn.com/promotions/cms/creatives/1751370762290_goodwill.jpg",
      title: "Intermission’s almost over!",
      subtitle: "Your fave cinema is coming soon.",
    },
    {
      image: "https://assets-in-gm.bmscdn.com/promotions/cms/creatives/1744877848242_revplaycard1240x300.jpg",
      title: "Intermission’s almost!",
      subtitle: "Your fave cinema is coming soon.",
    },
  ];

  return (
    <div className="w-full px-5 mt-3">
      <Swiper
         modules={[Autoplay, Pagination]} // ✅
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        pagination={{ clickable: true }}
        className="w-full h-[200px] md:h-[350px] rounded-xl overflow-hidden"
      >
        {banners.map((banner, index) => (
          <SwiperSlide key={index}>
            <div
              className="relative w-full h-full bg-cover bg-center flex items-center justify-start text-white"
              style={{ backgroundImage: `url(${banner.image})` }}
            >
              <div className="bg-black/60 p-6 md:p-12 w-full md:w-1/2">
                <h2 className="text-2xl md:text-4xl font-bold">
                  {banner.title}
                </h2>
                <p className="text-md md:text-lg mt-2">{banner.subtitle}</p>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Banner;

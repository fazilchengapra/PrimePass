import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import { getBannerData } from "../utils/getBannerData";
import { Button } from "@radix-ui/themes";
import { FaVideo } from "react-icons/fa";
import { Link } from "react-router-dom";

const Banner = () => {
  const [banners, setBanners] = useState([
    {
      image:
        "https://assets-in-gm.bmscdn.com/promotions/cms/creatives/1751370762290_goodwill.jpg",
      title: "Intermission’s almost over!",
      subtitle: "Your fave cinema is coming soon.",
    },
    {
      image:
        "https://assets-in-gm.bmscdn.com/promotions/cms/creatives/1744877848242_revplaycard1240x300.jpg",
      title: "Intermission’s almost!",
      subtitle: "Your fave cinema is coming soon.",
    },
  ]);

  useEffect(() => {
    const fetchBanners = async () => {
      const res = await getBannerData();
      setBanners(res || []);
    };
    fetchBanners();
  }, []);

  return (
    <div className="w-full px-5 mt-3">
      <Swiper
        modules={[Autoplay, Pagination]}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        pagination={{ clickable: true }}
        className="rounded-xl"
      >
        {banners.map((banner, index) => (
          <SwiperSlide key={banner.id || index}>
            <div className="w-full h-[200px] md:h-[300px] overflow-hidden rounded-xl relative bg-black">
              <img
                src={`https://image.tmdb.org/t/p/original${banner.backdrop_path}`}
                alt={banner.title || banner.name}
                className="w-full h-full object-cover rounded-md"
              />
              {/* Optional text */}
              <div className="absolute w-full h-full top-0 left-0 z-10 lg:grid grid-cols-2">
                <div className="col-span-1 w-full h-full flex justify-center items-center">
                  <div className="flex flex-col gap-3 items-center">
                    <h5 className="font-bold text-white">
                      {banner?.title || banner?.name}
                    </h5>
                    {index <= 2 && (
                      <div>
                        <Link to={`/movie/${banner.id}`}>
                          <Button color="brown" variant="classic">
                            View
                          </Button>
                        </Link>
                      </div>
                    )}
                  </div>
                </div>

                <div className="hidden lg:flex col-span-1 h-full px-6 py-4 items-center gap-6 bg-black/50">
                  {/* Poster Image */}
                  <div className="w-1/3 max-w-[140px] aspect-[2/3] bg-gray-300 rounded overflow-hidden shadow">
                    <img
                      className="w-full h-full object-cover"
                      src={`https://image.tmdb.org/t/p/original/${banner?.poster_path}`}
                      alt="poster"
                    />
                  </div>

                  {/* Movie Info */}
                  <div className="flex-1 flex flex-col justify-center">
                    <h3 className="text-xl font-bold text-white mb-2">
                      {banner?.title || banner?.name}
                    </h3>
                    <p className="text-sm text-gray-200 line-clamp-3">
                      {banner?.overview || "No description available."}
                    </p>
                    <div className="mt-4 flex gap-2 text-xs text-gray-700">
                      <span className="bg-gray-200 px-2 py-1 rounded">
                        ⭐ {banner?.vote_average?.toFixed(1)}
                      </span>
                      <span className="bg-gray-200 px-2 py-1 rounded">
                        {banner?.release_date || banner?.first_air_date}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              {/* Optional overlay */}
              <div className="absolute inset-0 bg-black/30 z-0" />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Banner;

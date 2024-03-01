import { CMS_CONFIG } from "@/cms.config";
import { useTranslations } from "next-intl";
import Link from "next/link";
import React from "react";

const Hero = () => {
  const t = useTranslations("Index");
  return (
    <div className="">
      <div className="container min-h-[80vh] grid grid-cols-1 lg:grid-cols-4  ">
        <div className=" lg:col-span-2 min-h-[80vh]  col-span-full flex items-center justify-center">
          <div className="">
            <h1 className="hero__title">
              {t("heroTitle")} <br />
              {t("sbcest")}
            </h1>
            <p className="hero__subtitle">{t("about")}</p>
            <Link
              href="/products"
              className="mt-10 inline-block px-8 py-3 rounded-full bg-cyan-500 text-white shadow-sm semibold"
            >
              {t("shop now")}
            </Link>
          </div>
        </div>
        {/* Video Container */}
        <div className="hidden lg:flex items-center justify-center lg:col-span-2  ">
          <div className="w-[500px] h-[700px]  rounded-full  border border-cyan-300">
            <video
              autoPlay
              loop
              muted
              className="object-cover object-center w-full h-full rounded-full p-6"
              poster="/video-poster.jpg" // Add a poster image for browsers that don't support video autoplay
            >
              <source
                src={`${CMS_CONFIG.cdn.location}/static/herovid.mp4`}
                type="video/mp4"
              />
              Your browser does not support the video tag.
            </video>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;

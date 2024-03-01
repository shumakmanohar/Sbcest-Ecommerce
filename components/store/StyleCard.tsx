import React from "react";
import { Card } from "../ui/card";
import { CMS_CONFIG } from "@/cms.config";
import Image from "next/image";
import { useTranslations } from "next-intl";

const StyleCard = () => {
  const t = useTranslations("Index");

  return (
    <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 p-4 max-w-[1500px] w-full mx-auto">
      <Card className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-6 bg-[#1e1e1e] p-4 xl:w-1/2 md:w-auto sm:w-auto">
        <Image
          alt="Game Controller"
          className="h-20 w-25"
          height={100}
          src={`${CMS_CONFIG.staticImages.location}/da-banner-1.webp`}
          style={{
            objectFit: "cover",
          }}
          width={100}
        />
        <div>
          <h2 className="text-sm font-bold text-white ">
            {t("fancy banner 1")}
          </h2>
          <p className="mt-4  text-[#00adb5] font-bold flex items-center hover:cursor-pointer pr-4">
            {t("shop now")}
            <svg
              className="h-6 w-6 ml-2 "
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M14 5l7 7m0 0l-7 7m7-7H3"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
              />
            </svg>
          </p>
        </div>
      </Card>
      <Card className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-4 bg-[#1e1e1e] p-4">
        <Image
          alt="Computer Setup"
          className="h-20 w-30"
          height={100}
          src={`${CMS_CONFIG.staticImages.location}/desktop.webp`}
          style={{
            objectFit: "cover",
          }}
          width={100}
        />
        <div>
          <h2 className="uppercase text-sm font-bold text-white ">
            {t("fancy banner 2")}
          </h2>
          <p className="mt-2 text-[#00adb5] font-bold flex items-center hover:cursor-pointer  pr-4">
            {t("shop now")}
            <svg
              className="h-6 w-6 ml-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M14 5l7 7m0 0l-7 7m7-7H3"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
              />
            </svg>
          </p>
        </div>
      </Card>
      <Card className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-4 bg-[#1e1e1e] p-4">
        <Image
          alt="Tablets and Smartphones"
          className="h-20 w-34 object-cover"
          height={100}
          src={`${CMS_CONFIG.staticImages.location}/laptop.webp`}
          width={100}
        />
        <div>
          <h2 className="uppercase text-sm font-bold text-white">
            {t("fancy banner 3")}
          </h2>
          <p className="mt-2 text-[#00adb5] font-bold flex items-center hover:cursor-pointer pr-4">
            {t("shop now")}
            <svg
              className="h-6 w-6 ml-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M14 5l7 7m0 0l-7 7m7-7H3"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
              />
            </svg>
          </p>
        </div>
      </Card>
    </div>
  );
};

export default StyleCard;

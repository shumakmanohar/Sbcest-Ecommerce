import { CMS_CONFIG } from "@/cms.config";
import React from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";

const Banner = () => {
  const t = useTranslations("Index");
  console.log();
  return (
    <div
      key="1"
      className="py-16 bg-[#f7f7f7] w-full max-w-[1460px] mx-auto mt-6"
    >
      <div className="container mx-auto px-6">
        <h2 className="text-3xl font-semibold text-center text-gray-800">
          <span className="text-[#00adb5] font-bold text-4xl">
            {t("banner h1")}
          </span>
          {t("banner h2")}
          <br className="hidden md:inline" />
          {t("banner heading")}
        </h2>
        <div className="mt-12 grid grid-cols-1 gap-7 md:grid-cols-3">
          <div className="flex flex-col items-center p-6 space-y-6 rounded-lg bg-white">
            <Image
              src={`${CMS_CONFIG.staticImages.location}/shopping.svg`}
              className=" h-32 w-32 transform transition-transform hover:scale-110"
              alt=""
              height={128}
              width={128}
            />
            <h3 className="text-lg font-semibold text-gray-800">
              {t("banner mobile")}
            </h3>
            <p className="text-sm text-gray-600 text-center">
              {t("banner sub 1")}
            </p>
          </div>
          <div className="flex flex-col items-center p-6 space-y-6 rounded-lg bg-white">
            <Image
              src={`${CMS_CONFIG.staticImages.location}/credit.svg`}
              className="h-32 w-32 transform transition-transform hover:scale-110"
              alt={""}
              height={128}
              width={128}
            />
            <h3 className="text-lg font-semibold text-gray-800">
              {t("banner secure")}
            </h3>
            <p className="text-sm text-gray-600 text-center">
              {t("banner sub 2")}
            </p>
          </div>
          <div className="flex flex-col items-center p-5 space-y-5 rounded-lg bg-white">
            <Image
              src={`${CMS_CONFIG.staticImages.location}/package.svg`}
              className=" h-32 w-32 transform transition-transform hover:scale-110"
              alt={""}
              height={128}
              width={128}
            />
            <h3 className="text-lg font-bold text-gray-800">
              {t("banner package")}
            </h3>
            <p className="text-sm text-gray-600 text-center">
              {t("banner sub 3")}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;

import { CMS_CONFIG } from "@/cms.config";
import { Button } from "../ui/button";
import Image from "next/image";
import { useTranslations } from "next-intl";

const AppleBanner = () => {
  const t = useTranslations("Index");
  return (
    <div
      key="1"
      className="bg-black relative overflow-hidden max-w-[1460px] w-full mx-auto max-h-[850px]"
    >
      <div className="container mx-auto px-2 lg:px-8 ">
        <div className="flex flex-col items-center justify-center py-10 lg:py-18">
          <div className="text-center flex items-center">
            <Image
              src={`${CMS_CONFIG.staticImages.location}/app_logo.png`}
              alt="apple"
              className="object-contain"
              width={20}
              height={20}
              quality={100}
            />
            <h1 className="text-white px-2 font-bold text-2xl ">
              {t("watch")}
            </h1>
          </div>
          <span className="text-red-500 text-xs ml-2 mt-1">Series 9</span>
          <h2 className="text-1xl lg:text-2xl font-bold text-white mt-1">
            {t("w txt")}
          </h2>
          <p className="text-sm text-[#00adb5] mt-4">{t("exclusive")}</p>
          <div className="mt-6">
            <Button className=" bg-[#433e3e] hover:bg-[#00adb5] text-white font-medium py-2 px-6 rounded-full transition duration-300">
              {t("order")}
            </Button>
          </div>
          <div className=" lg:mt-0 flex justify-center w-full">
            <Image
              src={`${CMS_CONFIG.staticImages.location}/iw1.jpg`}
              alt={"iWatch series 9"}
              className="object-cover mx-auto"
              quality={100}
              width={1200}
              height={200}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppleBanner;

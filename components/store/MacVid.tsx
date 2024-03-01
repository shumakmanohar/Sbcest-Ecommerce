import { CMS_CONFIG } from "@/cms.config";
import { useTranslations } from "next-intl";

const MacVid = () => {
  const t = useTranslations("Index");
  return (
    <div className="flex h-[90%] w-full max-w-[1460px] mx-auto flex-col bg-black text-white mt-2  ">
      <div className="mt-4 mx-auto flex w-full max-w-4xl flex-col items-center justify-center px-4 sm:px-8 md:px-12 lg:px-16 xl:px-20">
        <div className="mt-8 flex w-full items-center justify-between flex-col sm:flex-row">
          <h1 className="text-2xl sm:text-base md:text-lg lg:text-xl text-left mb-4 sm:mb-2 font-bold">
            <span className="text-[#00adb5] text-3xl font-bold">
              {" "}
              {t("banner h1")}
            </span>
            {t("banner h2")} {t("mac title")}
          </h1>
          <button className="px-6 py-2 rounded-full bg-[#00adb5] text-white hover:scale-110 transition-transform duration-200 ease-in-out">
            {t("order")}
          </button>
        </div>
        <div className="mt-8 flex h-auto  max-w-[1260px] mx-auto items-center justify-center">
          <video
            autoPlay
            loop
            muted
            className="w-full max-w-[1260px] h-auto object-cover rounded-md"
            style={{
              aspectRatio: "16/10",
              height: "460px !important",
              maxWidth: "1260px ",
              objectFit: "cover",
              borderRadius: "44px",
            }}
          >
            <source
              src={`${CMS_CONFIG.staticImages.location}/xlarge_2x.mp4`}
              type="video/mp4"
            />
            Your browser does not support the video tag.
          </video>
        </div>

        <div className="mt-8" />
      </div>
    </div>
  );
};

export default MacVid;

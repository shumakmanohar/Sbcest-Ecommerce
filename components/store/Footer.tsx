import { useTranslations } from "next-intl";
import Link from "next/link";
import React from "react";

const Footer = () => {
  const t = useTranslations("Footer");
  return (
    <footer className="bg-black px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row justify-between items-start lg:items-center border-b border-gray-200 pb-8 text-white">
        <div className="flex flex-col items-start space-y-4 mb-8 lg:mb-0">
          <div className="text-base sm:text-lg font-semibold">{t("h1")}</div>
          <div className="text-lg sm:text-xl font-bold">
            <h1>{t("help ar")}</h1>
            <a
              href="tel:+966 539740365"
              className="text-[#00adb5] text-base font-semibold"
            >
              {t("ph ar")}
            </a>
          </div>

          <div className="text-lg sm:text-xl font-bold">
            <h1>{t("help en")}</h1>
            <a
              href="tel:+966 539740365"
              className="text-[#00adb5] text-base font-semibold"
            >
              {t("ph en")}
            </a>
          </div>
          <div className="text-sm break-words">{t("add")}</div>
          <div className="flex space-x-2 sm:space-x-4"></div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
          <div className="flex flex-col space-y-2">
            <div className="text-lg font-semibold">{t("cs")}</div>
            <Link className="text-sm" href="#">
              {t("orders")}
            </Link>

            <Link className="text-sm" href="#">
              {t("addrs")}
            </Link>
            <Link className="text-sm" href="#">
              {t("acd")}
            </Link>
            <Link className="text-sm" href="#">
              {t("help")}
            </Link>
          </div>
          <div className="flex flex-col space-y-2">
            <div className="text-lg font-semibold">{t("ul")}</div>
            <Link className="text-sm" href="#">
              {t("ftrs")}
            </Link>
            <Link className="text-sm" href="#">
              {t("abt")}
            </Link>
            <Link className="text-sm" href="#">
              {t("cntct")}
            </Link>
            <Link className="text-xs" href="#">
              {t("tou")}
            </Link>
          </div>
          <div className="flex flex-col space-y-2">
            <div className="text-lg font-semibold">{t("dlry")}</div>
            <Link className="text-sm" href="#">
              {t("hiw")}
            </Link>
            <Link className="text-sm" href="#">
              {t("fd")}
            </Link>
            <Link className="text-sm" href="#">
              {t("FAQ")}
            </Link>
          </div>
        </div>
      </div>
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row justify-between items-center py-4 text-white">
        <div className="text-sm">
          © 2024 {t("sbcest")} | {t("alr")} | {t("Designed By")}:{" "}
          <Link href={"#"}>oflyne.co</Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

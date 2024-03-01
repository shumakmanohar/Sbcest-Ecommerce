import Footer from "@/components/store/Footer";

import NavBar from "@/components/store/NavBar";
import { useTranslations } from "next-intl";
import { getTranslations } from "next-intl/server";

export default async function layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const t = await getTranslations("Index");
  return (
    <div className="bg-[#f7f7f7]">
      <NavBar placeholder={t("search")} />
      {children}
      <Footer />
    </div>
  );
}

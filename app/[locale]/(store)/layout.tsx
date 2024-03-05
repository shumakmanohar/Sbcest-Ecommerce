import Footer from "@/components/store/Footer";
import NavBar from "@/components/store/NavBar";
import { getTranslations, unstable_setRequestLocale } from "next-intl/server";

const locales = ["en", "ar"];

export function generateStaticParams() {
	return locales.map((locale) => ({ locale }));
}

export default async function layout({
	children,
	params,
}: {
	children: React.ReactNode;
	params: {
		locale: string;
	};
}) {
	console.log("LOCALE HERE : [layout]", params.locale);
	unstable_setRequestLocale(params.locale);
	const t = await getTranslations("Index");
	return (
		<div className="bg-[#f7f7f7]">
			<NavBar placeholder={t("search")} />
			{children}
			<Footer />
		</div>
	);
}

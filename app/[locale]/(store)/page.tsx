import HeroBanner from "@/components/store/HeroBanner";
import { useTranslations } from "next-intl";

export default function Home() {
	const t = useTranslations("Index");

	return (
		<main>
			<HeroBanner />
			<h1>{t("title")}</h1>
		</main>
	);
}

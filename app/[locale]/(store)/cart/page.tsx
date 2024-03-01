import CartContainer from "@/components/store/CartContainer";
import { useTranslations } from "next-intl";

const Page = () => {
	const t = useTranslations("Cart");
	return (
		<div>
			<CartContainer
				titleText={t("sc")}
				cartItemsText={t("ci")}
				subHeadingText={t("sm")}
				subtotalText={t("st")}
				descriptionText={t("disc")}
				checkoutBtnText={t("checkout")}
				currencyText={t("CA")}
				quantityText={t("quantity")}
			/>
		</div>
	);
};

export default Page;

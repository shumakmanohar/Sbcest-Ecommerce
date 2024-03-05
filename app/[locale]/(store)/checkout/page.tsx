import CheckoutForm from "@/components/store/CheckoutForm";
import Invoice from "@/components/store/Invoice";
import InvoiceContainer from "@/components/store/InvoiceContainer";
import { Separator } from "@/components/ui/separator";
import { useTranslations } from "next-intl";
import { unstable_setRequestLocale } from "next-intl/server";

const Page = ({ params }: { params: { locale: string } }) => {
	console.log("LOCALE HERE : [checkout]", params.locale);
	unstable_setRequestLocale(params.locale);
	const t = useTranslations("Checkout");
	return (
		<div className="min-h-[90vh]">
			<div className="container grid grid-cols-1 md:grid-cols-2 gap-6">
				<InvoiceContainer
					translations={{
						email: `${t("email")}`,
						name: `${t("name")}`,
						phone: `${t("Phone")}`,
						shippingAddress: `${t("Shipping Address")}`,
						addl1: `${t("add 1")}`,
						addl2: `${t("add 2")}`,
						city: `${t("city")}`,
						state: `${t("state")}`,
						pincode: `${t("pin")}`,
						pay: `${t("pay")}`,
						currency: `${t("CA")}`,
						vat: `${t("vat")}`,
						subTotal: `${t("st")}`,
						shippingCost: `${t("shp")}`,
						total: `${t("total")}`,
						checkout: `${t("Checkout")}`,
					}}
				/>
			</div>
		</div>
	);
};

export default Page;

import PaymentFailed from "@/components/store/PaymentFailed";
import PaymentSuccess from "@/components/store/PaymentSuccess";
import { unstable_setRequestLocale } from "next-intl/server";

const page = ({
	searchParams,
	params,
}: {
	searchParams: {
		[key: string]: string | string[] | undefined;
	};
	params: { locale: string };
}) => {
	unstable_setRequestLocale(params.locale);
	const searchQuery = searchParams["status"] as string;
	if (searchQuery === "paid") {
		return (
			<div className="min-h-[80vh] flex items-center justify-center">
				<PaymentSuccess />
			</div>
		);
	} else {
		return (
			<div className="min-h-[80vh] flex items-center justify-center">
				<PaymentFailed />
			</div>
		);
	}
};

export default page;

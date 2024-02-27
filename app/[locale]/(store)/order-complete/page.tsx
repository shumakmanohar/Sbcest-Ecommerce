import PaymentFailed from "@/components/store/PaymentFailed";
import PaymentSuccess from "@/components/store/PaymentSuccess";

const page = ({
	searchParams,
}: {
	searchParams: {
		[key: string]: string | string[] | undefined;
	};
}) => {
	const searchQuery = searchParams["status"] as string;
	console.log(searchQuery === "paid");
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

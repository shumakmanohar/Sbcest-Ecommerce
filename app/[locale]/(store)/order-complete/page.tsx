import PaymentSuccess from "@/components/store/PaymentSuccess";

const page = () => {
	// Get PAyment id form moyasar
	// Search DB , Update If Required.
	// Standby Option to Update Payment
	// param -> payid -> order -> serch -> where moyasar id -> order -> payment status update ..
	// Pls wait
	return (
		<div className="min-h-[80vh] flex items-center justify-center">
			<PaymentSuccess />
		</div>
	);
};

export default page;

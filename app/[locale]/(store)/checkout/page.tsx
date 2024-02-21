import CheckoutForm from "@/components/store/CheckoutForm";
import Invoice from "@/components/store/Invoice";
import InvoiceContainer from "@/components/store/InvoiceContainer";
import { Separator } from "@/components/ui/separator";

const page = () => {
	return (
		<div className="min-h-[90vh]">
			<div className="container grid grid-cols-1 md:grid-cols-2 gap-6">
				<InvoiceContainer />
			</div>
		</div>
	);
};

export default page;

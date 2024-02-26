import ErrorCms from "@/components/cms/ErrorCms";
import Header from "@/components/cms/Header";
import OrderDetails from "@/components/cms/OrderDetails";
import OrderForm from "@/components/cms/OrderForm";
import prisma from "@/lib/prisma";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";
import { PaymentStatus } from "@prisma/client";

const page = async ({ params }: { params: { id: string } }) => {
	try {
		const order = await prisma.order.findFirst({
			where: { id: params.id },
		});

		return (
			<div>
				<Header
					heading={order?.id}
					description={`Details About Order ${order?.id}`}
				/>
				<OrderDetails order={order} />
				{order?.paymentStatus === PaymentStatus.SUCCESS ? (
					<OrderForm orderID={order?.id} />
				) : (
					<Alert variant="destructive" className="mt-10">
						<ExclamationTriangleIcon className="h-4 w-4" />
						<AlertTitle>Warning !</AlertTitle>
						<AlertDescription>Warning This is a Failed Order.</AlertDescription>
					</Alert>
				)}
			</div>
		);
	} catch (error) {
		return (
			<div>
				<ErrorCms error={error} />
			</div>
		);
	}
};

export default page;

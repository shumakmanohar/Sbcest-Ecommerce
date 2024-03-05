import ErrorCms from "@/components/cms/ErrorCms";
import Header from "@/components/cms/Header";
import OrderDetails from "@/components/cms/OrderDetails";
import OrderForm from "@/components/cms/OrderForm";
import prisma from "@/lib/prisma";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";
import { PaymentStatus } from "@prisma/client";
import { Button } from "@/components/ui/button";

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

				{order?.paymentStatus === PaymentStatus.SUCCESS ? (
					<OrderForm orderID={order?.id} />
				) : (
					<div>
						<Alert variant="destructive" className="mt-10">
							<ExclamationTriangleIcon className="h-4 w-4" />
							<AlertTitle>Warning !</AlertTitle>
							<AlertDescription>
								Warning This is a {order?.paymentStatus} Order.
							</AlertDescription>
						</Alert>
					</div>
				)}
				<OrderDetails order={order} />
			</div>
		);
	} catch (error: any) {
		return (
			<div>
				<ErrorCms error={error} />
			</div>
		);
	}
};

export default page;

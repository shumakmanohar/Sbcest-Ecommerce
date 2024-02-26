import Moyasar from "@/components/store/Moyasar";
import { GetSingleOrder } from "@/server-actions/Order-Actions";
import { ServerResponse } from "@/util/Enums";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";

const page = async ({
	searchParams,
}: {
	searchParams: {
		[key: string]: string | string[] | undefined;
	};
}) => {
	const orderID = searchParams["id"];
	const response = await GetSingleOrder(orderID as string);
	if (response.status === ServerResponse.Success) {
		return (
			<div>
				<div className="container min-h-[80vh]">
					{response.orderId ? (
						<Moyasar
							order={response.orderId}
							orderId={response.orderId.id}
							orderAmount={response.orderId.amount}
						/>
					) : (
						<Alert variant="destructive">
							<ExclamationTriangleIcon className="h-4 w-4" />
							<AlertTitle>Error</AlertTitle>
							<AlertDescription>
								Something went wrong with your order. Please try again.If the
								error presists contact our customer support team.
							</AlertDescription>
						</Alert>
					)}
				</div>
			</div>
		);
	} else {
		return (
			<div>
				<div className="container min-h-[100vh]">
					<Alert variant="destructive">
						<ExclamationTriangleIcon className="h-4 w-4" />
						<AlertTitle>Error</AlertTitle>
						<AlertDescription>
							Something went wrong with your order. Please try again.If the
							error presists contact our customer support team.
						</AlertDescription>
					</Alert>
				</div>
			</div>
		);
	}
};

export default page;

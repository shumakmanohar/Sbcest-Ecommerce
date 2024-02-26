import DashboardHeader from "@/components/store/DashboardHeader";
import Wrapper from "@/components/store/Wrapper";
import { auth, currentUser } from "@clerk/nextjs";
import prisma from "@/lib/prisma";
import OrderCard from "@/components/store/OrderCard";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Info } from "lucide-react";

const page = async () => {
	// Get the userId from auth() -- if null, the user is not logged in
	const { userId } = auth();
	if (userId) {
		// Query DB for user specific information or display assets only to logged in users
		const user = await currentUser();
		const orders = await prisma.order.findMany({
			where: { userID: userId },
			orderBy: {
				createdAt: "desc",
			},
		});
		console.log("my Orders", orders);
		return (
			<div className="min-h-[80vh]">
				<Wrapper>
					<DashboardHeader name={user?.firstName} />
					<Alert className="my-10">
						<Info className="h-4 w-4" />

						<AlertTitle>Customer Support!</AlertTitle>
						<AlertDescription>
							For any queries related to order or any service , please contact
							our customer support team. <br />
							Arabic : +966 539740365 <br />
							English : +966 539740365
						</AlertDescription>
					</Alert>
					<div className="p-8 bg-white mb-20">
						<h1 className="text-3xl font-bold mb-6">Order history</h1>
						<p className="mb-8">
							Check the status of recent orders, manage returns, and discover
							similar products.
						</p>
						{orders.map((order) => (
							<OrderCard order={order} key={order.id} />
						))}
					</div>
				</Wrapper>
			</div>
		);
	}

	return <div></div>;
};

export default page;

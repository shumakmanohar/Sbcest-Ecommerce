import Header from "@/components/cms/Header";
import { ServerResponse } from "@/util/Enums";
import React from "react";
import { columns } from "./columns";
import { GetAllOrders } from "@/server-actions/Order-Actions";
import { OrderTable } from "@/components/cms/OrderTable";

const page = async () => {
	const { orders, status, message } = await GetAllOrders();

	ServerResponse.Failure === status && console.log(message);
	return (
		<div>
			<Header heading={"Order"} description={"Manage your store orders"} />
			{status === ServerResponse.Success ? (
				<div className="container mx-auto py-10">
					<OrderTable columns={columns} data={orders!} />
				</div>
			) : (
				<span>Sorry Something Went Wrong in Server</span>
			)}
		</div>
	);
};

export default page;

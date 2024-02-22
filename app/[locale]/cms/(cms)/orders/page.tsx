import Header from "@/components/cms/Header";
import React from "react";
import { columns } from "./columns";

import { OrderTable } from "@/components/cms/OrderTable";
import { GetAllOrders } from "@/server-actions/Order-Actions";
import { ServerResponse } from "@/util/Enums";

const page = async () => {
	const { data, status, message } = await GetAllOrders();

	ServerResponse.Failure === status && console.log(message);
	return (
		<div>
			<Header
				heading={"Orders"}
				description={"Orders placed by customers."}
			/>
			{status === ServerResponse.Success ? (
				<div className="container mx-auto py-10">
					<OrderTable columns={columns} data={data!} />
				</div>
			) : (
				<span>Sorry Something Went Wrong in Server</span>
			)}
		</div>
	);
};

export default page;

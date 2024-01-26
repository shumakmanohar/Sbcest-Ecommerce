import Header from "@/components/cms/Header";
import React from "react";
import { columns } from "./columns";
import { PaymentTable } from "@/components/cms/PaymentTable";
import { GetAllProduct } from "@/server-actions/Product-Actions";
import { ServerResponse } from "@/util/Enums";

const page = async () => {
	const { data, status, message } = await GetAllProduct();

	ServerResponse.Failure === status && console.log(message);
	return (
		<div>
			<Header
				heading={"Products"}
				description={"Products Available in the Store"}
			/>
			{status === ServerResponse.Success ? (
				<div className="container mx-auto py-10">
					<PaymentTable columns={columns} data={data!} />
				</div>
			) : (
				<span>Sorry Something Went Wrong in Server</span>
			)}
		</div>
	);
};

export default page;

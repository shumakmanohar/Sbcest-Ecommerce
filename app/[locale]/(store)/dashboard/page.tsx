import Wrapper from "@/components/store/Wrapper";
import React from "react";

const page = () => {
	return (
		<div className="min-h-[80vh]">
			<Wrapper>
				<div className="flex items-center gap-8 my-16">
					<div>
						<img src="" className="w-16 h-16 bg-red-300 rounded-full" />
					</div>
					<div className="grow">
						<h1 className="text-3xl font-semibold">
							Hi 👋 <span>Shumak Manohar</span>
						</h1>
						<p className="text-sm mt-2">Welcome To Sbcest.</p>
					</div>
				</div>
				<h1 className="text-3xl font-normal">My Orders</h1>
				<div>
					<div className="w-full max-w-lg">orderId</div>
				</div>
			</Wrapper>
		</div>
	);
};

export default page;

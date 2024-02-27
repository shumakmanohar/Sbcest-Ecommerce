import { XCircle } from "lucide-react";
import React from "react";

const PaymentFailed = () => {
	return (
		<div>
			<div className="bg-white p-6  md:mx-auto w-full max-w-lg">
				<XCircle className="text-red-600 w-16 h-16 mx-auto my-6" />
				<div className="text-center">
					<h3 className="md:text-2xl text-base text-gray-900 font-semibold text-center">
						Payment Failed!
					</h3>
					<p className="text-gray-600 my-2">
						Something went with your payment method.
					</p>
					<p>Please contact our customer support team for further assistance</p>
					<div className="py-10 text-center">
						<a
							href="#"
							className="px-12 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold py-3"
						>
							GO BACK
						</a>
					</div>
				</div>
			</div>
		</div>
	);
};

export default PaymentFailed;

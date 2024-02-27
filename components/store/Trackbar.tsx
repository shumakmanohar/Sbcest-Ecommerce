import { DeliveryStatus } from "@prisma/client";
import { CheckCircle2, PackageCheck, Truck } from "lucide-react";

const Trackbar = ({ deliveryStatus }: { deliveryStatus: DeliveryStatus }) => {
	return (
		<>
			{/* <!-- Timeline --> */}
			<div className="max-w-sm w-full ">
				{/* <!-- End Heading --> */}

				{/* <!-- Item 1 --> */}
				<div className="flex gap-x-3">
					{/* <!-- Icon --> */}
					<div className="relative last:after:hidden after:absolute after:top-7 after:bottom-0 after:start-3.5 after:w-px after:-translate-x-[0.5px] after:bg-gray-200 dark:after:bg-gray-700">
						<div className="relative z-10 size-7 flex justify-center items-center">
							<div className="size-2 rounded-full bg-gray-400 dark:bg-gray-600"></div>
						</div>
					</div>
					{/* <!-- End Icon --> */}

					{/* <!-- Right Content --> */}
					<div
						className={`grow ${
							(deliveryStatus === DeliveryStatus.RECIEVED ||
								deliveryStatus === DeliveryStatus.PENDING) &&
							"bg-gray-200"
						}  rounded-xl p-2`}
					>
						<h3 className="flex gap-x-1.5 font-semibold text-gray-800 dark:text-white">
							<PackageCheck className="text-yellow-500" />
							Order Recieved.
						</h3>
						<p className="mt-1 text-xs text-gray-600 dark:text-gray-400">
							You order will be processed and shipped soon.
						</p>
					</div>
					{/* <!-- End Right Content --> */}
				</div>
				{/* <!-- End Item 1 -->
  
          <!-- Item 2 --> */}
				<div className="flex gap-x-3">
					{/* <!-- Icon --> */}
					<div className="relative last:after:hidden after:absolute after:top-7 after:bottom-0 after:start-3.5 after:w-px after:-translate-x-[0.5px] after:bg-gray-200 dark:after:bg-gray-700">
						<div className="relative z-10 size-7 flex justify-center items-center">
							<div className="size-2 rounded-full bg-gray-400 dark:bg-gray-600"></div>
						</div>
					</div>
					{/* <!-- End Icon --> */}

					{/* <!-- Right Content --> */}
					<div
						className={`grow p-2 mt-4 ${
							deliveryStatus === DeliveryStatus.TRANSIT && "bg-gray-200"
						} rounded-xl `}
					>
						<h3 className="flex gap-x-1.5 font-semibold text-gray-800 dark:text-white">
							<Truck className="text-blue-400" />
							Order in transit.
						</h3>
						<p className="mt-2 text-xs text-gray-600 dark:text-gray-400">
							Your products are on the way!
						</p>
					</div>
					{/* <!-- End Right Content --> */}
				</div>
				{/* <!-- End Item 2 -->
  
          <!-- Item 3 --> */}
				<div className="flex gap-x-3">
					{/* <!-- Icon --> */}
					<div className="relative">
						<div className="relative z-10 size-7 flex justify-center items-center">
							<div className="size-2 rounded-full bg-gray-400 dark:bg-gray-600"></div>
						</div>
					</div>
					{/* <!-- End Icon --> */}

					{/* <!-- Right Content --> */}
					<div
						className={`grow mt-2 p-2 ${
							deliveryStatus === DeliveryStatus.DELIVERED && "bg-gray-200"
						} `}
					>
						<h3 className="flex gap-x-1.5 font-semibold text-gray-800 dark:text-white">
							<CheckCircle2 className="text-green-500" />
							Delivered!
						</h3>
						<p className="mt-2  font-semibold text-xs text-gray-600 dark:text-gray-400">
							Delivered. Contact our customer care for any queries.
						</p>
					</div>
					{/* <!-- End Right Content --> */}
				</div>
			</div>
		</>
	);
};

export default Trackbar;

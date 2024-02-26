import { CheckCircle2, PackageCheck, Truck } from "lucide-react";

const Trackbar = () => {
    return (
      <>
        {/* <!-- Timeline --> */}
        <div className="max-w-[500px] w-full ">
          {/* <!-- Heading --> */}
          <div className="ps-2 my-2 first:mt-0 p-4">
            <h3 className="text-xs font-medium uppercase text-gray-500 dark:text-gray-400">
              Feb 23, 2024
            </h3>
          </div>
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
            <div className="grow pt-2 bg-gray-200 rounded-xl p-2">
              <h3 className="flex gap-x-1.5 font-semibold text-gray-800 dark:text-white">
                <PackageCheck className="text-yellow-500"/>
                Order Recieved.
              </h3>
              <p className="mt-1 text-xs text-gray-600 dark:text-gray-400">
                You order will be processed and shipped soon.
              </p>
              <p className="mt-1 font-semibold text-xs text-gray-600 dark:text-gray-400">
                Order Shipped!! - 23/02/2024 10:36 pm.
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
            <div className="grow pt-0.5 pb-8 p-2 mt-4">
              <h3 className="flex gap-x-1.5 font-semibold text-gray-800 dark:text-white">
              <Truck className="text-blue-400"/>
                Order in transit.
              </h3>
              <p className="mt-2 text-xs text-gray-600 dark:text-gray-400">Your products are on the way!</p>
              <p className="mt-2  font-semibold text-xs text-gray-600 dark:text-gray-400">Out for delivery - 27/02/2024 01:07 pm.</p>
                
             
              
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
            <div className="grow pt-0.5 pb-8 p-2">
              <h3 className="flex gap-x-1.5 font-semibold text-gray-800 dark:text-white">
                <CheckCircle2 className="text-green-500"/>
                Delivered!
              </h3>
              <p className="mt-2  font-semibold text-xs text-gray-600 dark:text-gray-400">Delivered on 27/02/2023 05:13pm.</p>
              <button
                type="button"
                className="mt-1 -ms-1 p-1 inline-flex items-center gap-x-2 text-xs rounded-lg border border-transparent text-gray-500 hover:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
              >
               Need help?
              </button>
            </div>
            {/* <!-- End Right Content --> */}
          </div>
         
        </div>
      </>
    );
  };
  
  export default Trackbar;
  
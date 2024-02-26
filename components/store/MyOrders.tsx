import {
  TableHead,
  TableRow,
  TableHeader,
  TableBody,
  Table,
} from "@/components/ui/table";

import { Card } from "@/components/ui/card";
import { JSX, SVGProps } from "react";
import Link from "next/link";
import Image from "next/image";

const MyOrders = () => {
  return (
    <div className="bg-white p-8 max-w-[1460px] w-full mx-auto ">
      <h1 className="text-3xl font-bold mb-6">Order history</h1>
      <p className="mb-8">
        Check the status of recent orders, manage returns, and discover similar
        products.
      </p>
      <div className="mb-8">
        <Table>
          <TableHeader className="bg-gray-100">
            <TableRow>
              <TableHead className="text-black font-bold ">
                Order number
              </TableHead>
              <TableHead className="text-black font-bold ">
                Date placed
              </TableHead>
              <TableHead className="text-black font-bold ">
                Total amount
              </TableHead>
              <TableHead className="text-black font-bold ">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableHead>WUB819111</TableHead>
              <TableHead>Jan 6, 2024</TableHead>
              <TableHead>SAR 160.00</TableHead>
              <TableHead className="text-[#00adb5]">
                <Link href="#">Cancel</Link>
              </TableHead>
            </TableRow>
          </TableBody>
        </Table>
        <div className="flex flex-col gap-4 mt-4">
          <Card className="p-4">
            <div className="flex items-start gap-4">
              <Image 
                    src={"/sblogo.png"}
                    alt=""
                    className="relative mx-auto mt-8"
                    
                    width={60}
                    height={80}
                    objectFit="contain"/>

              <div className="flex-1">
                <h3 className=" font-semibold ">Logitech MX master 2s</h3>
                {/* <p className=" text-sm mb-2 hidden sm:flex">
                  description, description description description description
                  description description descriptiondescription description
                  description descriptiondescriptiondescription description
                  description description description descriptiondescription
                </p> */}
                <p className="text-sm font-semibold">SAR 100.00</p>
                <div className="flex items-center mt-2">
                  <CheckCircleIcon className="text-green-500 mr-2" />
                  <span className="text-xs">Delivered </span>
                </div>
              </div>
            </div>
            <div className="flex justify-end mt-2">
              <div className="px-4 text-sm text-[#00adb5] font-bold">
                <Link href={""}>View Product</Link>
              </div>{" "}
              |
              <div className="px-4 text-sm text-[#00adb5] font-bold">
                <Link href={""}>More Details</Link>
              </div>
            </div>
          </Card>

         
        </div>
      </div>
     
      
    </div>
  );
};

function CheckCircleIcon(
  props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>
) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
      <polyline points="22 4 12 14.01 9 11.01" />
    </svg>
  );
}
export default MyOrders;

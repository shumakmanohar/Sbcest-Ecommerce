"use client";

import { ColumnDef } from "@tanstack/react-table";

import type { Order } from "@prisma/client";

import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
	ArrowsUpDownIcon,
	
	EllipsisHorizontalCircleIcon,

} from "@heroicons/react/24/outline";



import Link from "next/link";

export const columns: ColumnDef<Order>[] = [
	{
		accessorKey: "id",
		header: "Order ID",
	
	},
	{
		accessorKey: "amount",
		header: "Amount",
	},
	{
		accessorKey: "deliveryStatus",
		header: "Delivery Status",
	},
	{
		accessorKey: "paymentStatus",
		header: "Payment Status",
	},
	{
		accessorKey: "email",
		header: "User Email"
		
	},
    {
		accessorKey: "moyasarID",
		header: "Payment ID"
		
	},
    // {
	// 	accessorKey: "shippingInformation",
	// 	header: "Address"
		
	// },
    // {
	// 	accessorKey: "orderedProducts",
	// 	header: ""
		
	// },
    

	
	{
		id: "actions",
		cell: ({ row, cell }) => {
			const id = cell.row.original.id;

			return (
				<DropdownMenu>
					<DropdownMenuTrigger>
						<EllipsisHorizontalCircleIcon className="h-6 w-6 " />
					</DropdownMenuTrigger>
					<DropdownMenuContent>
						<DropdownMenuLabel>Order</DropdownMenuLabel>
						<DropdownMenuSeparator />
						<DropdownMenuItem>
							<Link href={`/cms/orders/${id}`} className="w-full">
								View More
							</Link>
						</DropdownMenuItem>
						<DropdownMenuItem>Copy ID</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>
			);
		},
	},
];

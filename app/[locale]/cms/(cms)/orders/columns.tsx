"use client";

import { ColumnDef } from "@tanstack/react-table";
import type { Order, Product } from "@prisma/client";

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
	CheckCircleIcon,
	EllipsisHorizontalCircleIcon,
	StarIcon,
	XCircleIcon,
} from "@heroicons/react/24/outline";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { CMS_CONFIG } from "@/cms.config";
import Link from "next/link";

export const columns: ColumnDef<Order>[] = [
	{
		accessorKey: "id",
		header: () => <div className="text-center">ORDER ID</div>,
	},
	{
		accessorKey: "email",
		header: () => <div className="text-center">Email</div>,
	},
	{
		accessorKey: "amount",
		header: () => <div className="text-center">Amount</div>,
	},
	{
		accessorKey: "moyasarID",
		header: () => <div className="text-center">Moyasar ID</div>,
	},
	{
		accessorKey: "paymentStatus",
		header: () => <div className="text-center">Payment Status</div>,
	},
	{
		accessorKey: "deliveryStatus",
		header: () => <div className="text-center">Delivery Status</div>,
	},
	{
		id: "actions",
		cell: ({ row, cell }) => {
			const id = cell.row.original.id;
			return (
				<div>
					<Link href={`/cms/orders/${id}`} className="text-blue-500 underline">
						View More
					</Link>
				</div>
			);
		},
	},
];

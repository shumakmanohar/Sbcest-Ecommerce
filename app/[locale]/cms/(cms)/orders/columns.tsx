"use client";

import { ColumnDef } from "@tanstack/react-table";
import { PaymentStatus, type Order, DeliveryStatus } from "@prisma/client";
import Link from "next/link";
import { Eye } from "lucide-react";

export const columns: ColumnDef<Order>[] = [
	{
		accessorKey: "id",
		header: () => <div className="text-center">ORDER ID</div>,
	},
	{
		accessorKey: "updatedAt",
		header: () => <div className="text-center">Date </div>,
		cell: ({ row }) => {
			const date = new Date(row.getValue("updatedAt"));
			const formatted = date.toLocaleDateString();
			return <div>{formatted}</div>;
		},
	},
	{
		accessorKey: "name",
		header: () => <div className="text-center">Name</div>,
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
		cell: ({ row }) => {
			let txt;
			let clr;
			switch (row.getValue("paymentStatus")) {
				case PaymentStatus.FAILED:
					txt = PaymentStatus.FAILED;
					clr = "border-red-600 text-red-600";
					break;
				case PaymentStatus.SUCCESS:
					// code block
					txt = PaymentStatus.SUCCESS;
					clr = "border-green-600 text-green-600";
					break;
				default:
					txt = PaymentStatus.PENDING;
					clr = "border-gray-600 text-gray-600";
				// code block
			}

			return (
				<div className="flex items-center justify-center">
					<span className={`border p-2 rounded-lg ${clr}`}>{txt}</span>
				</div>
			);
		},
	},
	{
		accessorKey: "deliveryStatus",
		header: () => <div className="text-center">Delivery Status </div>,
		cell: ({ row }) => {
			let txt;
			let clr;
			switch (row.getValue("deliveryStatus")) {
				case DeliveryStatus.RECIEVED:
					// code block
					txt = DeliveryStatus.RECIEVED;
					clr = "border-green-600 text-green-600";
					break;
				case DeliveryStatus.TRANSIT:
					// code block
					txt = DeliveryStatus.TRANSIT;
					clr = "border-blue-600 text-blue-600";
					break;
				case DeliveryStatus.DELIVERED:
					// code block
					txt = DeliveryStatus.DELIVERED;
					clr = "border-green-600 text-green-600";
					break;
				default:
					txt = PaymentStatus.PENDING;
					clr = "border-red-600 text-red-600";

				// code block
			}

			return (
				<div className="flex items-center justify-center">
					<span className={`border p-2 rounded-lg ${clr}`}>{txt}</span>
				</div>
			);
		},
	},
	{
		id: "actions",
		cell: ({ row, cell }) => {
			const id = cell.row.original.id;
			return (
				<div>
					<Link href={`/cms/orders/${id}`}>
						<Eye />
					</Link>
				</div>
			);
		},
	},
];

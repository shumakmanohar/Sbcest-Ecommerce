"use client";

import { ColumnDef } from "@tanstack/react-table";
import type { Product } from "@prisma/client";

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

export const columns: ColumnDef<Product>[] = [
	{
		accessorKey: "previewImg",
		header: "Preview",
		cell: ({ row }) => {
			const imgSrcDB = row.getValue("previewImg");
			let src =
				imgSrcDB === ""
					? "/sblogo.png"
					: `${CMS_CONFIG.cdn.location}/${imgSrcDB}`;

			return (
				<div>
					<Image alt="Uploaded Image" width="100" height="100" src={src} />
				</div>
			);
		},
	},
	{
		accessorKey: "title",
		header: "Title",
	},
	{
		accessorKey: "category.name",
		header: "Category",
	},
	{
		accessorKey: "isFeatured",
		header: ({ column }) => {
			return (
				<Button
					variant="ghost"
					onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
				>
					Featured
					<ArrowsUpDownIcon className="ml-2 h-4 w-4" />
				</Button>
			);
		},
		cell: ({ row }) => {
			const icon = row.getValue("isFeatured") ? (
				<div className="flex items-center justify-center">
					<StarIcon className="w-6 h-6 text-yellow-600" />
				</div>
			) : (
				""
			);
			return icon;
		},
	},
	{
		accessorKey: "price",
		header: ({ column }) => {
			return (
				<Button
					variant="ghost"
					onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
				>
					Price
					<ArrowsUpDownIcon className="ml-2 h-4 w-4" />
				</Button>
			);
		},
	},

	{
		accessorKey: "isOnOffer",
		header: ({ column }) => {
			return (
				<Button
					variant="ghost"
					onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
				>
					Offer
					<ArrowsUpDownIcon className="ml-2 h-4 w-4" />
				</Button>
			);
		},
		cell: ({ row }) => {
			const icon = row.getValue("isOnOffer") ? (
				<span className="text-green-600 border border-green-600 p-2 rounded-lg">
					Active
				</span>
			) : (
				<span className="p-2 shadow-sm rounded-lg border border-blue-600 text-blue-600">
					Not Active
				</span>
			);
			return icon;
		},
	},
	{
		accessorKey: "offerPrice",
		header: ({ column }) => {
			return (
				<Button
					variant="ghost"
					onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
				>
					Offer Price
					<ArrowsUpDownIcon className="ml-2 h-4 w-4" />
				</Button>
			);
		},
	},

	{
		accessorKey: "isArchived",
		header: ({ column }) => {
			return (
				<Button
					variant="ghost"
					onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
				>
					Archived
					<ArrowsUpDownIcon className="ml-2 h-4 w-4" />
				</Button>
			);
		},
		cell: ({ row }) => {
			const icon = row.getValue("isArchived") ? (
				<div className="flex items-center justify-center">
					<span className="border border-red-600 text-red-600 p-2 rounded-lg">
						Archived
					</span>
				</div>
			) : (
				<div className="flex items-center justify-center">
					<span className="border border-green-600 text-green-600 p-2 rounded-lg">
						In Store
					</span>
				</div>
			);
			return icon;
		},
	},
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
						<DropdownMenuLabel>Product</DropdownMenuLabel>
						<DropdownMenuSeparator />
						<DropdownMenuItem>
							<Link href={`/cms/products/${id}`} className="w-full">
								Edit
							</Link>
						</DropdownMenuItem>
						<DropdownMenuItem>Copy ID</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>
			);
		},
	},
];

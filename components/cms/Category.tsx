"use client";
import { PencilIcon, Trash2Icon, TrashIcon } from "lucide-react";
import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

import type { Categories } from "@prisma/client";
import { Card, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import Link from "next/link";

const Category = ({
	id,
	name,
	ar_name,
}: {
	id: string;
	name: string;
	ar_name: string;
}) => {
	return (
		<>
			<Card className="w-full max-w-md">
				<CardHeader className="flex flex-row items-center space-y-0">
					<div className="grid gap-1">
						<CardTitle className="text-lg">{name}</CardTitle>
						<CardDescription className="text-sm text-gray-500 dark:text-gray-400">
							{ar_name}
						</CardDescription>
					</div>
					<div className="ml-auto flex items-center gap-2">
						<Link href={`/cms/categories/${id}`} className="w-full">
							<PencilIcon className="h-4 w-4" />
							<span className="sr-only">Edit</span>
						</Link>
					</div>
				</CardHeader>
			</Card>
		</>
	);
};
export default Category;

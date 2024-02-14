"use client";
import { CMS_CONFIG } from "@/cms.config";
import { S3ImagesDelete } from "@/server-actions/Upload-Image-Action";
import { StarIcon, TrashIcon } from "@heroicons/react/24/solid";
import Image from "next/image";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { Button } from "../ui/button";
import Loader from "./Loader";

type UploadedImageProps = {
	img: string;
	images: string[];
	previewImg: string;
	onUploadedImageChange: (imgs: string[]) => void;
	onChangePreviewImg: (img: string) => void;
};

const UploadedImage = ({
	img,
	previewImg,
	images,
	onUploadedImageChange,
	onChangePreviewImg,
}: UploadedImageProps) => {
	const [deleteLoading, setDeleteLoading] = useState(false);
	const deleteImage = async (img: string) => {
		setDeleteLoading(true);
		let newImages = images.filter((allImg) => allImg !== img);
		const response = await S3ImagesDelete([img]);
		if (response) {
			onUploadedImageChange(newImages);
			setDeleteLoading(false);
		} else {
			toast.error("Something went wrong , please try again");
		}
	};

	return (
		<div className="uploadedImage">
			<Button
				variant="outline"
				className="absolute  right-2 top-1 z-10 p-2 flex items-center"
				onClick={() => {
					deleteImage(img);
				}}
				disabled={deleteLoading}
			>
				{deleteLoading ? <Loader /> : <TrashIcon className="h-4 w-4" />}
			</Button>
			<button className="absolute top-1 left-2 z-10">
				<StarIcon
					className={`w-6 h-6 ${previewImg === img && " text-yellow-500"}  `}
					onClick={() => onChangePreviewImg(img)}
				/>
			</button>
			<div className="relative w-[100%] h-[200px]">
				<Image
					alt="Uploaded Image"
					fill
					objectFit="cover"
					sizes="(max-width:200px),100px, 50vw"
					src={`${CMS_CONFIG.cdn.location}/${img}`}
				/>
			</div>
		</div>
	);
};

export default UploadedImage;

import { CMS_CONFIG } from "@/cms.config";
import { StarIcon, TrashIcon } from "@heroicons/react/24/solid";
import Image from "next/image";
import React from "react";

type UploadedImageProps = {
	img: string;
	previewImg: string;
	onChangePreviewImg: (img: string) => void;
};

const UploadedImage = ({
	img,
	previewImg,
	onChangePreviewImg,
}: UploadedImageProps) => {
	return (
		<div className="uploadedImage">
			<button className="absolute top-0 right-0 z-10 bg-black p-2">
				<TrashIcon className="w-6 h-6 text-red-500 " />
			</button>
			<button className="absolute top-0 left-0 z-10">
				<StarIcon
					className={`w-6 h-6 ${previewImg === img && " text-yellow-500"}  `}
					onClick={() => onChangePreviewImg(img)}
				/>
			</button>
			<Image
				alt="Uploaded Image"
				fill
				sizes="(max-width:768px),700px, 100vw"
				src={`${CMS_CONFIG.cdn.location}/${img}`}
			/>
		</div>
	);
};

export default UploadedImage;

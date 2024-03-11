"use client";

import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";

import toast, { Toaster } from "react-hot-toast";

import { Button } from "../ui/button";
import { CloudArrowUpIcon, PhotoIcon } from "@heroicons/react/24/solid";
import { ServerResponse } from "@/util/Enums";
import { S3ImageUpload } from "@/server-actions/Upload-Image-Action";
import Loader from "./Loader";
import { useState } from "react";
import { useFormStatus } from "react-dom";
import Image from "next/image";

const MAX_FILE_UPLOAD_SUPPORTED = 5;
type ImageUploadProps = {
	onChange: (value: string[]) => void;
};

const convertFileListToArray = (files: FileList) => {
	const filesArray: (File | null)[] = new Array<File>(); // create a new array which can have null value or File child value
	const length = files.length; // Setting the Lenght of the Array from the file List Given

	for (let i = 0; i < length; i++) {
		filesArray[i] = files.item(i);
	}

	return filesArray;
};

const ImpageUploaderBtn = () => {
	const { pending } = useFormStatus();
	return (
		<Button
			aria-disabled={pending}
			disabled={pending}
			className="w-full"
			type="submit"
		>
			{pending ? <Loader /> : "Upload Image"}
		</Button>
	);
};

const ImageUploader = ({ onChange }: ImageUploadProps) => {
	const [selectedImages, setSelectedImages] = useState<string[] | null>(null);

	const onImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		if (!event.target.files) return;

		if (event.target.files?.length > MAX_FILE_UPLOAD_SUPPORTED) {
			event.preventDefault();
			toast.error("Max File Upload : 5");
			return;
		}

		let files = convertFileListToArray(event.target.files);

		const blobImageArray = files.map((file) =>
			URL.createObjectURL(file as Blob)
		);

		setSelectedImages([...blobImageArray]);
	};

	const clientAction = async (formData: FormData) => {
		const response = await S3ImageUpload(formData);
		response.status == ServerResponse.Success
			? (toast.success("Image Uploaded Successfully"),
			  onChange(response.UploadedFiles!),
			  setSelectedImages(null))
			: toast.error("Something Went Wrong. Check Console");
	};

	return (
		<Dialog onOpenChange={() => setSelectedImages(null)}>
			<DialogTrigger className="bg-[#00ADB5] mt-8 text-white p-2 rounded-lg  inline-flex items-center max-w-[200px]">
				<PhotoIcon className="h-6 w-6 mr-2" />
				<span className="text-sm ">S3 Image Uploads</span>
			</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Upload Image</DialogTitle>
					<DialogDescription>Select Files</DialogDescription>
				</DialogHeader>
				<form className="w-full  flex flex-col gap-4" action={clientAction}>
					<input
						type="file"
						name="file"
						id="fileUpload"
						accept="image/png, image/jpeg"
						onChange={onImageChange}
						multiple
						hidden
					/>
					<label
						htmlFor="fileUpload"
						className="cursor-pointer border border-dashed p-8  flex items-center justify-center"
					>
						<div className="flex flex-col items-center">
							<CloudArrowUpIcon className="h-10 w-10 text-white" />
							<p className="text-sm text-muted-foreground">
								Click to upload pictures [ Maxium Files : 5 ]
							</p>
						</div>
					</label>
					<div className="grid grid-cols-3 mt-8 gap-3 max-h-[400px] overflow-auto">
						{selectedImages?.map((img, key) => (
							<Image
								alt="preview image"
								className="object-contain"
								height={500}
								width={500}
								src={img}
								key={key}
							/>
						))}
					</div>
					{selectedImages?.length !== 0 && selectedImages && (
						<ImpageUploaderBtn />
					)}
				</form>
			</DialogContent>
		</Dialog>
	);
};

export default ImageUploader;

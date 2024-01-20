"use server";
import { revalidatePath } from "next/cache";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { ServerResponse } from "@/util/Enums";
import { v4 as uuidv4 } from "uuid";

const s3Client = new S3Client({
	region: process.env.AWS_REGION,
	credentials: {
		accessKeyId: process.env.AWS_PUBLIC_ACCESS_KEY ?? "",
		secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY ?? "",
	},
});

async function uploadFileToS3(
	file: Buffer,
	fileName: string,
	fileType: string
) {
	const fileBuffer = file;

	const params = {
		Bucket: process.env.AWS_BUCKET_NAME,
		Key: `${fileName}`,
		Body: fileBuffer,
		ContentType: fileType,
	};

	const command = new PutObjectCommand(params);
	try {
		const response = await s3Client.send(command);
		console.log("File uploaded successfully:", response);
	} catch (error) {
		throw error;
	}
}

export async function S3ImageUpload(formData: FormData) {
	const files = formData.getAll("file") as File[];

	if (files.length > 5 || files.length == 0)
		return {
			status: ServerResponse.Failure,
			message: "Failed to upload file.",
		};

	let uploadedStatus = true; // To know whether files have been successfully updated or not
	let uploadedErrorMsg; // To save the error msg, displayed during the upload process

	const UploadedFiles = await Promise.all(
		files.map(async (file) => {
			const newFileName = `${uuidv4()}-${file.name}`;
			const buffer = Buffer.from(await file.arrayBuffer());

			await uploadFileToS3(buffer, newFileName, file.type);
			return newFileName;
		})
	).catch((err) => {
		console.log(err);
		uploadedStatus = false;
		uploadedErrorMsg = err;
	});

	if (!uploadedStatus) {
		return {
			status: ServerResponse.Failure,
			message: `Failed to upload file. ${uploadedErrorMsg}`,
		};
	}

	return {
		status: ServerResponse.Success,
		message: "File Uploaded",
		UploadedFiles,
	};
}

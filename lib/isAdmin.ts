import { auth, currentUser } from "@clerk/nextjs";

export const isAdmin = async () => {
	const { userId } = auth();
	const user = await currentUser();
	console.log(user, userId);
	if (
		userId &&
		user?.publicMetadata.isAdmin &&
		user?.privateMetadata.isPrivileged
	) {
		return true;
	}
	return false;
};

import { auth, currentUser } from "@clerk/nextjs";

export const isAdmin = async () => {
	const { userId } = auth();
	const user = await currentUser();

	console.log("userId", userId);
	console.log("user", user);
	if (userId && user?.publicMetadata.isAdmin) {
		return true;
	}
	return false;
};

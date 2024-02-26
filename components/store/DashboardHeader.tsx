import { UserButton } from "@clerk/nextjs";

const DashboardHeader = ({ name }: { name: string | undefined | null }) => {
	return (
		<div className="flex items-center gap-8 my-16">
			<div className="p-2 flex items-center justify-center rounded-full border-cyan-500 border">
				<UserButton afterSignOutUrl="/" />
			</div>
			<div className="grow">
				<h1 className="text-xl md:text-3xl font-semibold">
					Hi 👋 <span className="mx-3">{name}</span>
				</h1>
				<p className="text-sm mt-2 text-cyan-700 font-semibold">Sign out</p>
			</div>
		</div>
	);
};

export default DashboardHeader;

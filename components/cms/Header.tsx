import { Separator } from "@/components/ui/separator";

type Header = {
	heading: String | undefined;
	description: String | undefined;
};

const Header = ({
	heading = "Oflyne CMS",
	description = "Oflyne CMS",
}: Header) => {
	return (
		<>
			<div className="flex  items-center justify-between">
				<div>
					<h1 className="text-3xl mt-16">{heading} </h1>
					<p className="text-sm text-muted-foreground pb-8">{description}</p>
				</div>
				<div></div>
			</div>
			<Separator />
		</>
	);
};

export default Header;

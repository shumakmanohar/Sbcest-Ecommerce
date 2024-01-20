import { Separator } from "@/components/ui/separator";
import React from "react";

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
			<h1 className="text-3xl mt-16">{heading} </h1>
			<p className="text-sm text-muted-foreground pb-8">{description}</p>
			<Separator />
		</>
	);
};

export default Header;

import React from "react";

const Wrapper = ({
	children,
	className,
}: {
	children: React.ReactNode;
	className?: String;
}) => {
	return (
		<div
			className={`w-full max-w-[1460px] px-5 md:px-10 mx-auto  ${
				className || ""
			}`}
		>
			{children}
		</div>
	);
};

export default Wrapper;

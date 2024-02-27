import SkeletonProductList from "@/components/store/SkeletonProductList";
import Wrapper from "@/components/store/Wrapper";
import React from "react";

const loading = () => {
	return (
		<Wrapper>
			<SkeletonProductList />
		</Wrapper>
	);
};

export default loading;

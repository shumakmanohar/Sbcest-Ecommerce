import { GetCategories } from "@/server-actions/Category-Action";
import React from "react";

const SelectCategory = async () => {
	const categories = await GetCategories();
	return <></>;
};

export default SelectCategory;

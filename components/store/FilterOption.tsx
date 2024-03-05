import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ScrollArea } from "../ui/scroll-area";
import { IoIosArrowDown } from "react-icons/io";
import type { Categories } from "@prisma/client";
import { FilterType } from "@/util/Types";
import { useLocale } from "next-intl";

const FilterOption = ({
	categoriesList,
	filterList,
	selectedCategoryID,
	selectedFilterID,
	handleChangeCategory,
	handleChangeFilter,
}: {
	categoriesList: Categories[] | undefined;
	filterList: FilterType[];
	selectedCategoryID: string | undefined;
	selectedFilterID: string | undefined;
	handleChangeCategory: (category: Categories) => void;
	handleChangeFilter: (filter: FilterType) => void;
}) => {
	const activeLocale = useLocale();
	return (
		<div className="flex items-center gap-4 mb-4 ">
			<DropdownMenu>
				<DropdownMenuTrigger className="filter-btn">
					<span>{activeLocale === "ar" ? "مرشح المنتج" : "Filter"}</span>
					<IoIosArrowDown size={20} />
				</DropdownMenuTrigger>
				<DropdownMenuContent>
					<ScrollArea className=" w-full ">
						{filterList?.map((filter, _indx) => (
							<DropdownMenuItem
								key={_indx}
								className="my-4  justify-between"
								onClick={() => {
									handleChangeFilter(filter);
								}}
							>
								<label htmlFor="css" className="text-[0.875rem]">
									{filter.name}
								</label>
								<input
									type="radio"
									id="javascript"
									name="fav_language"
									value="JavaScript"
									className="w-6 h-6"
									readOnly
									checked={filter.id === selectedFilterID}
								></input>
							</DropdownMenuItem>
						))}
					</ScrollArea>
				</DropdownMenuContent>
			</DropdownMenu>
			<DropdownMenu>
				<DropdownMenuTrigger className="filter-btn">
					<span> {activeLocale == "en" ? "Categories" : "فئات المنتجات"}</span>
					<IoIosArrowDown size={20} />
				</DropdownMenuTrigger>

				<DropdownMenuContent>
					<ScrollArea className="min-h-[80px] h-[350px] w-full ">
						{categoriesList?.map((category, _indx) => (
							<DropdownMenuItem
								key={`CatID${category.id}`}
								className="my-4  justify-between"
								onClick={() => {
									handleChangeCategory(category);
								}}
							>
								<label htmlFor="css" className="text-[0.875rem]">
									{activeLocale === "en" ? category.name : category.ar_name}
								</label>
								<input
									type="radio"
									id="javascript"
									name="fav_language"
									value="JavaScript"
									className="w-6 h-6"
									readOnly
									checked={category.id === selectedCategoryID}
								></input>
							</DropdownMenuItem>
						))}
					</ScrollArea>
				</DropdownMenuContent>
			</DropdownMenu>
		</div>
	);
};

export default FilterOption;

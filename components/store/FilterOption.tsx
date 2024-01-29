import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ScrollArea } from "../ui/scroll-area";
import { IoIosArrowDown } from "react-icons/io";
import type { Categories } from "@prisma/client";

const FilterOption = ({
	categoriesList,
	handleChangeCategory,
	selectedCategoryID,
}: {
	categoriesList: Categories[] | undefined;
	handleChangeCategory: (category: Categories) => void;
	selectedCategoryID: string | undefined;
}) => {
	return (
		<div className="flex items-center gap-4 mb-4">
			<DropdownMenu>
				<DropdownMenuTrigger className="filter-btn">
					<span>Filter</span>
					<IoIosArrowDown />
				</DropdownMenuTrigger>
				<DropdownMenuContent>
					<DropdownMenuItem className="my-4 w-full justify-between">
						<label htmlFor="css" className="text-[0.875rem]">
							Price: low to high
						</label>
						<input
							type="radio"
							id="javascript"
							name="fav_language"
							value="JavaScript"
							className="w-6 h-6"
						></input>
					</DropdownMenuItem>
				</DropdownMenuContent>
			</DropdownMenu>
			<DropdownMenu>
				<DropdownMenuTrigger className="filter-btn">
					<span>Categories</span>
					<IoIosArrowDown />
				</DropdownMenuTrigger>

				<DropdownMenuContent>
					<ScrollArea className="min-h-[80px] h-[400px] w-full ">
						{categoriesList?.map((category) => (
							<DropdownMenuItem
								className="my-4  justify-between"
								onClick={() => {
									handleChangeCategory(category);
									console.log("u lickked", category);
								}}
							>
								<label htmlFor="css" className="text-[0.875rem]">
									{category.name}
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

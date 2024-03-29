import ProductCard from "@/components/store/ProductCard";
import ProductList from "@/components/store/ProductList";
import Wrapper from "@/components/store/Wrapper";
import { GetCategories } from "@/server-actions/Category-Action";
import { FetchStoreProducts } from "@/server-actions/Product-Actions";
import { EnumPriceFilter } from "@/util/Enums";
import { getTranslations, unstable_setRequestLocale } from "next-intl/server";

const page = async ({
	searchParams,
	params,
}: {
	searchParams: {
		[key: string]: string | string[] | undefined;
	};
	params: { locale: string };
}) => {
	//const products = await getProducts();
	unstable_setRequestLocale(params.locale);
	const t = await getTranslations("Products");
	const searchQuery = searchParams["s"];
	const { products } = await FetchStoreProducts(1, searchQuery as string);
	const { data: categoriesList } = await GetCategories();
	const filterOptionsData = [
		{
			name: `${t("lth")}`,
			arName: "Price: low to high",
			id: EnumPriceFilter.lTh,
		},
		{
			name: `${t("htl")}`,
			arName: "Price: high to low",
			id: EnumPriceFilter.hTl,
		},
	];
	return (
		<Wrapper>
			{/* Dynamic Title */}

			<div className="mt-20 mb-10">
				<div>
					{searchQuery ? (
						<h2 className="text-3xl md:text-4xl ">
							{t("srch")}{" "}
							<span className="font-bold">&quot;{searchQuery}&ldquo;</span>
						</h2>
					) : (
						<h2 className="text-3xl md:text-4xl font-semibold">{t("head")}</h2>
					)}

					<p className="text-muted-foreground text-sm mt-2">{t("sub head")}</p>
				</div>
			</div>

			<ProductList
				key={Math.random()}
				initialProducts={products}
				categoriesList={categoriesList}
				filterList={filterOptionsData}
				searchQuery={searchQuery as string}
			/>
		</Wrapper>
	);
};

export default page;

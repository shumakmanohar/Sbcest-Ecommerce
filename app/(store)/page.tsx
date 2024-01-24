import HeroBanner from "@/components/store/HeroBanner";

export default function Home() {
	const tempItem = {
		id: "65abf3fd3214982434e1221b8a",
		title:
			"LENOVO 16 inch ThinkPad E16 Gen 1 i5 1335U RAM 8GB 512GB M.2 - BLACK",
		description: "",
		ar_title: "dasdasdas",
		ar_description: "asdasdasasd",
		price: 400,
		isOnOffer: false,
		offerPrice: 0,
		isArchived: false,
		isFeatured: false,
		images: [],
		previewImg: "",
		categoryId: "65abf3b43214982434e13b88",
		createdAt: "2024-01-20T16:25:33.051Z",
		updatedAt: "2024-01-20T16:25:33.051Z",
		category: {
			id: "65abf3b43214982434e13b88",
			name: "Display",
			ar_name: "Display",
			createdAt: "2024-01-20T16:24:20.098Z",
			updatedAt: "2024-01-20T16:24:20.098Z",
		},
	};

	return (
		<main>
			<HeroBanner />
		</main>
	);
}

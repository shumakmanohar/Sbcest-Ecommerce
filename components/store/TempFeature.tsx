const products = [
	{
		name: "RALLY PLUS",
		description:
			"Premier modular video conferencing system for large and extra-large rooms.",
		price: 500,
		originalPrice: 799,
		discount: 37.42,
		image: "/asus.png",
		category: "Notebook",
	},
	{
		name: "RALLY PLUS",
		description:
			"Premier modular video conferencing system for large and extra-large rooms.",
		price: 500,
		originalPrice: 799,
		discount: 37.42,
		image: "/mac.png",
		category: "Notebook",
	},
	{
		name: "RALLY PLUS",
		description:
			"Premier modular video conferencing system for large and extra-large rooms.",
		price: 500,
		originalPrice: 799,
		discount: 37.42,
		image: "/samsung.webp",
		category: "Phone",
	},
	{
		name: "RALLY PLUS",
		description:
			"Premier modular video conferencing system for large and extra-large rooms.",
		price: 500,
		originalPrice: 799,
		discount: 37.42,
		image: "/imac.jpg",
		category: "Desktop",
	},
	{
		name: "RALLY PLUS",
		description:
			"Premier modular video conferencing system for large and extra-large rooms.",
		price: 500,
		originalPrice: 799,
		discount: 37.42,
		image: "/sbook.webp",
		category: "Notebook",
	},
	{
		name: "RALLY PLUS",
		description:
			"Premier modular video conferencing system for large and extra-large rooms.",
		price: 500,
		originalPrice: 799,
		discount: 37.42,
		image: "/iwatch.jpg",
		category: "Smart watch",
	},

	// Add other products similarly
];

const TempFeature = () => {
	return (
		<section
			key="1"
			aria-labelledby="featured-section-heading"
			className="py-12 mt-2"
		>
			<div className="max-w-[1460px] mx-auto px-4 sm:px-6 lg:px-8">
				<h2
					className="text-1xl sm:text-sm md:text-2xl lg:text-3xl font-extrabold text-gray-900 mb-8"
					id="featured-section-heading"
				>
					Exclusive Products
				</h2>
				<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 ">
					{products.map((product, index) => (
						<div
							key={index}
							className="flex flex-col items-start  transition-transform duration-500 hover:scale-105 cursor-pointer hover:shadow-lg"
						>
							<img
								alt={product.name}
								className="mb-4 transform aspect-square mx-auto"
								src={"/sblogo.png"}
								style={{
									objectFit: "cover",
									maxWidth: "272px",
									maxHeight: "310px",
								}}
							/>
							<h3 className="text-sm font-semibold">{product.name}</h3>
							<p className="text-xs text-gray-500 mt-2 w-3/4">
								{product.description}
							</p>
							<p className="mt-2 text-sm font-semibold">{`SR ${product.price}`}</p>
							<p className="text-xs font-medium line-through text-red-500">{`SR${product.originalPrice}`}</p>
							<p className="ml-auto text-xs font-medium text-green-500">{`${product.discount}% off`}</p>
							<p className="text-xs text-white bg-black rounded-full px-2">
								{product.category}
							</p>
						</div>
					))}
				</div>
				<div className="flex justify-center mt-8">
					<button className="px-6 py-2 rounded-full bg-[#00adb5] text-white hover:scale-110 transition-transform duration-200 ease-in-out font-semibold">
						View more
					</button>
				</div>
			</div>
		</section>
	);
};

export default TempFeature;

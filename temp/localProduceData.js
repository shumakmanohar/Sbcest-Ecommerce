const localProductData = [
	{
		data: [
			{
				attributes: {
					id: "1",
					name: "Microsoft Surface 9 Pro",
					subtitle: "Notebook",
					price: 100000,
					original_price: 120000,
					color: {
						data: [
							{ color: "Blue", enabled: true },
							{ color: "Grey", enabled: true },
							{ color: "White", enabled: false },
						],
					},
					description: "Product 1 Description",
					images: {
						data: [{ url: "/p1.png", alt: "Image 1" }],
					},
				},
			},
		],
	},
	{
		data: [
			{
				attributes: {
					id: "2",
					name: "Product 2",
					subtitle: "Product 2 Subtitle",
					price: 150,
					original_price: 180,
					color: {
						data: [
							{ color: "Black", enabled: true },
							{ color: "Gold", enabled: true },
							{ color: "White", enabled: true },
						],
					},
					description: "Product 2 Description",
					images: {
						data: [{ url: "image3.jpg", alt: "Image 3" }],
					},
				},
			},
		],
	},
	// Add more products as needed
];

export default localProductData;

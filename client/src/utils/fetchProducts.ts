export async function fetchProducts(
	limit: string = "5",
	sortBy: string = "UPDATED_TIME_DESC"
) {
	const response = await fetch(
		`https://app.ecwid.com/api/v3/101560752/products?limit=${limit}&sortBy=${sortBy}`,
		{
			headers: {
				"Content-Type": "application/json",
				Authorization: "Bearer public_eaBDuVmrse1hKZun4qaPF3LewugrnEgq",
			},
		}
	);

	const data = await response.json();
	return data.items;
}

import { ApiConfig } from "@common/types/api"
import { normalizeProduct, getAllProductsQuery } from "../utils"
import { ProductConnection } from "../schema"
import { Product } from "@common/types/product"

type ReturnType = {
	products: ProductConnection
}

const getAllProducts = async (config: ApiConfig): Promise<Product[]> => {
	const { data } = await config.fetch<ReturnType>({
		url: config.apiURL,
		query: getAllProductsQuery,
	})

	const products =
		data.products.edges.map(({ node: product }) => {
			return normalizeProduct(product)
		}) ?? []

	return products
}

export default getAllProducts

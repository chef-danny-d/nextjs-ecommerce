export type ApiFetchOptions = {
	url: string
	query: string
}

export type ApiFetchResults<T> = {
	data: T
}

export interface ApiConfig {
	apiURL: string
	fetch<T>(options: ApiFetchOptions): Promise<ApiFetchResults<T>>
}

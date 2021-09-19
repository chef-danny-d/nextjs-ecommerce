type FetchParams = {
	query: string;
};

type FetchResult<T> = { data: T };

const fetchApi = async <T>({ query }: FetchParams): Promise<FetchResult<T>> => {
	const url = "http://localhost:4000/graphql";

	const res = await fetch(url, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({ query }),
	});

	const { data, errors } = await res.json();

	// ?? is checking if left hand expression is null or undefined; right hand is fallback option
	if (errors) throw new Error(errors[0].message ?? errors.message);

	return { data };
};

export default fetchApi;

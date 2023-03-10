import axios, { AxiosInstance } from "axios";

import camelcaseKeys from "camelcase-keys";

const getLinkData = async (link: string | undefined) => {
	if (!link) return undefined;

	const response = await axios.get(link);

	if (!response.data) return undefined;

	return camelcaseKeys(response.data, { deep: true });
};

const getData = async <Data, Parameters = void>(
	axiosInstance: AxiosInstance,
	endpoint: string,
	params?:
		| Parameters
		| Record<
				string,
				string | number | boolean | Array<string> | Array<number> | undefined
		  >,
): Promise<Data | Record<string, unknown> | undefined> => {
	const { data } = await axiosInstance.get(endpoint, { params });

	return await getLinkData(data?.link);
};

export { getData, getLinkData };

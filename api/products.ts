import apiFetch from "@/helpers/interceptors";

export const getProductsAPI = async () => {
  let path = `/product/list`;
  const { data } = await apiFetch.get(path);
  return data;
};

export const getProductByIdAPI = async (id: number) => {
  let path = `/product/single/${id}`;
  const { data } = await apiFetch.get(path);
  return data;
};

export const searchProductsAPI = async (value: string) => {
  let path = `/product/search?q=${value}`;
  const { data } = await apiFetch.get(path);
  return data;
};

export const createProductAPI = async (body: object) => {
  let path = `/product/insert`;
  const { data } = await apiFetch.post(path, body);
  return data;
};

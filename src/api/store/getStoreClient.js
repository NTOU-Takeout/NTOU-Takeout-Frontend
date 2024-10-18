const getStoreClient = {
  getStoreIdList: async (params = {}) => {
    const url = new URL(`${import.meta.env.VITE_BASE_URL}/api/store/getIdList`);
    Object.keys(params).forEach((key) => url.searchParams.append(key, params[key]));
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error('Failed to fetch store ID list');
    }
    const data = await response.json();
    return data; 
  },
  getMerchantDetails: async (id) => {
    const response = await fetch(`${import.meta.env.VITE_BASE_URL}/api/store/getDetails?id=${id}`);
    if (!response.ok) {
      throw new Error(`Failed to fetch details for merchant ID: ${id}`);
    }
    const data = await response.json();
    return data; // 返回商家详情对象
  },
};

export default getStoreClient;

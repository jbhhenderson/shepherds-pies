const _apiUrl = "/api/order";

export const getOrders = () => {
    return fetch(_apiUrl).then((res) => res.json());
};

export const getOrder = (id) => {
    return fetch(`${_apiUrl}/${id}`).then((res) => res.json());
};
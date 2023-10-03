const _apiUrl = "/api/topping";

export const getToppings = () => {
    return fetch(_apiUrl).then((res) => res.json());
};
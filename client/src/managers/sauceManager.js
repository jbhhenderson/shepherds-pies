const _apiUrl = "/api/sauce";

export const getSauces = () => {
    return fetch(_apiUrl).then((res) => res.json());
};
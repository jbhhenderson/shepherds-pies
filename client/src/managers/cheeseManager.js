const _apiUrl = "/api/cheese";

export const getCheeses = () => {
    return fetch(_apiUrl).then((res) => res.json());
};
const _apiUrl = "/api/size";

export const getSizes = () => {
    return fetch(_apiUrl).then((res) => res.json());
};
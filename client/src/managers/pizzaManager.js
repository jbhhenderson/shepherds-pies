const _apiUrl = "/api/pizza";

export const getPizza = (id) => {
    return fetch(`${_apiUrl}/${id}`).then((res) => res.json());
};
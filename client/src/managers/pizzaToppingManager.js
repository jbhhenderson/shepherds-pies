const _apiUrl = "/api/pizzaTopping";

export const addPizzaTopping = (pizzaId, toppingId) => {
    return fetch(`${_apiUrl}?pizzaId=${pizzaId}&toppingId=${toppingId}`, {
        method: "POST",
    })
}

export const removePizzaTopping = (pizzaId, toppingId) => {
    return fetch(`${_apiUrl}?pizzaId=${pizzaId}&toppingId=${toppingId}`, {
        method: "DELETE",
    })
}
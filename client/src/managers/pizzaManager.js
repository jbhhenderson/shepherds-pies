const _apiUrl = "/api/pizza";

export const getPizza = (id) => {
    return fetch(`${_apiUrl}/${id}`).then((res) => res.json());
};

export const createPizza = (pizza) => {
    return fetch(_apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(pizza)
    }).then((res) => res.json())
}

export const updatePizza = (pizzaId, pizza) => {
    return fetch(`${_apiUrl}/${pizzaId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(pizza)
    })
}

export const deletePizza = (id) => {
    return fetch(`${_apiUrl}/${id}`, {
        method: "DELETE"
    })
  }
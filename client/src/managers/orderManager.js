const _apiUrl = "/api/order";

export const getOrders = () => {
    return fetch(_apiUrl).then((res) => res.json());
};

export const getOrder = (id) => {
    return fetch(`${_apiUrl}/${id}`).then((res) => res.json());
};

export const createOrder = (order) => {
    return fetch(_apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(order)
    }).then((res) => res.json())
}

export const updateOrder = (orderId, order) => {
  return fetch(`${_apiUrl}/${orderId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(order)
  })
}

export const deleteOrder = (id) => {
  return fetch(`${_apiUrl}/${id}`, {
      method: "DELETE"
  })
}
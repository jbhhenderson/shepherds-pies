import { useEffect, useState } from "react";
import { getOrders } from "../../managers/orderManager";
import { Table } from "reactstrap";

export default function OrderList() {
    const [orders, setOrders] = useState([])

    const getAllOrders = () => {
        getOrders().then(setOrders)
    }

    useEffect(() => {
        getAllOrders()
    }, [])

    return (
        <>
        <h2>Orders</h2>
        <Table>
            <thead>
                <tr>
                    <th>Order Id</th>
                    <th>Order Date</th>
                    <th>Cost</th>
                </tr>
            </thead>
            <tbody>
                {orders.map((o) => (
                    <tr key={o.id}>
                        <td>{o.id}</td>
                        <td>{o.orderDate}</td>
                        <td>{`$${o.orderCost}`}</td>
                    </tr>
                ))}
            </tbody>
        </Table>
        </>
    )
}
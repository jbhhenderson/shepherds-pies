import { useEffect, useState } from "react";
import { createOrder, getOrders } from "../../managers/orderManager";
import { Button, Table } from "reactstrap";
import { useNavigate } from "react-router-dom";

export default function OrderList({ loggedInUser }) {
    const [orders, setOrders] = useState([]);
    const navigate = useNavigate();

    const getAllOrders = () => {
        getOrders().then(setOrders);
    };

    const handleDetailsButton = (e, orderId) => {
        e.preventDefault();

        navigate(`/orders/${orderId}`);
    };

    const handleCreateButton = (e) => {
        e.preventDefault()

        const newOrder = {
            receiverId: loggedInUser.id
        }

        createOrder(newOrder)
            .then((res) => navigate(`/orders/create/${res.id}`))
    }

    useEffect(() => {
        getAllOrders();
    }, []);

    return (
        <>
        <h2>Orders</h2>
        <Button
            color="primary"
            onClick={handleCreateButton}
        >
            Create New Order
        </Button>
        <Table>
            <thead>
                <tr>
                    <th>Order Id</th>
                    <th>Order Date</th>
                    <th>Cost</th>
                    <th>Details</th>
                </tr>
            </thead>
            <tbody>
                {orders.map((o) => (
                    <tr key={o.id}>
                        <td>{o.id}</td>
                        <td>{o.orderDate}</td>
                        <td>{`$${o.orderCost}`}</td>
                        <td>
                            <Button 
                            color="primary"
                            onClick={(e) => handleDetailsButton(e, o.id)}
                            >
                            Details
                            </Button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </Table>
        </>
    );
};
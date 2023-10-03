import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getOrder } from "../../managers/orderManager";
import { Button, ListGroup, ListGroupItem, Table } from "reactstrap";

export default function OrderDetails() {
    const { id } = useParams();
    const [order, setOrder] = useState({});
    const navigate = useNavigate();

    const getThisOrder = () => {
        getOrder(parseInt(id)).then(setOrder);
    };

    const handleDetailsButton = (e, pizzaId) => {
        e.preventDefault();

        navigate(`/pizzas/${pizzaId}`);
    };

    useEffect(() => {
        getThisOrder();
    }, []);

    return (
        <>
        <h2>Order Details</h2>
        <ListGroup>
            <ListGroupItem>
                Order Placed On: {order.orderDate}
            </ListGroupItem>
            <ListGroupItem>
                Receiver: {order.receiver?.firstName} {order.receiver?.lastName}
            </ListGroupItem>
            {order.deliverer 
            ? <> 
                <ListGroupItem>
                    Delivery Status: For Delivery
                </ListGroupItem> 
                <ListGroupItem>
                    Deliverer:  {order.deliverer?.firstName} {order.deliverer?.lastName}
                </ListGroupItem>
            </>
            : <> 
                <ListGroupItem>
                    Delivery Status: Dine In
                </ListGroupItem> 
                <ListGroupItem>
                    Table:  {order.tableId}
                </ListGroupItem>
            </>
            }
            <ListGroupItem>
                Tip Amount: {`$${order.tipAmount}`}
            </ListGroupItem>
            <ListGroupItem>
                Total Cost: {`$${order.orderCost}`} (tip included)
            </ListGroupItem>
        </ListGroup>
        <p></p>
        <h2>Pizzas:</h2>
        <Table>
            <thead>
                <tr>
                    <th>Size</th>
                    <th>Cheese</th>
                    <th>Sauce</th>
                    <th># Of Toppings</th>
                    <th>Price</th>
                    <th>Details</th>
                </tr>
            </thead>
            <tbody>
                {
                    order.orderPizzas?.map((p) => (
                        <tr key={p.id}>
                            <td>{p.size.name}</td>
                            <td>{p.cheese.name}</td>
                            <td>{p.sauce.name}</td>
                            <td>{p.pizzaToppings.length}</td>
                            <td>${p.pizzaCost}</td>
                            <td>
                                <Button 
                                color="primary"
                                onClick={(e) => handleDetailsButton(e, p.id)}
                                >
                                Details
                                </Button>
                            </td>
                        </tr>
                    ))
                }
            </tbody>
        </Table>
        </>
    );
};
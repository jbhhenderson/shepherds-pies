import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getOrder, updateOrder } from "../../managers/orderManager";
import { Button, FormGroup, Input, Label, ListGroup, ListGroupItem, Table } from "reactstrap";
import { createPizza, deletePizza } from "../../managers/pizzaManager";
import { getUserProfiles } from "../../managers/userProfileManager";

export default function OrderUpdate() {
    const { id } = useParams();
    const [order, setOrder] = useState({});
    const [status, setStatus] = useState("false");
    const [delivererId, setDelivererId] = useState(0)
    const [tipAmount, setTipAmount] = useState(0)
    const [tableId, setTableId] = useState(0)
    const [users, setUsers] = useState([])


    const navigate = useNavigate();

    const getThisOrder = () => {
        getOrder(parseInt(id)).then((data) => {
           setOrder(data)
           if (data.delivererId === 0 || data.delivererId === null)
           {
                setStatus("true")
           }
        });
    };

    const handleDetailsButton = (e, pizzaId) => {
        e.preventDefault();

        navigate(`/pizzas/${pizzaId}`);
    };

    const handleDelivery = (e) => {
        setStatus(e.target.value === "true")
    };

    const handleAddPizza = (e) => {
        e.preventDefault()

        const newPizza = {
            orderId: parseInt(id)
        }

        createPizza(newPizza)
            .then((res) => navigate(`/orders/${id}/new-pizza/${res.id}`))
    }

    const handleDeletePizza = (e, pizzaId) => {
        e.preventDefault()

        deletePizza(pizzaId)
            .then(() => getThisOrder())
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        const orderToSendToAPI = {
            tableId: tableId ? parseInt(tableId) : 0,
            delivererId: delivererId ? parseInt(delivererId) : 0,
            tipAmount: tipAmount
        }

        updateOrder(id, orderToSendToAPI)
            .then(() => navigate(`/orders/${id}`))
    };

    const handleEditPizza = (e, pizzaId) => {
        e.preventDefault()

        navigate(`/orders/${id}/new-pizza/${pizzaId}`)
    }

    useEffect(() => {
        getThisOrder();
        getUserProfiles().then(setUsers);
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
            <label>
                <input type="radio" name="DeliveryStatus" value={"true"} checked={status} onClick={handleDelivery}/>
                Delivery?
            </label>
            <p></p>
            <label>
                <input type="radio" name="DeliveryStatus" value={"false"} checked={!status} onClick={handleDelivery}/>
                Dine In?
            </label>
            <p></p>
            {
                status ? <FormGroup>
                <Label>Assign Deliverer</Label>
                    <Input
                        type="select"
                        value={delivererId}
                        onChange={(e) => {
                            setDelivererId(parseInt(e.target.value))
                        }}
                    >
                        <option value={0}>Choose an Employee</option>                        
                        {
                            users.map((u) => (
                                <option value={u.id}>{u.firstName} {u.lastName}</option>
                            ))
                        }                       
                    </Input>
                </FormGroup>
            : <FormGroup>
            <Label>Table</Label>
                <Input
                    type="text"
                    value={tableId}
                    onChange={(e) => {
                        setTableId(e.target.value)
                    }}
                />
            </FormGroup>
            }
            <ListGroupItem>
                <Label>Tip Amount</Label>
                <Input
                    type="text"
                    value={tipAmount}
                    onChange={(e) => {
                        setTipAmount(parseInt(e.target.value))
                    }}
                />
            </ListGroupItem>
        </ListGroup>
        <Button onClick={handleSubmit} color="primary">
            Submit Order Info
        </Button>
        <p></p>
        <h2>Pizzas:</h2>
        <Button onClick={handleAddPizza} color="primary">
            Add Pizza
        </Button>
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
                                color="info"
                                onClick={(e) => handleDetailsButton(e, p.id)}
                                >
                                Details
                                </Button>
                                <Button 
                                color="primary"
                                onClick={(e) => handleEditPizza(e, p.id)}
                                >
                                Edit
                                </Button>
                                <Button 
                                color="danger"
                                onClick={(e) => handleDeletePizza(e, p.id)}
                                >
                                Remove Pizza
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
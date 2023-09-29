import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getPizza } from "../../managers/pizzaManager";
import { ListGroup, ListGroupItem, Table } from "reactstrap";

export default function PizzaDetails() {
    const { id } = useParams();
    const [pizza, setPizza] = useState({});
    const navigate = useNavigate();

    const getThisPizza = () => {
        getPizza(parseInt(id)).then(setPizza);
    };

    // const handleDetailsButton = (e, pizzaId) => {
    //     e.preventDefault();

    //     navigate(`/pizzas/${pizzaId}`);
    // };

    useEffect(() => {
        getThisPizza();
    }, []);

    return (
        <>
        <h2>Pizza Details</h2>
        <ListGroup>
            <ListGroupItem>
                Pizza Price: ${pizza.pizzaCost}
            </ListGroupItem>
            <ListGroupItem>
                Size: {pizza.size?.name}
            </ListGroupItem>
            <ListGroupItem>
                Cheese: {pizza.cheese?.name}
            </ListGroupItem>
            <ListGroupItem>
                Sauce: {pizza.sauce?.name}
            </ListGroupItem>
        </ListGroup>
        <p></p>
        <h2>Toppings: ({pizza.pizzaToppings?.length})</h2>
        <Table>
            <thead>
                <tr>
                    <th>Name</th>
                </tr>
            </thead>
            <tbody>
                {
                    pizza.pizzaToppings?.map((t) => (
                        <tr key={t.id}>
                            <td>{t.topping.name}</td>
                        </tr>
                    ))
                }
            </tbody>
        </Table>
        </>
    )
}
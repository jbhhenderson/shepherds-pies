import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom"
import { Button, Input } from "reactstrap";
import { getPizza, updatePizza } from "../../managers/pizzaManager";
import { getCheeses } from "../../managers/cheeseManager";
import { getSauces } from "../../managers/sauceManager";
import { getSizes } from "../../managers/sizeManager";
import { getToppings } from "../../managers/toppingManager";
import { addPizzaTopping, removePizzaTopping } from "../../managers/pizzaToppingManager";

export default function PizzaForm() {
    const { pizzaId } = useParams();
    const { orderId } = useParams();
    const [pizza, setPizza] = useState({})
    const [cheeses, setCheeses] = useState([])
    const [sizes, setSizes] = useState([])
    const [sauces, setSauces] = useState([])
    const [toppings, setToppings] = useState([])
    const [cheeseId, setCheeseId] = useState(0)
    const [sauceId, setSauceId] = useState(0)
    const [sizeId, setSizeId] = useState(0)
    const navigate = useNavigate();

    const getThisPizza = () => {
        getPizza(parseInt(pizzaId)).then(setPizza);
    };

    const handleToppingCheckbox = (e, topping) => {
        const { checked } = e.target
        const promise = checked
            ? addPizzaTopping(pizza.id, topping.id)
            : removePizzaTopping(pizza.id, topping.id)
        
        promise.then(() => getThisPizza())
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        const newPizza = {
            cheeseId: cheeseId ? cheeseId : pizza.cheeseId,
            sauceId: sauceId ? sauceId : pizza.sauceId,
            sizeId: sizeId ? sizeId : pizza.sizeId
        }

        updatePizza(pizza.id, newPizza)
            .then(() => navigate(`/orders/update/${orderId}`))
    }

    useEffect(() => {
        getThisPizza()
        getCheeses().then(setCheeses)
        getSauces().then(setSauces)
        getSizes().then(setSizes)
        getToppings().then(setToppings)
    }, [])

    return (
    <>
        <h2>Create Pizza</h2>
        <p>Select your size:</p>
        <Input
            type="select"
            value={sizeId}
            onChange={(e) => {
                setSizeId(parseInt(e.target.value))
            }}
        >
            <option key={0} value={0}>Choose a Size</option>
            {
                sizes.map((size) => (
                    <option key={size.id} value={size.id}>{size.name}</option>
                ))
            }
        </Input>
        <p>Select your sauce:</p>
        <Input
            type="select"
            value={sauceId}
            onChange={(e) => {
                setSauceId(parseInt(e.target.value))
            }}
        >
            <option key={0} value={0}>Choose a Sauce</option>
            {
                sauces.map((sauce) => (
                    <option key={sauce.id} value={sauce.id}>{sauce.name}</option>
                ))
            }
        </Input>
        <p>Select your cheese:</p>
        <Input
            type="select"
            value={cheeseId}
            onChange={(e) => {
                setCheeseId(parseInt(e.target.value))
            }}
        >
            <option key={0} value={0}>Choose a Cheese</option>
            {
                cheeses.map((cheese) => (
                    <option key={cheese.id} value={cheese.id}>{cheese.name}</option>
                ))
            }
        </Input>
        <p>Select your toppings:</p>
        {
            toppings.map((t) => (
                <>
                    <label htmlFor="toppings">{t.name}</label>
                    <input
                        type="checkbox"
                        name="toppings"
                        checked={!!pizza?.pizzaToppings?.find((pt) => pt.toppingId == t.id)}
                        onChange={(e) => handleToppingCheckbox(e, t)}
                    ></input>
                    <p></p>
                </>
            ))
        }
        <Button onClick={handleSubmit} color="primary">
            Submit
        </Button>
    </>
    )
};
import { useEffect, useState } from "react";
import { Form, useNavigate, useParams } from "react-router-dom"
import { getUserProfiles } from "../../managers/userProfileManager";
import { getOrder, updateOrder } from "../../managers/orderManager";
import { Button, FormGroup, Input, Label } from "reactstrap";

export default function OrderForm() {
    const { id } = useParams();
    const [users, setUsers] = useState([])
    const [order, setOrder] = useState({})
    const [status, setStatus] = useState("false")
    const [delivererId, setDelivererId] = useState(0)
    const [tipAmount, setTipAmount] = useState(0)
    const [tableId, setTableId] = useState(0)
    const navigate = useNavigate();

    const getThisOrder = () => {
        getOrder(parseInt(id)).then(setOrder);
    };

    const handleDelivery = (e) => {
        setStatus(e.target.value === "true")
    };

    const handleSubmit = (e) => {
        e.preventDefault()

        const orderToSendToAPI = {
            tableId: tableId ? parseInt(tableId) : 0,
            delivererId: delivererId ? delivererId : 0,
            tipAmount: tipAmount
        }

        updateOrder(id, orderToSendToAPI)
            .then(() => navigate("/orders"))
    };

    useEffect(() => {
        getUserProfiles().then(setUsers)
        getThisOrder()
    }, [])

    return (
        <>
        <h2>New Order</h2>
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
        <FormGroup>
            <Label>Tip</Label>
            <Input
                type="text"
                value={tipAmount}
                onChange={(e) => {
                    setTipAmount(e.target.value)
                }}
            />
        </FormGroup>
        <Button onClick={handleSubmit} color="primary">
            Submit
        </Button>
        </>
    )
};
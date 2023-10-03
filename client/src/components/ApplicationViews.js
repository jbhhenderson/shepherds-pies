import { Route, Routes } from "react-router-dom";
import { AuthorizedRoute } from "./auth/AuthorizedRoute";
import Login from "./auth/Login";
import Register from "./auth/Register";
import Home from "./Home";
import OrderList from "./orders/OrderList";
import OrderDetails from "./orders/OrderDetails";
import PizzaDetails from "./pizzas/PizzaDetails";
import OrderForm from "./orders/OrderForm";

export default function ApplicationViews({ loggedInUser, setLoggedInUser }) {
  return (
    <Routes>
      <Route path="/">
        <Route
          index
          element={
            <AuthorizedRoute loggedInUser={loggedInUser}>
              <Home />
            </AuthorizedRoute>
          }
        />
        <Route path="orders">
          <Route
            index
            element={
              <AuthorizedRoute loggedInUser={loggedInUser}>
                <OrderList loggedInUser={loggedInUser}/>
              </AuthorizedRoute>
            }
          />
          <Route
            path=":id"
            element={
              <AuthorizedRoute loggedInUser={loggedInUser}>
                <OrderDetails />
              </AuthorizedRoute>
            }
          />
          <Route
            path="create/:id"
            element={
              <AuthorizedRoute loggedInUser={loggedInUser}>
                <OrderForm />
              </AuthorizedRoute>
            }
          />
        </Route>
        <Route path="pizzas">
          <Route
          path=":id"
          element={
            <AuthorizedRoute loggedInUser={loggedInUser}>
              <PizzaDetails />
            </AuthorizedRoute>
          }
          />
        </Route>
        <Route
          path="login"
          element={<Login setLoggedInUser={setLoggedInUser} />}
        />
        <Route
          path="register"
          element={<Register setLoggedInUser={setLoggedInUser} />}
        />
      </Route>
      <Route path="*" element={<p>Whoops, nothing here...</p>} />
    </Routes>
  );
}

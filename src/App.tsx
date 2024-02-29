import {
  BrowserRouter as Router,
  Routes,
  Route,
  BrowserRouter,
} from "react-router-dom";
import Home from "./pages/Home/Home";
import Shop from "./pages/Shop/Shop";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { handleProductsFetchRequest } from "./features/Redux/Reducers/productSlice";
import "./App.css";
import { handleGetCategories } from "./features/Redux/Reducers/categorySlice";
import DetailProduct from "./pages/detailProduct/DetailProduct";
import Cart from "./pages/Cart";
import { handleLoginRequest } from "./features/Redux/Reducers/loginSlice";
import { handleGetReview } from "./features/Redux/Reducers/reviewSlice";
import { handleGetPucharse } from "./features/Redux/Reducers/pucharseSlice";
import Pucharse from "./pages/Pucharse";
import Checkout from "./pages/Checkout";
import OrderComplete from "./pages/orderComplete";
import { RootState } from "./features/Redux/Store/store";
import { handleGetDataLocalStorage } from "./features/Redux/Reducers/cartSlice";
import CategoryProduct from "./pages/categoryProduct/categoryProduct";
import ScrollToTop from "./components/ScrollOnTop";

function App() {
  const dispatch = useDispatch();
  if (!localStorage.getItem("listProductCart")) {
    localStorage.setItem("listProductCart", JSON.stringify([]));
  }
  const storageCart = JSON.parse(localStorage.getItem("listProductCart") || "");

  const cart = useSelector(
    (state: RootState) => state.reducer.cartSlice.listProductCart
  );
  useEffect(() => {
    dispatch(handleProductsFetchRequest());
    dispatch(handleGetCategories());
    dispatch(handleLoginRequest());
    dispatch(handleGetReview());
    dispatch(handleGetPucharse());
    dispatch(handleGetDataLocalStorage(storageCart === "" ? [] : storageCart));
  }, []);
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      {/* <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/blog" element={<Blog />} /> */}
      <Route path="/pucharse" element={<Pucharse />} />

      <Route path="/shop" element={<Shop />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/checkout" element={<Checkout />} />
      <Route path="/product/:id" element={<DetailProduct />} />
      <Route path="/orderComplete" element={<OrderComplete />} />
      <Route path="/category/:categoryName" element={<CategoryProduct />} />
    </Routes>
  );
}

export default App;

import { Drawer, Grid } from "@mui/material";
import { useSelector } from "react-redux";
import { IProductCart } from "../../Types/models";
import { handleDeleteProduct } from "../../features/Redux/Reducers/cartSlice";
import { useDispatch } from "react-redux";
import { RootState } from "../../features/Redux/Store/store";
import { useEffect, useState } from "react";
import styles from "./ShoppingCart.module.css";
import { useNavigate } from "react-router-dom";

export interface IShoppingCartProps {
  products: IProductCart[];
  isOpen: boolean;
  onClose: () => void;
}

const ShoppingCart: React.FC<IShoppingCartProps> = ({
  products,
  isOpen,
  onClose,
}) => {
  const dispatch = useDispatch();
  const listProduct = useSelector(
    (state: RootState) => state.reducer.productSlice.listProduct
  );

  const navigate = useNavigate();

  const handleViewCart = () => {
    navigate("/cart");
  };

  const handleCheckout = () => {
    navigate("/checkout");
  };

  const [newProducts, setNewProducts] = useState<never[]>([]);
  useEffect(() => {
    const result: any = products
      .map((item) => {
        let newItem: any;
        listProduct.forEach((product) => {
          if (product.id === item.id) {
            newItem = { ...product, ...item };
            return newItem;
          }
        });
        return newItem;
      })
      .filter((item) => item);
    setNewProducts(result);
  }, [products, listProduct]);

  const totalPrice = newProducts.reduce((total, product: any) => {
    return total + (product.price * product.quantity * product.discount) / 100;
  }, 0);
  const totalPriceFixed = totalPrice.toFixed(2);

  return (
    <Drawer anchor="right" open={isOpen} onClose={onClose}>
      <div className={styles.divShopping}>
        <h5>Shopping cart</h5>
        <h6 className={styles.closeBtn} onClick={onClose}>
          <i className="fa-solid fa-xmark"></i> Close
        </h6>
      </div>
      <hr />
      <div className={styles.list}>
        {newProducts.map((product: any) => (
          <div key={product.id} className={styles.listItem}>
            <Grid className={styles.product} container spacing={4}>
              <Grid xs={3} item>
                <img src={product.images[0]} alt="" className={styles.img} />
              </Grid>
              <Grid xs={8} className={styles.product} item>
                <p
                  className={styles.name}
                >{`${product.name} - ${product.size} - months, ${product.color}`}</p>
                <p className={styles.quantity}>
                  {`${product.quantity} x`}
                  <span className={styles.price}>{` $${
                    (product.price * product.discount) / 100
                  }`}</span>
                </p>
              </Grid>
              <Grid xs={1} item>
                <div
                  className={styles.deleteIcon}
                  onClick={() => dispatch(handleDeleteProduct(product))}
                >
                  <i className="fa-solid fa-xmark"></i>
                </div>
              </Grid>
            </Grid>
            <hr />
          </div>
        ))}
      </div>
      <Grid container className={styles.footer}>
        <Grid container>
          <Grid item className="ps-3" xs={9}>
            <h5>Subtotal: </h5>
          </Grid>
          <Grid item className="ps-2" xs={3}>
            <h5 className="text-primary">{`$ ${totalPriceFixed}`} </h5>
          </Grid>
        </Grid>
        <Grid container>
          <Grid item xs={12} container>
            <button onClick={handleViewCart} className={styles.viewCartButton}>
              View cart
            </button>
          </Grid>
          <Grid item xs={12} container>
            <button onClick={handleCheckout} className={styles.checkoutButton}>
              Checkout
            </button>
          </Grid>
        </Grid>
      </Grid>
    </Drawer>
  );
};

export default ShoppingCart;

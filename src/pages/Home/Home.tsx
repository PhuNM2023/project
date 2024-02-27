import { Box, Button} from "@mui/material";
import { useSelector } from "react-redux";
import { RootState } from "../../features/Redux/Store/store";
import {IProduct } from "../../Types/models";
import FeatureCollection from "./featureCollection";
import PopularProducts from "./popularProducts";

import ListCategory from "./listCategory";
import Collection from "./collection";
import { Fragment } from "react";
import { settingSlideHeader } from "../../constants/settingSlideHeader";
import ListProductComponent from "./listProduct";
import Footer from "../../components/Footer/Footer";
import { slideImages } from "../../assets/sildeImage";
import Slider from "react-slick";
import { NavLink } from "react-router-dom";
import { divStyle } from "./styleComponent";
import HeaderTab from "../../components/Header/HeaderTab";

const Home = () => {
  const cart = useSelector(
    (state: RootState) => state.reducer.cartSlice.listProductCart
  );
  const listProduct = useSelector(
    (state: RootState) => state.reducer.productSlice.listProduct
  );

  const listNewProduct = listProduct.filter((item) =>
    item.state.includes("new")
  );
  console.log(listNewProduct);
  const listPopularProduct = listProduct.filter(
    (item: IProduct) => item.buy > 50
  );
  console.log(listPopularProduct);
  const categories = useSelector(
    (state: RootState) => state.reducer.categorySlice.categories
  );
  const settings = settingSlideHeader;

  return (
    <Fragment>
      <Box>
        <HeaderTab />
      </Box>
      <Box>
        <Slider {...settings}>
              {slideImages.map((image, index) => (  
                <Box key={index} sx={{...divStyle,backgroundImage: `url(${image.url})`,}}>
                
                        <div className="position-absolute bottom-0 start-0 m-4">
                          <div className="content">
                          <h1 style={{ fontSize: "75px", whiteSpace: "pre-wrap"}}>{slideImages[index].title}</h1>
                          <p style={{ whiteSpace: "pre-wrap" }}>{slideImages[index].body}</p>
                          <NavLink to={"/shop"}>
                            <Button type="submit">Shop now</Button>{' '}
                          </NavLink>       
                          </div>
                        </div>       
                    </Box>
            ))}
        </Slider>
      </Box>
      <Box className="my-5">
        <ListCategory categories={categories} listProduct={listProduct} />
      </Box>
      <Box className="my-5">
        <Box alignContent="center" sx={{ marginTop: 10 }}>
          <FeatureCollection />
          <Box sx={{ overflow: "hidden" }}>
            <ListProductComponent listProduct={listNewProduct} />
          </Box>
        </Box>
      </Box>
      <Box className="my-5">
        <Collection />
      </Box>
      <Box className="my-5">
        <Box alignContent="center" sx={{ marginTop: 10 }}>
          <PopularProducts />
          <Box sx={{ overflow: "hidden", paddingBottom: "30px" }}>
            <ListProductComponent listProduct={listPopularProduct} />
          </Box>
        </Box>
      </Box>
      <Box>
        <Footer></Footer>
      </Box>
    </Fragment>
  );
};

export default Home;

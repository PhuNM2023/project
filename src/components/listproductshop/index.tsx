import { Box, Button, Drawer, Grid, Pagination } from "@mui/material";
import { useEffect, useMemo, useState } from "react";
import OptionViewComponent from "./component/optionViewComponent";
import FilterProductComponent from "./component/filterProductComponent";
import { useSelector } from "react-redux";
import { RootState } from "../../features/Redux/Store/store";
import { IProduct } from "../../Types/models";
import ListProductPage from "./component/listProductPage";
import * as SortProduct from "../../features/sortProduct/sortProduct";
import * as FilterProduct from "../../features/filterProduct/filterProduct";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import styles from "./shop.module.css";

interface ListProductProps {
  listProduct:IProduct[] ; 
}
const ListProductShop = ({listProduct}:ListProductProps) => {
 
  const [listProductShop, setListProductShop] = useState<IProduct[]>([]);
  const [listProductPage, setListProductPage] = useState<IProduct[]>([]);
  const [pageNumber, setPageNumber] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [productQuantity, setProductQuantity] = useState<number>(9);
  const [productLine, setProductLine] = useState<number>(4);
  const [stateFilterPeice, setFilterPrice] = useState<number[]>([]);
  const [open, setOpen] = useState<boolean>(false);

  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };

  const hanldeSelectProductQuantity = (value: number) => {
    setProductQuantity(value);
  };

  const handleProductLine = (value: number) => {
    setProductLine(value);
  };

  const handleSelectSort = (vallue: string) => {
    if (vallue === "1") {
      setListProductShop(listProduct);
    }
    if (vallue === "2") {
      const newListProductShop = [...listProductShop].sort(
        SortProduct.SortLowToHigh
      );
      setListProductShop(newListProductShop);
    }
    if (vallue === "3") {
      const newListProductShop = [...listProductShop].sort(
        SortProduct.SortHighToLow
      );
      setListProductShop(newListProductShop);
    }
    if (vallue === "4") {
      const newListProductShop = [...listProductShop].sort(
        SortProduct.SortByAverageRating
      );
      setListProductShop(newListProductShop);
    }
    if (vallue === "5") {
      const newListProductShop = [...listProductShop].filter((item) =>
        SortProduct.SortHot(item)
      );
      setListProductShop(newListProductShop);
    }
  };

  const handleCurrentPage = (event: any, currentPage: number) => {
    setCurrentPage(currentPage);
    window.scrollTo({
      top: 300,
      behavior: "smooth",
    });
  };

  const handleFilterPrice = (value: number[]) => {
    setFilterPrice(value);
    if (
      value[0] < stateFilterPeice[0] ||
      value[1] < stateFilterPeice[0] ||
      value[0] > stateFilterPeice[0] ||
      value[1] > stateFilterPeice[0]
    ) {
      const newLisProductShop = FilterProduct.FilterByPrice(
        [...listProduct],
        value
      );
      setListProductShop(newLisProductShop);
    } else {
      const newLisProductShop = FilterProduct.FilterByPrice(
        [...listProductShop],
        value
      );
      setListProductShop(newLisProductShop);
    }
  };

  const handleFilterProductColor = (listFilterProductColor: IProduct[]) => {
    setListProductShop(listFilterProductColor);
  };

  const handleFilterProductSize = (listFilterProductSize: IProduct[]) => {
    setListProductShop(listFilterProductSize);
  };

  useEffect(() => {
    setListProductShop(listProduct);
  }, [listProduct]);


  const newPageNumber = useMemo(()=>Math.ceil(listProductShop.length / productQuantity),[listProductShop,productQuantity]) ; 

  useEffect(() => {
    setPageNumber(newPageNumber);
    const startIndex = (currentPage - 1) * productQuantity;
    const endIndex = startIndex + productQuantity;
    const newListProductPage = listProductShop.slice(startIndex, endIndex);
    setListProductPage(newListProductPage);
  }, [listProductShop, currentPage, productQuantity]);

  const handleClear = () => {
    setListProductShop(listProduct);
  };

  const handleOnSale = (onSale: boolean) => {
    if (onSale) {
      setListProductShop(FilterProduct.FilterProductOnSale(listProductShop));
    }
  };

  const handleInStock = (inStock: boolean) => {
    if (inStock) {
      setListProductShop(FilterProduct.FilterProductInStock(listProductShop));
    }
  };
  return (
    <Grid container spacing={2}>
      <Box className="d-block d-xl-none">
        <Button variant="text" onClick={toggleDrawer(true)}>
          <MenuIcon />
        </Button>
        <Drawer
          open={open}
          onClose={toggleDrawer(false)}
          sx={{
            "& .MuiDrawer-paper": {
              overflow: "hidden",
            },
          }}
        >
          <Box className="d-flex justify-content-end">
            <Button
              variant="text"
              onClick={toggleDrawer(false)}
              className="mt-2"
            >
              <CloseIcon />
            </Button>
          </Box>
          <hr />
          <Box
            sx={{ width: "300px", padding: "20px 20px" }}
            className={styles.filterDrawer}
          >
            <FilterProductComponent
              listProductShop={listProductShop}
              onhandleFilterPrice={handleFilterPrice}
              onhandleFilterColor={handleFilterProductColor}
              onhandleFilterSize={handleFilterProductSize}
              onhandleOnSale={handleOnSale}
              onhandleInStock={handleInStock}
            />
          </Box>
        </Drawer>
      </Box>

      <Grid
        item
        lg={3}
        xs={0}
        display="flex"
        alignItems="center"
        className="d-none d-xl-block"
      >
        <FilterProductComponent
          listProductShop={listProductShop}
          onhandleFilterPrice={handleFilterPrice}
          onhandleFilterColor={handleFilterProductColor}
          onhandleFilterSize={handleFilterProductSize}
          onhandleOnSale={handleOnSale}
          onhandleInStock={handleInStock}
        />
      </Grid>
      <Grid item lg={9} xs={12}>
        <OptionViewComponent
          onhandleProductQuantity={hanldeSelectProductQuantity}
          onhandleProductLine={handleProductLine}
          onSelectSort={handleSelectSort}
        />
        {listProductShop.length !== listProduct.length && (
          <button
            type="button"
            className="btn btn-outline-secondary ms-3 border-0 fw-bold border-bottom"
            onClick={handleClear}
          >
            Clear <strong>X</strong>
          </button>
        )}
        <Box>
          <Grid container>
            <Grid xs={12} item>
              <ListProductPage
                listProductPage={listProductPage}
                productLine={productLine}
              />
            </Grid>
          </Grid>
        </Box>
        {pageNumber > 1 && (
          <Box>
            <Pagination
              count={pageNumber}
              shape="rounded"
              color="primary"
              onChange={handleCurrentPage}
              sx={{ display: "flex", justifyContent: "center" }}
            />
          </Box>
        )}
      </Grid>
    </Grid>
  );
};

export default ListProductShop;

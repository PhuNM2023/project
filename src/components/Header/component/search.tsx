import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../features/Redux/Store/store";
import {
  Box,
  Button,
  CardMedia,
  Grid,
  Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import styles from "../Header.module.css";
import { IProduct } from "../../../Types/models";
import { SearchProduct } from "../../../features/searchProduct/searchProduct";
import { useNavigate } from "react-router-dom";

interface OpenDrawerProps {
  onhandleOpen(open: boolean): void;
}

const Search = ({ onhandleOpen }: OpenDrawerProps) => {
  const listProduct = useSelector(
    (state: RootState) => state.reducer.productSlice.listProduct
  );

  const [searchValue, setSearchValue] = useState<string>("A");
  const [searchData, setSearchData] = useState<IProduct[] | []>([]);

  useEffect(() => {
    const newSearchData = SearchProduct(listProduct, searchValue);
    setSearchData(newSearchData);
  }, [searchValue]);

  const handleSearchValue = (event: React.ChangeEvent<HTMLInputElement>) => {
    const searchValue = event.target.value.toLowerCase();
    if (searchValue === "") {
      setSearchData([]);
    } else {
      setSearchValue(searchValue);
    }
  };

  const navigate = useNavigate();
  const handleClick = (productItem: IProduct) => {
    navigate(`/product/${productItem.id}`, { state: productItem });
  };
  return (
    <Box className="my-4 px-4" sx={{ height: "500px" }}>
      <Grid container className="justify-content-center d-flex">
        <Grid item xs={11}>
          <div className={`input-group mb-3 ${styles.borderBottomSearch}`}>
            <input
              type="text"
              className="form-control border-0 border-dark"
              placeholder="Search"
              aria-label="Username"
              aria-describedby="basic-addon1"
              onChange={handleSearchValue}
            />
          </div>
        </Grid>
        <Grid item xs={1}>
          <Button onClick={() => onhandleOpen(false)}>
            <CloseIcon />
          </Button>
        </Grid>
      </Grid>
      <Grid container>
        {searchData.length === 0 && (
          <Box className="d-flex justify-content-center w-100">
            <Typography component="span" className="mt-4 text-secondary">
              Start typing to see products you are looking for.
            </Typography>
          </Box>
        )}
        {searchData.map((product) => (
          <Grid
            item
            xs={3}
            key={product.id}
            className="p-2"
            onClick={() => {
              navigate(`/product/${product.id}`, { state: product });
              onhandleOpen(false);
            }}
          >
            <Box>
              <CardMedia
                component="img"
                height="250"
                image={product.images[0]}
                alt={product.name}
              ></CardMedia>
              <Box>
                <Typography fontWeight="500">{product.name}</Typography>
                <Box className="d-flex">
                  <Typography
                    component="span"
                    className="text-secondary text-decoration-line-through"
                  >
                    ${product.price}
                  </Typography>
                  <Typography
                    component="span"
                    className="text-primary ms-1"
                    fontWeight="500"
                  >
                    $
                    {(
                      product.price -
                      product.price * (product.discount / 100)
                    ).toFixed(2)}
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Search;

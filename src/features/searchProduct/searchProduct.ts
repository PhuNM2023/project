import { IProduct } from "../../Types/models";

export function SearchProduct(listProduct:IProduct [] , value:string) {
    return listProduct.filter((item)=>item.name.toLowerCase().includes(value)
    || item.categoryName.toLowerCase().includes(value))
}
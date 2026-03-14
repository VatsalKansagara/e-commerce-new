import axios from "axios";
import { createContext, useContext, useState } from "react";

export const DataContext = createContext(null)

export const DataProvider = ({children}) => {
    const [data, setData] = useState();

    // fetching all products from api
    const fetchAllProducts = async() => {
        try{
            // const res = await axios.get('https://fakestoreapi.com/products')
            const res = await axios.get('https://dummyjson.com/products')
            const productsData = res.data.products
            setData(productsData)
        }
        catch(e){
            console.log(e);
        }
    };

    const getUniqueCategory = (data, property) => {
        let newVal = data?.map((item) => item[property]).filter(val => val !== undefined && val !== null);
        newVal = ["All",...new Set(newVal)]
        return newVal
    }

    const categoryOnlyData = getUniqueCategory(data, "category");
    const brandOnlyData = getUniqueCategory(data, "brand");
 
    return <DataContext.Provider value={{data, setData, fetchAllProducts, categoryOnlyData, brandOnlyData}}>
        {children}
    </DataContext.Provider>
}

export const getData = () => useContext(DataContext)
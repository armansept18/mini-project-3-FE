import { useEffect, useState } from "react";
import { CardProduct } from "../../components/cardproduct/productlist";
import { NavTemplate } from "../../components/template/template";
import api from "../../api/api";

export const ProductPage = () => {
  const [product, setProduct] = useState([]);
  const fetchProduct = async () => {
    await api.get("/products").then((result) => setProduct(result.data));
  };

  useEffect(() => {
    fetchProduct();
  }, []);
  return (
    <>
      <NavTemplate>
        <div class="col-auto items-center justify-center h-24 rounded max-md:mt-28 md:ml-72 md:max-w-5xl">
          <CardProduct product={product} />
        </div>
      </NavTemplate>
    </>
  );
};

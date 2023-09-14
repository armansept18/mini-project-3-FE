import { useEffect, useState } from "react";
import { CardProduct } from "../../components/cardproduct/productlist";
import {
  NavTemplate,
  NavTemplateAdmin,
} from "../../components/template/template";
import api from "../../api/api";
import { PaginationCakraUi } from "../../components/pagination/pagination";

export const ProductPageAdmin = () => {
  const [product, setProduct] = useState([]);

  const fetchProduct = async (page, pageSize) => {
    await api
      .get("/products", { params: { page, pageSize } })
      .then((result) => setProduct(result.data));
  };
  useEffect(() => {
    fetchProduct();
  }, []);
  return (
    <>
      <NavTemplateAdmin>
        <div className="col-auto items-center justify-center h-24 rounded max-md:mt-28 md:ml-72 md:max-w-5xl">
          <CardProduct product={product} />

          <PaginationCakraUi product={product} fetchProduct={fetchProduct} />
        </div>
      </NavTemplateAdmin>
    </>
  );
};

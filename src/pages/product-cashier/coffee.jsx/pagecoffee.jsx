import { useEffect, useState } from "react";
import api from "../../../api/api";
import { NavTemplateCashier } from "../../../components/template/template";

export const PageCoffee = async () => {
  const coffee = 1;
  const [product, setProduct] = useState([]);
  const [page, setPage] = useState(1);
  const pageSize = 15;

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const result = await api
          .get("/products/search", { params: { coffee, page, pageSize } })
          .then((result) => setProduct(result.data))
          .catch((err) => err?.message);

        console.log(product);
      } catch (err) {
        console.log(err?.message);
      }

      fetchProduct(page, pageSize);
    };
  }, [page]);

  return (
    <>
      <NavTemplateCashier>
        <div className="flex justify-center">ini page coffe</div>
      </NavTemplateCashier>
    </>
  );
};

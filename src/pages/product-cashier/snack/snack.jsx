import { useEffect, useState } from "react";
import api from "../../../api/api";
import { NavTemplateCashier } from "../../../components/template/template";
import { CardCoffe } from "../../../components/cardproduct/cardproductcashier/cardproductcashier";
import { CardTransaction } from "../../../components/cardtransaction/cardtransaction";
import { PaginationCakraUiCashier } from "../../../components/pagination/pagination-cashier";

export const PageSnack = () => {
  const category_id = 4;
  const [product, setProduct] = useState([]);

  const fetchProduct = async (page, pageSize) => {
    try {
      const result = await api.get("/products/search", {
        params: { category_id, page, pageSize },
      });
      setProduct(result.data);
    } catch (err) {
      console.error(err?.message);
    }
  };
  useEffect(() => {
    fetchProduct(); // Call the async function without arguments
  }, []);

  return (
    <>
      <NavTemplateCashier>
        <div className="md:flex md:justify-between md:ml-64 md:h-full">
          <div className="col-auto">
            <div className="grid grid-cols-4 gap-4">
              {product?.map((item) => (
                <CardCoffe item={item} />
              ))}
            </div>
            <div>
              <PaginationCakraUiCashier
                product={product}
                fetchProduct={fetchProduct}
              />
            </div>
          </div>

          <div>
            <CardTransaction />
          </div>
        </div>
      </NavTemplateCashier>
    </>
  );
};

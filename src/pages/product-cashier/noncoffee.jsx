import { useEffect, useState } from "react";
import api from "../../api/api";
import { NavTemplateCashier } from "../../components/template/template";
import { CardCoffe } from "../../components/cardproduct/cardproductcashier/cardproductcashier";
import { CardTransaction } from "../../components/cardtransaction/cardtransaction";
import { PaginationCakraUiCashier } from "../../components/pagination/pagination-cashier";
import { CartProvider } from "../../components/cardproduct/cardproductcashier/cartContext";

export const PageNonCoffee = () => {
  const category_id = 2;
  const [products, setProducts] = useState([]);
  const [totalItem, setTotalItem] = useState(0);

  const fetchProduct = async (page, pageSize) => {
    try {
      const result = await api.get("/products/", {
        params: { category_id, page, pageSize },
      });

      setTotalItem(result.data.totalPages);
      setProducts(result.data.products);
    } catch (err) {
      console.error(err?.message);
    }
  };

  return (
    <>
      <CartProvider>
        <NavTemplateCashier>
          <div className="md:flex md:justify-between md:ml-56 md:h-full">
            <div></div>
            <div className="col-auto">
              <div className="md:h-16 flex justify-center">
                <span className="font-bold text-2xl p-4 border-b-4 border-black">
                  NonCoffee
                </span>
              </div>

              <div className="grid grid-cols-4 gap-4">
                {products?.map((item) => (
                  <CardCoffe item={item} />
                ))}
              </div>
              <div>
                <PaginationCakraUiCashier
                  // product={products}
                  fetchProduct={fetchProduct}
                  totalItem={totalItem}
                />
              </div>
            </div>
            <div>
              <CardTransaction />
            </div>
          </div>
        </NavTemplateCashier>
      </CartProvider>
    </>
  );
};

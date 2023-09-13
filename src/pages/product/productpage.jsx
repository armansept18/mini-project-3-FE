import { useEffect, useState } from "react";
import { CardProduct } from "../../components/cardproduct/productlist";
import { NavTemplate } from "../../components/template/template";
import api from "../../api/api";
import { Pagination } from "react-bootstrap";

export const ProductPage = () => {
  const [product, setProduct] = useState([]);
  const fetchProduct = async (page, pageSize) => {
    await api
      .get("/products", { params: { page, pageSize } })
      .then((result) => setProduct(result.data));
  };

  const [currentPage, setCorrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  const toalPages = Math.ceil(product.length / itemsPerPage);

  const handleChangePage = () => {};
  useEffect(() => {
    fetchProduct(currentPage, itemsPerPage);
  }, [currentPage, itemsPerPage]);
  return (
    <>
      <NavTemplate>
        <div class="col-auto items-center justify-center h-24 rounded max-md:mt-28 md:ml-72 md:max-w-5xl">
          <CardProduct product={product} />
        </div>
        <Pagination>
          <Pagination.Prev onClick={() => handleChangePage(currentPage - 2)} />
        </Pagination>
      </NavTemplate>
    </>
  );
};

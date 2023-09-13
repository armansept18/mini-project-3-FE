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

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const totalPages = Math.ceil(product.length / itemsPerPage);

  useEffect(() => {
    fetchProduct(currentPage, itemsPerPage);
  }, [currentPage, itemsPerPage]);

  return (
    <>
      <NavTemplate>
        <div class="col-auto items-center justify-center h-24 rounded max-md:mt-28 md:ml-72 md:max-w-5xl">
          <CardProduct product={product} />
        </div>
        <Pagination className="flex justify-center justify-around">
          <Pagination.Prev
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
          />
          {Array.from({ length: totalPages }).map((_, index) => (
            <Pagination.Item
              key={index}
              active={index + 1 === currentPage}
              onClick={() => handlePageChange(index + 1)}
            >
              <h1>{index + 1}</h1>
            </Pagination.Item>
          ))}
          <Pagination.Next onClick={() => handlePageChange(currentPage + 1)} />
        </Pagination>
      </NavTemplate>
    </>
  );
};

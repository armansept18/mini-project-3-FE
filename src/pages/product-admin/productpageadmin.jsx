import { useEffect, useState } from "react";
import { CardProduct } from "../../components/cardproduct/productlist";
import {
  NavTemplate,
  NavTemplateAdmin,
} from "../../components/template/template";
import api from "../../api/api";
import { PaginationCakraUiAdmin } from "../../components/pagination/paginationAdmin";
import { Button } from "@chakra-ui/button";
import { useNavigate } from "react-router";
import { useToast } from "@chakra-ui/toast";
import { SearchBar } from "../../components/cardproduct/search-bar";
import { SortingBar } from "../../components/cardproduct/sorting-product";
import { ModalProduct } from "../../components/modals/modal-create-edit-product";

export const ProductPageAdmin = ({ id }) => {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState({ search: "", category: "" });
  const [sortField, setSortField] = useState(null);
  const [sortOrder, setSortOrder] = useState({ orderby: "", sortby: "asc" });
  const toast = useToast();
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editProduct, setEditProduct] = useState(null);

  const [totalItem, setTotalItem] = useState(0);

  const fetchSearch = (page, pageSize) => {
    try {
      api
        .get("/products/search", {
          params: {
            product_name: search.search,
            category_id: search.category,
            orderby: sortOrder.orderBy,
            sortby: sortOrder.sortBy,
            page,
            pageSize,
          },
        })
        .then((res) => {
          setProducts(res.data);
          setTotalItem(res.data.totalPages);
        })
        .catch((err) => console.log(err));
    } catch (err) {
      console.log(err?.message);
    }
  };
  console.log(products);

  // const fetchProduct = async (page, pageSize) => {
  //   await api
  //     .get("/products/", {
  //       params: { order: sortField, product_name: sortOrder, page, pageSize },
  //     })
  //     .then((result) => setProducts(result.data));
  // };
  // useEffect(() => {
  //   fetchSearch();
  // }, [search, sortOrder]);
  // console.log(sortOrder);

  const openEditModal = (product) => {
    setEditProduct(product);
    setIsEditModalOpen(true);
  };

  const closeEditModal = () => {
    setEditProduct(null);
    setIsEditModalOpen(false);
  };
  return (
    <>
      <NavTemplateAdmin>
        <SearchBar setSearch={setSearch} />
        <SortingBar sortOrder={sortOrder} setSortOrder={setSortOrder} />
        <div className="col-auto items-center justify-center h-24 rounded max-md:mt-5 md:ml-72 md:max-w-5xl">
          <CardProduct
            product={products}
            onEdit={openEditModal}
            fetchSearch={fetchSearch}
          />
          <PaginationCakraUiAdmin
            fetchSearch={fetchSearch}
            totalItem={totalItem}
            product={products}
            search={search}
            sortOrder={sortOrder}
          />
        </div>
      </NavTemplateAdmin>
      {isEditModalOpen && (
        <ModalProduct
          isOpen={isEditModalOpen}
          onClose={closeEditModal}
          edit={editProduct}
        />
      )}
    </>
  );
};

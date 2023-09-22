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
        <div className="mt-10">
          <CardProduct
            product={products}
            onEdit={openEditModal}
            fetchSearch={fetchSearch}
            sortOrder={sortOrder}
            setSortOrder={setSortOrder}
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

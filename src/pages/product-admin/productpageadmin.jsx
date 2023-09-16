import { useEffect, useState } from "react";
import { CardProduct } from "../../components/cardproduct/productlist";
import {
  NavTemplate,
  NavTemplateAdmin,
} from "../../components/template/template";
import api from "../../api/api";
import { PaginationCakraUi } from "../../components/pagination/paginationAdmin";
import { Button } from "@chakra-ui/button";
import { useNavigate } from "react-router";
import { useToast } from "@chakra-ui/toast";
import { SearchBar } from "../../components/cardproduct/search-bar";
import { SortingBar } from "../../components/cardproduct/sorting-product";
import { ModalProduct } from "../../components/cardproduct/product-modal";

export const ProductPageAdmin = ({ id }) => {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState({ search: "", category: "" });
  const [sortField, setSortField] = useState(null);
  const [sortOrder, setSortOrder] = useState({ orderby: "", sortby: "asc" });
  const toast = useToast();
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editProduct, setEditProduct] = useState(null);
  const [page, setPage] = useState(1);
  const pageSize = 5;
  console.log(page, "ini page yang ada di product");
  const nav = useNavigate();

  const fetchSearch = () => {
    return api
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
      })
      .catch((err) => console.log(err));
  };
  useEffect(() => {
    console.log(sortOrder);
    fetchSearch();
  }, [search, sortOrder, page]);

  // const fetchProduct = async (page, pageSize) => {
  //   await api
  //     .get("/products/", {
  //       params: { order: sortField, product_name: sortOrder, page, pageSize },
  //     })
  //     .then((result) => setProducts(result.data));
  // };
  // useEffect(() => {
  //   fetchProduct();
  // }, [page]);

  const openEditModal = (product) => {
    setEditProduct(product);
    setIsEditModalOpen(true);
  };

  const closeEditModal = () => {
    setEditProduct(null);
    setIsEditModalOpen(false);
  };

  const handleDelete = () => {
    const token = localStorage.getItem("auth");
    api
      .delete(`/products/${id}`)
      .then((result) => {
        toast({
          title: "Berhasil Dihapus!",
          status: "success",
          description: "Produk Telah Dihapus",
          isClosable: true,
          position: "top",
          duration: 2023,
        });
        window.location.reload();
      })
      .catch((err) => {
        toast({
          title: "Gagal Menghapus!",
          description: err?.response?.data,
          status: "error",
          position: "top",
          isClosable: true,
          duration: 2023,
        });
      });
  };

  function toAdmin() {
    nav("/admin");
  }
  return (
    <>
      <NavTemplateAdmin>
        <SearchBar setSearch={setSearch} />
        <SortingBar sortOrder={sortOrder} setSortOrder={setSortOrder} />
        <div className="col-auto items-center justify-center h-24 rounded max-md:mt-28 md:ml-72 md:max-w-5xl">
          <CardProduct
            product={products}
            onEdit={openEditModal}
            onDelete={(item) => handleDelete(item)}
          />

          <PaginationCakraUi product={products} page={page} setPage={setPage} />
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

import { useCallback, useEffect, useState } from "react";
import { CardProduct } from "../../components/cardproduct/productlist";
import { NavTemplate } from "../../components/template/template";
import { SortingBar } from "../../components/cardproduct/sorting-product";
import { SearchBar } from "../../components/cardproduct/search-bar";
import api from "../../api/api";
import { useToast } from "@chakra-ui/react";
import { ModalProduct } from "../../components/cardproduct/product-modal";

export const ProductPage = ({ id }) => {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState({ search: "", category: "" });
  const [sortField, setSortField] = useState(null);
  const [sortOrder, setSortOrder] = useState({ orderby: "", sortby: "asc" });
  const toast = useToast();
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editProduct, setEditProduct] = useState(null);

  const fetchSearch = () => {
    return api
      .get("/products/search", {
        params: {
          product_name: search.search,
          category_id: search.category,
          orderby: sortOrder.orderBy,
          sortby: sortOrder.sortBy,
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
  }, [search, sortOrder]);

  const fetchProduct = async () => {
    try {
      const response = await api.get("/products/", {
        params: {
          order: sortField,
          product_name: sortOrder,
        },
      });
      console.log(response.data);
      setProducts(response.data);
    } catch (error) {
      console.error(`Error fetching products:`, error);
    }
  };
  // useEffect(() => {
  // console.log(sortField);
  //   console.log(sortOrder);
  //   fetchProduct();
  // }, [sortField, sortOrder]);

  const handleSort = async (field, order) => {
    setSortField(field);
    setSortOrder(order);
  };

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
  return (
    <>
      <NavTemplate>
        <div className=" col-auto">
          <SearchBar setSearch={setSearch} />
          <SortingBar sortOrder={sortOrder} setSortOrder={setSortOrder} />
          <div class="col-auto items-center justify-center h-24 rounded max-md:mt-28 md:ml-72 md:max-w-5xl">
            <CardProduct
              product={products}
              onEdit={openEditModal}
              onDelete={(item) => handleDelete(item)}
            />
          </div>
        </div>
      </NavTemplate>
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

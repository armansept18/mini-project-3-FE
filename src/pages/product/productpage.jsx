import { useCallback, useEffect, useState } from "react";
import { CardProduct } from "../../components/cardproduct/productlist";
import { NavTemplate } from "../../components/template/template";
import { SortingBar } from "../../components/cardproduct/sorting-product";
import { SearchBar } from "../../components/cardproduct/search-bar";
import api from "../../api/api";
import debounce from "lodash.debounce";
import { useToast } from "@chakra-ui/react";
import { ModalProduct } from "../../components/cardproduct/product-modal";

export const ProductPage = ({ id, onSearch }) => {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState({ search: "", category: "" });
  const [category, setCategory] = useState("");
  const [sortField, setSortField] = useState(null);
  const [sortOrder, setSortOrder] = useState("asc");
  const toast = useToast();
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editProduct, setEditProduct] = useState(null);

  const fetchSearch = (query) => {
    return api
      .get("/products/search", {
        params: {
          product_name: query,
        },
      })
      .then((res) => res.data)
      .catch((err) => console.log(err));
  };
  useEffect(() => {
    if (search) {
      fetchSearch(search).then((data) => {
        setSearch(data || []);
      });
    } else {
      fetchProduct("").then((data) => {
        setSearch(data || []);
      });
    }
  }, [search]);

  // const debouncedFilter = useCallback(
  //   debounce((query) => setSearch(query), 2023),
  //   []
  // );
  // const onSearch = (query) => {
  //   debouncedFilter(query);
  // };

  const fetchProduct = async () => {
    try {
      const response = await api.get("/products/", {
        params: {
          product_name: search
        },
      });
      console.log(response.data);
      setProducts(response.data);
    } catch (error) {
      console.error(`Error fetching products:`, error);
    }
  };
  useEffect(() => {
    fetchProduct();
  }, [search]);

  const handleSort = async (field, order) => {
    setSortField(field);
    setSortOrder(order);

    // try {
    //   const response = await api.get("products", {
    //     params: { product_name: search, category_id: category, order },
    //   });
    //   setProducts(response.data);
    // } catch (error) {
    //   console.error(`Error sorting products`, error);
    // }
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
    // const token = localStorage.getItem('auth');
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
        <SearchBar onSearch={onSearch} />
        <SortingBar onSort={handleSort} />
        <div class="col-auto items-center justify-center h-24 rounded max-md:mt-28 md:ml-72 md:max-w-5xl">
          <CardProduct
            product={products}
            onEdit={openEditModal} // Pass your edit function here
            onDelete={(item) => handleDelete(item)}
          />
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

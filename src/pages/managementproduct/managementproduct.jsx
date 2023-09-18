import { useEffect, useState } from "react";
import { TableManagementCategory } from "../../components/table/tablemanagementcategory";
import { NavTemplateAdmin } from "../../components/template/template";
import api from "../../api/api";
import { SelectCategory } from "../../components/selectoption/selectoptioncategory";

import { Button } from "@chakra-ui/react";
import { ModalAddCategoryName } from "../../components/modals/modaladdcategory";

export const PageManagementProduct = () => {
  const [category, setCategory] = useState([]);
  const [products, setProducts] = useState([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState(1);
  const [selectCategoryModal, setSelectedCategoryModal] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [editProduct, setEditProduct] = useState(null);

  const fetchCategory = async () => {
    await api
      .get("/productcategories")
      .then((result) => setCategory(result.data))
      .catch((err) => console.log(err?.message));
  };

  const fetchProduct = async () => {
    await api
      .get("/products/withcategory", {
        params: { categoryid_product: selectedCategoryId },
      })
      .then((result) => setProducts(result.data))
      .catch((err) => console.log(err?.message));
  };
  console.log(selectedCategoryId);
  useEffect(() => {
    fetchCategory();
    fetchProduct();
  }, [selectedCategoryId]);

  const handleCategorySelect = (selectCategoryId) => {
    setSelectedCategoryId(selectCategoryId);
  };

  const handleCategorySelectModalEdit = (id) => {
    setSelectedCategoryModal(id);
  };
  const openModaledit = (product) => {
    setEditProduct(product);
    setIsOpen(true);
  };
  console.log(editProduct, "ini edit product");

  const closeModalEdit = (product) => {
    setEditProduct(null);
    setIsOpen(false);
  };
  return (
    <>
      <NavTemplateAdmin>
        {isOpen && (
          <ModalAddCategoryName
            isOpen={isOpen}
            onClose={closeModalEdit}
            fetchCategory={fetchCategory}
            edit={editProduct}
            category={category}
            onSelectCategoryEdit={handleCategorySelectModalEdit}
            idSeselectCategoryModal={selectCategoryModal}
            fetchProduct={fetchProduct}
          />
        )}

        <div className="text-center ">
          <span className="border-b-2 border-black font-semibold text-xl">
            Manage Category
          </span>
        </div>
        <div>
          <div className="flex justify-end md: mr-20">
            <div>
              <SelectCategory
                category={category}
                onSelectCategory={handleCategorySelect}
                onSelectCategoryEdit={handleCategorySelectModalEdit}
              />
            </div>
            <div className="md:w-5"></div>
            <Button onClick={() => setIsOpen(true)}>Add Category Name</Button>
          </div>

          <TableManagementCategory
            products={products}
            setOrderCategory={setSelectedCategoryId} // Update selectedCategoryId, not orderCategory
            category={category}
            isEdit={openModaledit}
          />
        </div>
      </NavTemplateAdmin>
    </>
  );
};

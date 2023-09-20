import { useEffect, useState } from "react";
import { TableManagementCategory } from "../../components/table/tablemanagementcategory";
import { NavTemplateAdmin } from "../../components/template/template";
import api from "../../api/api";
import { SelectCategory } from "../../components/selectoption/selectoptioncategory";
import { Button } from "@chakra-ui/react";
import { ModalAddCategoryName } from "../../components/modals/modaladdcategory";
import { connect } from "react-redux";

import { Spinner } from "@chakra-ui/react";
import {
  startLoading,
  stopLoading,
} from "../../middlewares/loading-middleware";

export const PageManagementProduct = ({
  isLoading,
  startLoading,
  stopLoading,
}) => {
  const [category, setCategory] = useState([]);
  const [products, setProducts] = useState([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState(1);
  const [selectCategoryModal, setSelectedCategoryModal] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [editProduct, setEditProduct] = useState(null);
  console.log(isLoading, "INI LOADING");
  const fetchCategory = async () => {
    await api
      .get("/productcategories")
      .then((result) => setCategory(result.data))
      .catch((err) => console.log(err?.message));
  };

  const fetchProduct = async () => {
    try {
      // startLoading();
      await api
        .get("/products/withcategory", {
          params: { categoryid_product: selectedCategoryId },
        })
        .then((result) => setProducts(result.data))
        .catch((err) => console.log(err?.message));
    } catch (err) {
      console.log(err?.message);
      // stopLoading();
    }
  };

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

        <div className="text-center max-md:mt-28 md:ml-44">
          <span className="border-b-2 border-black font-semibold text-xl  ">
            Manage Category
          </span>
        </div>
        <div className="max-md:col-auto max-md:items-center max-md:mt-10">
          <div className="flex md:justify-end md: md:mr-20 max-md:justify-center">
            <div className="md:mt-4">
              <SelectCategory
                category={category}
                onSelectCategory={handleCategorySelect}
                onSelectCategoryEdit={handleCategorySelectModalEdit}
              />
            </div>
            <div className="md:w-5 max-md:w-5 "></div>
            <div className="md:mt-4">
              <Button onClick={() => setIsOpen(true)} size={"md"}>
                Add Category Name
              </Button>
            </div>
          </div>
          {/* {isLoading && (
            <div className="text-center">
              <Spinner size="xl" />
            </div>
          )} */}
          <div className="max-md:flex max-md:justify-center max-md:mt-6 ">
            <TableManagementCategory
              products={products}
              setOrderCategory={setSelectedCategoryId} // Update selectedCategoryId, not orderCategory
              category={category}
              isEdit={openModaledit}
            />
          </div>
        </div>
      </NavTemplateAdmin>
    </>
  );
};
// const mapStateToProps = (state) => ({
//   isLoading: state.loading.isLoading,
// });

// export default connect(mapStateToProps, { startLoading, stopLoading })(
//   PageManagementProduct
// );

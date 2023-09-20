import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Image,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Select,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { useFormik } from "formik";
import React, { useEffect, useRef, useState } from "react";
import defaultImage from "../../assets/pictures/nopicture-default.jpg";
import { renderImage } from "../../lib/render-image";
import * as Yup from "yup";
import { useSelector } from "react-redux";
import api from "../../api/api";

export const ModalProduct = ({ isOpen, onClose, edit }) => {
  // const { isOpen, onOpen, onClose } = useDisclosure();
  const userSelector = useSelector((state) => state.auth);
  const initialRef = React.useRef(null);
  const finalRef = React.useRef(null);
  const ref = useRef();
  const toast = useToast();
  const [previewImage, setPreviewImage] = useState({});
  const categoryOptions = [
    { value: 1, label: "Coffee" },
    { value: 2, label: "Non Coffee" },
    { value: 3, label: "Food" },
    { value: 4, label: "Snack" },
  ];

  const formik = useFormik({
    initialValues: {
      image: edit?.image || "",
      product_name: edit?.product_name || "",
      description: edit?.description || "",
      category_id: edit?.category_id || "",
      price: edit?.price || "",
      stock: edit?.stock || "",
    },
    initialTouched: {
      product_name: false,
      price: false,
      stock: false,
    },
    validationSchema: Yup.object().shape({
      product_name: Yup.string().min(3).required("Harap Isi Nama Produk!"),
      price: Yup.number().required("Harap Cantumkan Harga!"),
      stock: Yup.number().required("Harap Cantumkan Stok Produk!"),
    }),
    onSubmit: async (values) => {
      try {
        // const token = localStorage.getItem("auth");
        const formData = new FormData();
        formData.append("product_name", values.product_name);
        formData.append("description", values.description);
        formData.append("category_id", values.category_id);
        formData.append("price", values.price);
        formData.append("stock", values.stock);

        if (values.image) {
          formData.append("image", values.image);
        }

        if (edit) {
          const response = await api.patch(`/products/${edit.id}`, formData, {
            // params: { token },
          });
          toast({
            title: "Berhasil!",
            status: "success",
            description: "Produk Berhasil Diperbaharui",
            isClosable: true,
            position: "top",
            duration: 2023,
          });
          window.location.reload();
        } else {
          const response = await api.post("/products", formData, {
            // params: { token },
          });
          toast({
            title: "Berhasil!",
            status: "success",
            description: "Produk Berhasil Diperbaharui",
            isClosable: true,
            position: "top",
            duration: 2023,
          });
          window.location.reload();
        }
        onClose(true);
      } catch (err) {
        toast({
          title: "",
          description: err?.response?.data || "Ada Kesalahan Sistem",
          status: "error",
          position: "top",
          isClosable: true,
          duration: 2023,
        });
      }
    },
  });

  useEffect(() => {
    formik.resetForm();
    setPreviewImage(
      edit?.image ? "http://localhost:2000/static/" + edit?.image : defaultImage
    );
  }, [isOpen, edit]);

  const handleImageChange = async (e) => {
    const image = await renderImage(e);
    formik.setFieldValue("image", e.target.files[0]);
    // formik.setFieldValue("image", image);
    setPreviewImage(image);
  };

  return (
    <>
      <Modal
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay
          bg="blackAlpha.300"
          backdropFilter="blur(10px) hue-rotate(90deg)"
        />
        <ModalContent>
          <ModalHeader>{edit ? "Edit Produk" : "Tambah Produk"}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl className="flex flex-col justify-center items-center">
              <FormLabel>Gambar Produk</FormLabel>
              <Image
                src={previewImage}
                w={"100vw"}
                h={"100vh"}
                maxW={"180px"}
                maxH={"180px"}
                aspectRatio={1}
                objectFit={"cover"}
                onError={({ currentTarget }) => {
                  currentTarget.src = defaultImage;
                }}
                cursor={"pointer"}
                onClick={() => ref.current.click()}
              />
              <p
                className="mt-1 mb-1 font-extralight text-sm"
                style={{ cursor: "pointer" }}
                onClick={() => ref.current.click()}
              >
                Tekan untuk Upload Gambar
              </p>
              <input
                className="hidden"
                ref={ref}
                type="file"
                accept="image/*"
                onChange={handleImageChange}
              ></input>
            </FormControl>
            <FormControl
              mr="5%"
              isInvalid={
                formik.errors.product_name && formik.touched.product_name
              }
            >
              <FormLabel>Nama Produk</FormLabel>
              <Input
                ref={initialRef}
                name="product_name"
                value={formik.values.product_name}
                onChange={formik.handleChange("product_name")}
                placeHolder="Masukkan Nama Produk"
              />
              <FormErrorMessage>{formik.errors.product_name}</FormErrorMessage>
            </FormControl>
            <FormControl>
              <FormLabel>Deskripsi</FormLabel>
              <Input
                name="description"
                value={formik.values.description}
                onChange={formik.handleChange}
                placeHolder="Deskripsi Produk"
              />
            </FormControl>
            <FormControl
              mr="1%"
              isInvalid={
                formik.errors.category_id && formik.touched.category_id
              }
            >
              <FormLabel>Kategori</FormLabel>
              <Select
                name="category_id"
                value={formik.values.category_id}
                onChange={formik.handleChange("category_id")}
                placeholder="Pilih Kategori"
              >
                {categoryOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </Select>
              <FormErrorMessage>{formik.errors.category_id}</FormErrorMessage>
            </FormControl>
            <FormControl
              mr="1%"
              isInvalid={formik.errors.price && formik.touched.price}
            >
              <FormLabel>Harga</FormLabel>
              <Input
                name="price"
                type="number"
                value={formik.values.price}
                onChange={formik.handleChange("price")}
                placeHolder="Harga Produk"
              />
              <FormErrorMessage>{formik.errors.price}</FormErrorMessage>
            </FormControl>
            <FormControl
              mr="1%"
              isInvalid={formik.errors.stock && formik.touched.stock}
            >
              <FormLabel>Stok Produk</FormLabel>
              <Input
                name="stock"
                type="number"
                value={formik.values.stock}
                onChange={formik.handleChange("stock")}
                placeHolder="Stok Tersedia"
              />
              <FormErrorMessage>{formik.errors.stock}</FormErrorMessage>
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button
              colorScheme={"green"}
              onClick={formik.handleSubmit}
              isLoading={formik.isSubmitting}
            >
              Simpan
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

import {
  Button,
  FormControl,
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
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { useFormik } from "formik";
import React, { useEffect, useRef } from "react";
import defaultImage from "../assets/pictures/nopicture-default.jpg";
import { renderImage } from "../lib/render-image";
import * as Yup from "yup";
import api from "../api/api";
import { useSelector } from "react-redux";

export const ModalProduct = ({ isOpen, onClose, edit }) => {
  // const { isOpen, onOpen, onClose } = useDisclosure();
  const userSelector = useSelector((state) => state.auth);
  const initialRef = React.useRef(null);
  const finalRef = React.useRef(null);
  const ref = useRef();
  const toast = useToast();
  const formik = useFormik({
    initialValues: {
      image_url: "",
      product_name: "",
      description: "",
      category_id: 0,
      price: 0,
      stock: 0,
      image: null,
    },
    validationSchema: Yup.object().shape({
      image: Yup.string().min(3).required(),
    }),
    onSubmit: async (values) => {
      const token = localStorage.getItem("auth");
      const formData = new FormData();
      formData.append("product_name", values.product_name);
      formData.append("description", values.description);
      formData.append("categroy_id", values.category_id);
      formData.append("price", values.price);
      formData.append("stock", values.stock);
      api[edit ? "patch" : "post"](
        edit ? `/products/${edit.id}` : `/products`,
        formData,
        {
          params: {
            token,
            user_id: userSelector.id,
          },
        }
      )
        .then((result) => {
          toast({
            title: "Berhasil!",
            status: "success",
            description: "Produk Berhasil Ditambahkan",
            isClosable: true,
            position: "top",
            duration: 2023,
          });
          window.location.reload();
        })
        .catch((err) => {
          toast({
            title: "",
            description: err?.response?.data,
            status: "error",
            position: "top",
            isClosable: true,
            duration: 2023,
          });
        });
    },
  });

  useEffect(() => {
    formik.resetForm();
    console.log(isOpen);
    if(edit) {
      formik.setFieldValue('image_url', edit.image_url);
      formik.setFieldValue('product_name', edit.product_name);
      formik.setFieldValue('description', edit.description);
      formik.setFieldValue('category_id', edit.category_id);
      formik.setFieldValue('price', edit.price);
      formik.setFieldValue('stock', edit.stock);
    }
  }, [isOpen]);

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
          <ModalHeader>Tambahkan Produk</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl>
              <FormLabel>Gambar Produk</FormLabel>
              <Image
                src={formik.values.image_url}
                w="100vw"
                h={"100vh"}
                maxW={"240px"}
                maxH={"240px"}
                aspectRatio={1}
                objectFit={"cover"}
                onError={({ currentTarget }) => {
                  currentTarget.onerror = null;
                  currentTarget.src = defaultImage;
                }}
                cursor={"pointer"}
                onClick={() => ref.current.click()}
              />
              <input
                className="hidden"
                ref={ref}
                type="file"
                accept="image/*"
                onChange={async (e) => {
                  const image = await renderImage(e);
                  formik.setFieldValue("image", image);
                  formik.setFieldValue("image", e.target.files[0]);
                }}
              ></input>
            </FormControl>
            <FormControl>
              <FormLabel>Nama Produk</FormLabel>
              <Input ref={initialRef} placeHolder="Masukkan Nama Produk" />
            </FormControl>
            <FormControl>
              <FormLabel>Deskripsi</FormLabel>
              <Input ref={initialRef} placeHolder="Deskripsi Produk" />
            </FormControl>
            <FormControl>
              <FormLabel>Kategori</FormLabel>
              <Input ref={initialRef} placeHolder="Produk Kategori" />
            </FormControl>
            <FormControl>
              <FormLabel>Harga</FormLabel>
              <Input ref={initialRef} type='number' placeHolder="Harga Produk" />
            </FormControl>
            <FormControl>
              <FormLabel>Stok Produk</FormLabel>
              <Input ref={initialRef} type="number" placeHolder="Stok Tersedia" />
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme={"green"} onClick={() => {}}>
              Simpan
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

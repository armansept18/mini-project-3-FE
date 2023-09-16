import {
  Flex,
  Icon,
  useColorModeValue,
  Button,
  chakra,
} from "@chakra-ui/react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { HiDotsHorizontal } from "react-icons/hi";
import { ArrowLeftIcon, ArrowRightIcon } from "@chakra-ui/icons";
import React, { useEffect, useState } from "react";
import { PagButton } from "./itempagination/pagbutton";

export const PaginationCakraUiCashier = ({ product, fetchProduct }) => {
  const [page, setPage] = useState(1);
  const itemsPerPage = 10;

  const handlePageChange = (newPage) => {
    if (newPage >= 1) {
      setPage(newPage);
    }
  };

  useEffect(() => {
    fetchProduct(page, itemsPerPage);
  }, [page]);

  return (
    <Flex alignItems="center" justifyContent="center" className="mt-16">
      <Button
        onClick={() => handlePageChange(page - 1)}
        isDisabled={page === 1}
        colorScheme="gray"
        variant="outline"
        className=""
      >
        <Icon as={IoIosArrowBack} />
      </Button>
      {[...Array.from({ length: page })].map((val, index) => (
        <Button
          key={index}
          onClick={() => handlePageChange(index + 1)}
          colorScheme={index + 1 === page ? "brand" : "gray"}
        >
          {index + 1}
        </Button>
      ))}
      <Button
        onClick={() => handlePageChange(page + 1)}
        isDisabled={product?.products?.length < 10}
        colorScheme="gray"
        variant="outline"
      >
        <Icon as={IoIosArrowForward} />
      </Button>
    </Flex>
  );
};

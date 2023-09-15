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

export const PaginationCakraUi = ({ product, page, setPage }) => {
  console.log(product, "Ini product di pagination");

  console.log(page, "ini page");
  const handlePageChange = (newPage) => {
    if (page >= 1) {
      setPage(page);
    }
  };

  const totalPages = product?.length;
  console.log(totalPages);

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
      {[...Array.from({ length: totalPages })].map((val, index) => (
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
        isDisabled={page === totalPages}
        colorScheme="gray"
        variant="outline"
      >
        <Icon as={IoIosArrowForward} />
      </Button>
    </Flex>
  );
};

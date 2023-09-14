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

export const PaginationCakraUi = ({ product, fetchProduct }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const handlePageChange = (newPage) => {
    if (newPage >= 1) {
      setCurrentPage(newPage);
    }
  };

  const totalPages = product?.product?.length - 1;
  console.log(totalPages);
  useEffect(() => {
    fetchProduct(currentPage, itemsPerPage);
  }, [currentPage]);

  return (
    <Flex alignItems="center" justifyContent="center" className="mt-16">
      <Button
        onClick={() => handlePageChange(currentPage - 1)}
        isDisabled={currentPage === 1}
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
          colorScheme={index + 1 === currentPage ? "brand" : "gray"}
        >
          {index + 1}
        </Button>
      ))}
      <Button
        onClick={() => handlePageChange(currentPage + 1)}
        isDisabled={currentPage === totalPages}
        colorScheme="gray"
        variant="outline"
      >
        <Icon as={IoIosArrowForward} />
      </Button>
    </Flex>
  );
};

import { Flex, Icon, Button } from "@chakra-ui/react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

import React, { useEffect, useState } from "react";

export const PaginationCakraUi = ({ product, page, setPage }) => {
  const itemsPerPage = 5;

  const handlePageChange = (newPage) => {
    if (newPage > 1) setPage(newPage);
  };
  return (
    <Flex alignItems="center" justifyContent="center" className="mt-16">
      <Button
        onClick={() => handlePageChange(setPage(page - 1))}
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
          {console.log(index + 1)}
          {index + 1}
        </Button>
      ))}
      <Button
        onClick={() => handlePageChange(setPage(page + 1))}
        isDisabled={product.length < itemsPerPage}
        colorScheme="gray"
        variant="outline"
      >
        <Icon as={IoIosArrowForward} />
      </Button>
    </Flex>
  );
};

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

export const PaginationCakraUiAdmin = ({
  product,
  fetchSearch,
  totalItem,
  sortOrder,
  search,
}) => {
  const [page, setPage] = useState(1);

  const itemsPerPage = 5;

  const handlePageChange = (newPage) => {
    if (newPage >= 1) {
      setPage(newPage);
    }
  };

  useEffect(() => {
    console.log(totalItem);
    fetchSearch(page, itemsPerPage);
  }, [page, totalItem, search, sortOrder]);

  return (
    <Flex
      alignItems="center"
      justifyContent="center"
      className="mt-16"
      marginLeft={{ base: 0, md: "256px" }}
    >
      <Button
        onClick={() => handlePageChange(page - 1)}
        isDisabled={page === 1}
        colorScheme="gray"
        variant="outline"
        className=""
      >
        <Icon as={IoIosArrowBack} />
      </Button>
      {[...Array(totalItem)].map((val, index) => (
        <Button
          key={index}
          onClick={() => handlePageChange(index + 1)}
          colorScheme={index + 1 === page ? "blackAlpha" : "gray"}
        >
          {index + 1}
        </Button>
      ))}
      <Button
        onClick={() => handlePageChange(page + 1)}
        isDisabled={product?.product?.length < 5}
        colorScheme="gray"
        variant="outline"
      >
        <Icon as={IoIosArrowForward} />
      </Button>
    </Flex>
  );
};

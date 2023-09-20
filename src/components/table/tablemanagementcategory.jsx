import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
} from "@chakra-ui/react";

import { BiEditAlt } from "react-icons/bi";

export const TableManagementCategory = ({ products, isEdit }) => {
  return (
    <>
      <div className="flex md:justify-center md:ml-48">
        <div className="md:p-5 md:w-4/5">
          <TableContainer className=" max-md:text-base p-4">
            <Table variant="simple">
              <Thead>
                <Tr>
                  <Th
                    className="text-center bg-slate-200"
                    style={{ borderRadius: "12px", padding: "20px" }}
                  >
                    NAME PRODUCT
                  </Th>
                  <Th
                    className="text-center bg-slate-200"
                    style={{ borderRadius: "12px" }}
                  >
                    Category Name
                  </Th>
                </Tr>
              </Thead>
              <Tbody className="">
                {products?.product?.map((item, index) => {
                  return (
                    <>
                      <Tr>
                        <Td
                          style={{
                            borderRadius: "12px",
                            boxShadow: "1px 1px 2px black",
                          }}
                        >
                          {item.product_name}
                        </Td>
                        <Td
                          style={{
                            borderRadius: "12px",
                            boxShadow: "1px 1px 2px black",
                          }}
                          key={item.id}
                          className="flex justify-between"
                        >
                          {item.ProductCategory?.category_name}
                          <BiEditAlt
                            onClick={() => isEdit(item)}
                            className="cursor-pointer"
                          />
                        </Td>
                      </Tr>
                    </>
                  );
                })}
              </Tbody>
            </Table>
          </TableContainer>
        </div>
      </div>
    </>
  );
};

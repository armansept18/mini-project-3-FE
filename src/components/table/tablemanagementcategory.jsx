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

export const TableManagementCategory = ({ products }) => {
  return (
    <>
      <div className="flex justify-between ">
        <div></div>
        <div style={{ width: "60vw" }} className="md:mr-28">
          <TableContainer className="md:mt-8 ">
            <Table variant="simple">
              <Thead>
                <Tr>
                  <Th
                    className="text-center bg-slate-200"
                    style={{ borderRadius: "12px" }}
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
              <Tbody>
                {products?.product?.map((item, index) => {
                  return (
                    <>
                      <Tr>
                        <Td>{item.product_name}</Td>
                        <Td key={item.id} className="flex justify-between">
                          {item.ProductCategory?.category_name}
                          <BiEditAlt />
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

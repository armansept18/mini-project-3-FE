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

export const TableManagementCategory = () => {
  return (
    <>
      <div className="flex justify-between">
        <div></div>
        <div style={{ width: "60vw" }} className="md:mr-28">
          <div className="text-center ">
            <span className="border-b-2 border-black font-semibold text-xl">
              Manage Category
            </span>
          </div>
          <TableContainer className="md:mt-8">
            <Table variant="simple">
              <Thead>
                <Tr>
                  <Th>Coffee</Th>
                  <Th>Non Coffee</Th>
                  <Th>Food</Th>
                  <Th>Snack</Th>
                </Tr>
              </Thead>
              <Tbody>
                <Tr>
                  <Td>inches</Td>
                  <Td>millimetres (mm)</Td>
                  <Td isNumeric>25.4</Td>
                </Tr>
                <Tr>
                  <Td>feet</Td>
                  <Td>centimetres (cm)</Td>
                  <Td isNumeric>30.48</Td>
                </Tr>
                <Tr>
                  <Td>yards</Td>
                  <Td>metres (m)</Td>
                  <Td isNumeric>0.91444</Td>
                </Tr>
              </Tbody>
              <Tfoot>
                <Tr>
                  <Th>To convert</Th>
                  <Th>into</Th>
                  <Th isNumeric>multiply by</Th>
                </Tr>
              </Tfoot>
            </Table>
          </TableContainer>
        </div>
      </div>
    </>
  );
};

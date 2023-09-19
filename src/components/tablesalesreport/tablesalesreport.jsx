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
export const TableSalesReport = ({ transaction }) => {
  // const headerKeys = Object.keys(transaction?.transactions[0]);
  // console.log(headerKeys);

  const formatDate = (isoDate) => {
    const date = new Date(isoDate);
    return date.toLocaleDateString();
  };
  return (
    <>
      <TableContainer>
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>No Invoice</Th>
              <Th>Chasier Name</Th>
              <Th>Customer Name</Th>
              <Th>Product Name</Th>
              <Th>Total Price</Th>
              <Th>Transaction Date </Th>
            </Tr>
          </Thead>
          <Tbody>
            {/* {transaction?.transactions?.map((item) => { */}
              return (
                <Tr>
                  <Td className="text-center">{""}</Td>
                  <Td>{"item.User.first_name"}</Td>
                  <Td>{"item.customer_name"}</Td>
                  <Td>{"item.Product.product_name"}</Td>
                  <Td>{"item.total_price"}</Td>
                  <Td>{"formatDate(item.transaction_date)"}</Td>
                </Tr>
              );
            {/* })} */}
          </Tbody>
        </Table>
      </TableContainer>
    </>
  );
};

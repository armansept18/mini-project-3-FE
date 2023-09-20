import {
  Card,
  CardBody,
  Heading,
  SimpleGrid,
  Text,
  useMediaQuery,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import api from "../../api/api";

export const ReportCard = () => {
  const [totalPenjualan, setTotalPenjualan] = useState(0);
  const [totalTransaksi, setTotalTransaksi] = useState(0);
  const [totalProdukTerjual, setTotalProdukTerjual] = useState(0);

  useEffect(() => {
    api.get("/transactions/total-sales").then((response) => {
      setTotalPenjualan(response.data.salesTotal);
      console.log(response.data.salesTotal);
    });

    api.get("/transactions/total-transaction").then((response) => {
      setTotalTransaksi(response.data.transactionTotal);
    });

    api.get("/transactiondetails/total-sold").then((response) => {
      setTotalProdukTerjual(response.data.totalSoldProduct);
    });
  }, []);

  const [isLargerThan768] = useMediaQuery("(min-width: 768px)");

  return (
    <SimpleGrid
      className="flex justify-center items-center mt-10"
      columns={[1, 2, 3]}
      spacing={4}
      marginLeft={isLargerThan768 ? "268px" : "0"} 
    >
      <Card
        boxShadow="dark-lg"
        backgroundColor="gray.100"
        width={isLargerThan768 ? "auto" : "100%"}
      >
        <CardBody>
          <Text>Total Sales Alltime</Text>
          <Heading className="mt-3" size="sm">
            Rp {totalPenjualan.toLocaleString("id-ID")}
          </Heading>
        </CardBody>
      </Card>
      <Card
        boxShadow="dark-lg"
        backgroundColor="gray.100"
        width={isLargerThan768 ? "auto" : "100%"}
      >
        <CardBody>
          <Text>Total Transaction Alltime</Text>
          <Heading className="mt-3" size="sm">
            {totalTransaksi} Transactions
          </Heading>
        </CardBody>
      </Card>
      <Card
        boxShadow="dark-lg"
        backgroundColor="gray.100"
        width={isLargerThan768 ? "auto" : "100%"}
      >
        <CardBody>
          <Text>Total Sold Products Alltime</Text>
          <Heading className="mt-3" size="sm">
            {totalProdukTerjual} Products
          </Heading>
        </CardBody>
      </Card>
    </SimpleGrid>
  );
};

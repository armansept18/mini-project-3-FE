import { ChevronDownIcon } from "@chakra-ui/icons";
import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Heading,
  SimpleGrid,
  Text,
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
    console.log(totalPenjualan);
    api.get("/transactions/total-transaction").then((response) => {
      setTotalTransaksi(response.data.transactionTotal);
    });
    console.log(totalTransaksi);
    api.get("/transactiondetails/total-sold").then((response) => {
      setTotalProdukTerjual(response.data.totalSoldProduct);
    });
    console.log(totalProdukTerjual);
  }, []);

  return (
    <>
      <SimpleGrid
        className="flex justify-center items-center mt-10"
        maxWidth={800}
        spacing={4}
        templateColumns="repeat(auto-fill, minmax(250px, 1fr))"
      >
        <Card boxShadow={"dark-lg"} backgroundColor={"gray.100"}>
          <CardBody>
            <Text>Total Sales Alltime</Text>
            <Heading className="mt-3" size={"sm"}>
              Rp {totalPenjualan.toLocaleString("id-ID")}
            </Heading>
            <span className="">
              View here <ChevronDownIcon />
            </span>
          </CardBody>
        </Card>
        <Card boxShadow={"dark-lg"} backgroundColor={"gray.100"}>
          <CardBody>
            <Text>Total Transaction Alltime</Text>
            <Heading className="mt-3" size={"sm"}>
              {totalTransaksi} Transactions
            </Heading>
            <span>
              View here <ChevronDownIcon />
            </span>
          </CardBody>
        </Card>
        <Card boxShadow={"dark-lg"} backgroundColor={"gray.100"}>
          <CardBody>
            <Text>Total Sold Products Alltime</Text>
            <Heading className="mt-3" size={"sm"}>
              {totalProdukTerjual} Products
            </Heading>
            <span>
              View here <ChevronDownIcon />
            </span>
          </CardBody>
        </Card>
      </SimpleGrid>
    </>
  );
};

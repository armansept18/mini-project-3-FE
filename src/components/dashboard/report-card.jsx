import { ChevronDownIcon } from "@chakra-ui/icons";
import { Card, CardBody, CardFooter, CardHeader, Heading, SimpleGrid, Text } from "@chakra-ui/react";

export const ReportCard = () => {
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
            <Text>Total Keuntungan Penjualan</Text>
            <Heading className="mt-3" size={"sm"}>
              Rp 25.125.320,00
            </Heading>
            <span className="">
              View here <ChevronDownIcon />
            </span>
          </CardBody>
        </Card>
        <Card boxShadow={"dark-lg"} backgroundColor={"gray.100"}>
          <CardBody>
            <Text>Total Transaksi</Text>
            <Heading className="mt-3" size={"sm"}>
              24 Transaksi
            </Heading>
            <span>
              View here <ChevronDownIcon />
            </span>
          </CardBody>
        </Card>
        <Card boxShadow={"dark-lg"} backgroundColor={"gray.100"}>
          <CardBody>
            <Text>Total Produk Terjual</Text>
            <Heading className="mt-3" size={"sm"}>
              57 Produk
            </Heading>
            <span>
              View here <ChevronDownIcon />
            </span>
          </CardBody>
        </Card>
      </SimpleGrid>
    </>
  );
}

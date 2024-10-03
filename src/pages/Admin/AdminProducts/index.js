import { useMemo } from "react";

import { Link } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "react-query";
import { fetchProductList, deleteProduct } from "../../../api";

import { Table, Popconfirm } from "antd";

import { Text, Button, Flex, Box,Spinner } from "@chakra-ui/react";

import "./styles.css";
import { motion } from "framer-motion";


function AdminProducts() {
  const queryClient = useQueryClient();
  const MotionBox = motion.div;

  const { isLoading, isError, data, error } = useQuery(
    "admin:products",
    fetchProductList
  );

  const deleteMutation = useMutation(deleteProduct, {
    onSuccess: () => {
      queryClient.invalidateQueries("admin:products");
    },
  });

  const columns = useMemo(() => {
    return [
      { title: "ÜRÜN ADI", dataIndex: "title", key: "title" },
      {
        title: "FİYAT",
        dataIndex: "price",
        key: "price",
      },
      {
        title: "OLUŞTURULMA TARİHİ",
        dataIndex: "createdAt",
        key: "createdAt",
      },
      {
        title: "AKSİYONLAR",
        key: "action",
        render: (text, record) => (
          <>
            <Box className="flex justify-center items-center">
              <Link to={`/admin/products/${record._id}`}>
                <Button
                  bg="blue.500"
                  color="white"
                  _hover={{ bg: "blue.600" }}
                  _active={{ bg: "blue.700" }}
                  mr={2} // Adds some space to the right
                >
                  Düzenle
                </Button>
              </Link>

              <Popconfirm
                title="Are you sure?"
                onConfirm={() => {
                  deleteMutation.mutate(record._id, {
                    onSuccess: () => {
                      console.log("success");
                    },
                  });
                }}
                onCancel={() => {
                  console.log("iptal edildi");
                }}
                okText="Yes"
                cancelText="No"
                placement="left"
              >
                <Button
                  bg="red.500"
                  color="white"
                  _hover={{ bg: "red.600" }}
                  _active={{ bg: "red.700" }}
                >
                  Sil
                </Button>
              </Popconfirm>
            </Box>
          </>
        ),
      },
    ];
  }, []);

  if (isLoading) {
    return (
      <Flex justifyContent="center" alignItems="center" height="100vh" width="100wh">
        <Spinner
          thickness="4px"
          speed="0.50s"
          emptyColor="gray.200"
          color="orange.300"
          size="xl"
        />
      </Flex>
    );
  }

  if (isError) {
    return <div>Bir hata oluştu: {error.message}</div>;
  }

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <Flex
        justifyContent={"space-between"}
        alignItems={"center"}
        p={2}
        bg={"#8d8d8d"}
      >
        <Box>{/* This is empty Box */}</Box>
        <Box
          display={"flex"}
          justifyContent={"center"}
          alignItems={"center"}
          fontSize={"3xl"}
          as="b"
          color={"orange.300"}
        >
          <Text>Ürünler</Text>
        </Box>
        <Box>
          <Link to="/admin/products/new">
            <Button
              bg={"orange.300"}
              shadow={"xl"}
              _hover={{
                color: "white",
              }}
            >
              {" "}
              Yeni Ürün
            </Button>
          </Link>
        </Box>
      </Flex>

      <Table
        strong={true}
        dataSource={data}
        columns={columns}
        rowKey="_id"
        _hover
      ></Table>
    </motion.div>
  );
}

export default AdminProducts;

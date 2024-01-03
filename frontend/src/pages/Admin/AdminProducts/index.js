import { useMemo } from "react";

import { Link } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "react-query";
import { fetchProductList, deleteProduct } from "../../../api";

import { Table, Popconfirm } from "antd";

import { Text, Button, Flex, Box } from "@chakra-ui/react";
import { motion } from "framer-motion";

import "./styles.css";

function AdminProducts() {
  const queryClient = useQueryClient();

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
      { title: "TITLE", dataIndex: "title", key: "title" },
      {
        title: "PRICE",
        dataIndex: "price",
        key: "price",
      },
      {
        title: "CREATED AT",
        dataIndex: "createdAt",
        key: "createdAt",
      },
      {
        title: "ACTION",
        key: "action",
        render: (text, record) => (
          <>
            <Link to={`/admin/products/${record._id}`}>Edit</Link>

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
              <button href="/#" style={{ marginLeft: 10 }}>
                Delete
              </button>
            </Popconfirm>
          </>
        ),
      },
    ];
  }, []);

  if (isLoading) {
    return <Box display={"flex"} justifyContent={"center"} alignItems={"center"} fontSize={"3xl"} color={"cyan.400"} > Loading...</Box>;
  }

  if (isError) {
    return <div>Error {error.message}</div>;
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
          <Text>Products</Text>
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
              New
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

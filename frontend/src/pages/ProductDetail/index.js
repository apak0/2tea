import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { fetchProduct } from "../../api";
import { Box, Text, Button } from "@chakra-ui/react";
import ImageGallery from "react-image-gallery";
import moment from "moment";
import { useBasket } from "../../contexts/BasketContext";
import { m, motion } from "framer-motion";

function ProductDetail() {
  const { product_id } = useParams();
  const { addToBasket, items } = useBasket();

  const { isLoading, error, data } = useQuery(["products", product_id], () =>
    fetchProduct(product_id)
  );
  if (isLoading) return "Loading...";

  if (error) return "An error has occurred: " + error.message;

  const findBasketItem = items.find((item) => item._id === product_id);
  const images = data.photos.map((url) => ({ original: url }));

  return (
    <Box margin={"2rem"}>
      <motion.Box initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        <Box>
          <Box className="d-flex justify-center">
            <Box>
              <Text as="h2" fontSize="2xl">
                {data.title}
              </Text>
            </Box>
            <Box>
              <Text>{moment(data.createdAt).format("DD/MM/YYYY")}</Text>
            </Box>
          </Box>

          <Box>
            <p>{data.description}</p>
          </Box>
          <Box margin="10"
          >
            <ImageGallery
              
              showFullscreenButton={false}
              showPlayButton={false}
              items={images}
              showThumbnails={false}
            />
          </Box>
          <Box className="mx-5" textAlign={"center"} mb={5}>
            <Button
              colorScheme={findBasketItem ? "green" : "pink"}
              onClick={() => addToBasket(data, findBasketItem)}
            >
              {findBasketItem ? "Remove" : "Add to Basket"}
            </Button>
          </Box>
        </Box>
      </motion.Box>
    </Box>
  );
}

export default ProductDetail;

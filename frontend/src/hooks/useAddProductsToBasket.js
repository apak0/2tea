import { useBasket } from "../contexts/BasketContext";

const useAddProductsToBasket = () => {
  const { setItems } = useBasket();

  const addProductsToBasket = (data) => {
    // Tüm sayfaları birleştirerek tek bir ürün listesi elde etme
    const allItems = data.pages.reduce((acc, page) => [...acc, ...page], []);

    // BasketContext'teki items state'ini güncelleme
    setItems((prevItems) =>
      prevItems.map((item) => {
        const newItem = allItems.find((newItem) => newItem._id === item._id);
        return newItem ? { ...item, quantity: newItem.quantity } : item;
      })
    );
  };

  return addProductsToBasket;
};

export default useAddProductsToBasket;
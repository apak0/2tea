import { useQueryClient } from "react-query";

export function useClearOrders() {
  const queryClient = useQueryClient();

  const clearOrders = () => {
    queryClient.invalidateQueries("orders");
  };

  return clearOrders;
}
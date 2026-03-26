import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { OrderItem, Product } from "../backend.d";
import { useActor } from "./useActor";

export function useGetProducts() {
  const { actor, isFetching } = useActor();
  return useQuery<Product[]>({
    queryKey: ["products"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getProducts();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useAddProduct() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: {
      name: string;
      description: string;
      price: bigint;
      category: string;
      stock: bigint;
      imageUrl: string;
    }) => {
      if (!actor) throw new Error("No actor");
      return actor.addProduct(
        data.name,
        data.description,
        data.price,
        data.category,
        data.stock,
        data.imageUrl,
      );
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["products"] }),
  });
}

export function useUpdateProduct() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: {
      id: bigint;
      name: string;
      description: string;
      price: bigint;
      category: string;
      stock: bigint;
      imageUrl: string;
    }) => {
      if (!actor) throw new Error("No actor");
      return actor.updateProduct(
        data.id,
        data.name,
        data.description,
        data.price,
        data.category,
        data.stock,
        data.imageUrl,
      );
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["products"] }),
  });
}

export function useDeleteProduct() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: bigint) => {
      if (!actor) throw new Error("No actor");
      return actor.deleteProduct(id);
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["products"] }),
  });
}

export function usePlaceOrder() {
  const { actor } = useActor();
  return useMutation({
    mutationFn: async (data: { items: OrderItem[]; total: bigint }) => {
      if (!actor) throw new Error("No actor");
      return actor.placeOrder(data.items, data.total);
    },
  });
}

export function useInitializeStore() {
  const { actor, isFetching } = useActor();
  return useQuery({
    queryKey: ["initStore"],
    queryFn: async () => {
      if (!actor) return null;
      await actor.initializeStore();
      return true;
    },
    enabled: !!actor && !isFetching,
    staleTime: Number.POSITIVE_INFINITY,
  });
}

import { api } from "@/services/api"
import type { Product } from "@/types"
import { useQuery } from "@tanstack/react-query"
import { toast } from "sonner"

export const useProducts = () => {
  const getProducts = async () => {
    try {
      const { data } = await api.get<Product[]>("/products")
      return data
    } catch {
      toast.error("Ooops!", {
        description: "Não foi possível carregar a relação de produtos",
      })
    }
  }

  const { data: products = [], isLoading } = useQuery({
    queryKey: ["products"],
    queryFn: getProducts,
  })

  return {
    products,
    isLoading,
  }
}

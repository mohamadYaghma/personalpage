import { addToCart, decrementFromCart } from '@/services/CartService'
import { useMutation } from '@tanstack/react-query'

export const useAddTocart = () => useMutation({
    mutationFn:addToCart,
})


export const useDecrementFromCart = () => useMutation({
    mutationFn: decrementFromCart,
})
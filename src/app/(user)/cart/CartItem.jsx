"use client"
import { TableCell, TableRow , Table, TableHeader, TableColumn, TableBody} from '@nextui-org/react';
import { HiMinus, HiOutlineTrash, HiPlus } from "react-icons/hi";
import './TableStyle.css'  // اضافه کردن فایل استایل سفارشی
import { useAddTocart, useDecrementFromCart } from '@/hooks/useCart';
import toast from 'react-hot-toast';
import { useQueryClient } from '@tanstack/react-query';
import { toPersianNumbers, toPersianNumbersWithComma } from '@/utils/toPersianNumber';


export default function CartItem({cartItemm}) {
    const {isLoading , mutateAsync} = useAddTocart()
    const { mutateAsync : mutateDecrement} = useDecrementFromCart()
    const queryClient= useQueryClient();

    const addToCartHandler = async () => {
        try {
            const {message} = await mutateAsync(cartItemm._id);
            toast.success(message);
            queryClient.invalidateQueries({queryKey:["get-user"]});

        } catch (error) {
            if(error?.response?.data){
                toast.error(error.response.data.message);
            }
        }   
    }

    const decrementHandler = async () =>{
        try {
            const {message} = await mutateDecrement(cartItemm._id);
            toast.success(message);
            queryClient.invalidateQueries({queryKey:["get-user"]});

        } catch (error) {
            if(error?.response?.data){
                toast.error(error.response.data.message);
            }
        }   
    }
  return (

    <Table className="customTable ">
            <TableHeader>
                <TableColumn></TableColumn>
                <TableColumn></TableColumn>
                <TableColumn></TableColumn>
                <TableColumn></TableColumn>

            </TableHeader>
            <TableBody>


                <TableRow  key={cartItemm._id}>
                    <TableCell className='font-bold'>{cartItemm.title}</TableCell>
                    <TableCell>تعداد : {toPersianNumbers(cartItemm.quantity) }</TableCell>
                    <TableCell>
                    قیمت :
                        {" "}
                        <span className={`${cartItemm.discount ? "line-through text-gray-500" : "font-bold" } ` }>
                           {toPersianNumbersWithComma(cartItemm.price)} 
                        </span>
                        <div>
                            {!!cartItemm.discount && (
                                <div className='flex items-center gap-x-2 mt-2 mr-16'>
                                    <p className='font-bold'>
                                        {toPersianNumbersWithComma (cartItemm.offPrice)}
                                    </p>
                                    <div className='bg-rose-500 px-2 py-0.5 rounded-xl text-white text-sm'>
                                        {cartItemm.discount} %
                                    </div>
                                </div>
                            )}
                        </div>
                        
                    </TableCell>
                    <TableCell>
                        <div>
                            <button onClick={addToCartHandler} className="rounded p-1 bg-primary-900 text-white mx-2">
                                <HiPlus className=" w-4 h-6 "/>
                            </button>
                            {/* <button>
                                <HiOutlineTrash className="text-rose-500 w-6 h-6 mx-2"/>
                            </button> */}
                            <button onClick={decrementHandler} className="rounded border p-1 mx-2">
                                {
                                    cartItemm.quantity > 1 ? (
                                    <HiMinus className=" w-4 h-6 "/>
                                    ):(
                                    <HiOutlineTrash className="text-rose-500 w-6 h-6 mx-2"/>)
                                }
                                
                            </button>
                        </div>
                    </TableCell>
                </TableRow>
    
            </TableBody>

    </Table>       
  )
}

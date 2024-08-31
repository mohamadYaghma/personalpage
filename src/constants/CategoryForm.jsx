import { EditcategoriesListTableHeads } from './tableHeads'
import TextFild from '@/common/TextFild'
import Loading from '@/common/Loading'
import Select from 'react-select'


export const categoryTypes = [
    {
        id:  1,
        label : "محصول" ,
        value : "product",
    },
    {
        id:  2,
        label : "پست" ,
        value : "post",
    },
    {
        id: 3 ,
        label : "تیکت" ,
        value : "ticket",
    },
    {
        id:  4,
        label : "نظرات" ,
        value : "comment",
    },
]

export default function CategoryForm({
    onSubmit ,
    isLoading ,
    categoryDataOnChange ,
    categoryData,
    selectedType,
    setSelectedType,
    }) {
  return (
    <div className='max-w-sm'>
        <form className='space-y-4' onSubmit={onSubmit}>
            {
                EditcategoriesListTableHeads.map((item)=>{
                    return(
                        <TextFild 
                        className="text-black"
                        key={item.id}
                        label={item.label}
                        name={item.name}
                        value={categoryData[item.name] ?? ""} 
                        onChange={categoryDataOnChange}
                        />
                    )
                })
            }
            <div>
                <label htmlFor='type' className='mb-2 block' >نوع</label>
                <Select
                    instanceId="type"
                    onChange={setSelectedType}
                    defaultValue={selectedType}
                    options={categoryTypes}
                    // getOptionLabel={(option)=>option.label}
                    // getOptionValue={(option)=>option.value}
                />
            </div>
            <div>
                {
                    isLoading ? (
                        <Loading />) : (
                        <button className='btn btn--primary w-full' type='submit'>
                            ارسال  
                        </button>
                    )
                }   
            </div>
        </form>
    </div>
  )
}

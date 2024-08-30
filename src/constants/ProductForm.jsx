import { AddproductListTableHeads } from '@/constants/tableHeads'
import TextFild from '@/common/TextFild'
import { TagsInput } from "react-tag-input-component";
import Select from 'react-select';
import Loading from '@/common/Loading';

export default function ProductForm({
    onSubmit ,
     tags , 
     setTags , 
     productData , 
     productDataOnChange ,
     categories ,
     setSelectedCategory ,
     isLoading ,
     selectedCategory,
    }) {
  return (
    <div className='max-w-sm'>
        <form className='space-y-4' onSubmit={onSubmit}>
            {
                AddproductListTableHeads.map((item)=>{
                    return(
                        <TextFild 
                            key={item.id}
                            label={item.label}
                            name={item.name}
                            value={productData[item.name] ?? ""} 
                            onChange={productDataOnChange}
                        />
                    )
                })
            }
            <div>
                <label htmlFor='tags' className='mb-2'>تگ محصولات</label>
                <TagsInput
                id="tags"
                value={tags}
                onChange={setTags}
                name="fruits"
            />
            </div>
            <div>
                <label htmlFor='category' className='mb-2'>دسته بندی</label>
                <Select
                    instanceId='category'
                    onChange={setSelectedCategory}
                    options={categories}
                    getOptionLabel={(option) => option.title }
                    getOptionValue={(option) => option._id }
                    defaultValue={selectedCategory}
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

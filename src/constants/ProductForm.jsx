import { AddproductListTableHeads } from '@/constants/tableHeads';
import TextFild from '@/common/TextFild';
import { TagsInput } from 'react-tag-input-component';
import Select from 'react-select';
import Loading from '@/common/Loading';

export default function ProductForm({
    onSubmit,
    tags,
    setTags,
    productData,
    productDataOnChange,
    categories,
    setSelectedCategory,
    isLoading,
    selectedCategory,
    setSelectedImage,
}) {
    return (
        <div className='max-w-3xl mx-auto px-4 py-6 '>
            <form className='space-y-6' onSubmit={onSubmit} >
                {/* فرم فیلدها */}
                <div className='grid grid-cols-1 gap-4'>
                    {AddproductListTableHeads.map((item) => (
                        <div key={item.id} className='flex flex-col'>
                            <label className='text-sm font-medium mb-1'>{item.label}</label>
                            <TextFild
                                name={item.name}
                                value={productData[item.name] ?? ""}
                                onChange={productDataOnChange}
                                className='p-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500'
                            />
                        </div>
                    ))}
                </div>

                {/* آپلود فایل */}
                <div className='flex flex-col'>
                    <label htmlFor='file' className='text-sm font-medium mb-1'>آپلود تصویر</label>
                    <input
                        type='file'
                        id='file'
                        name='file'
                        onChange={setSelectedImage}
                        className='file:border file:border-gray-300 file:rounded-lg file:py-2 file:px-4 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-600 file:cursor-pointer file:hover:bg-blue-100'
                    />
                </div>

                {/* تگ‌های محصولات */}
                <div className='flex flex-col'>
                    <label htmlFor='tags' className='text-sm font-medium mb-1'>تگ محصولات</label>
                    <TagsInput
                        id='tags'
                        value={tags}
                        onChange={setTags}
                        name='tags'
                        className='border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500'
                    />
                </div>

                {/* دسته بندی */}
                <div className='flex flex-col'>
                    <label htmlFor='category' className='text-sm font-medium mb-1'>دسته بندی</label>
                    <Select
                        instanceId='category'
                        onChange={setSelectedCategory}
                        options={categories}
                        getOptionLabel={(option) => option.title}
                        getOptionValue={(option) => option._id}
                        value={selectedCategory}
                        className='border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500'
                    />
                </div>

                {/* دکمه ارسال */}
                <div className='flex justify-center'>
                    {isLoading ? (
                        <Loading />
                    ) : (
                        <button style={{ backgroundColor: '#2563EB' }} className='w-full py-2 px-4 rounded-lg shadow-md text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500' type='submit'>
                            ارسال
                        </button>


                    )}
                </div>
            </form>
        </div>
    );
}

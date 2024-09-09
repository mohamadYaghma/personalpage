import { EditcategoriesListTableHeads } from './tableHeads';
import TextFild from '@/common/TextFild';
import Loading from '@/common/Loading';
import Select from 'react-select';

export const categoryTypes = [
    {
        id: 1,
        label: "محصول",
        value: "product",
    },
    {
        id: 2,
        label: "پست",
        value: "post",
    },
    {
        id: 3,
        label: "تیکت",
        value: "ticket",
    },
    {
        id: 4,
        label: "نظرات",
        value: "comment",
    },
];

export default function CategoryForm({
    onSubmit,
    isLoading,
    categoryDataOnChange,
    categoryData,
    selectedType,
    setSelectedType,
}) {
    return (
        <div className="max-w-md w-full mx-auto p-6 bg-white rounded-lg shadow-lg">
            <form className="space-y-6" onSubmit={onSubmit}>
                {EditcategoriesListTableHeads.map((item) => (
                    <TextFild
                        className="text-gray-800 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:border-blue-500 transition duration-200"
                        key={item.id}
                        label={item.label}
                        name={item.name}
                        value={categoryData[item.name] ?? ""}
                        onChange={categoryDataOnChange}
                    />
                ))}
                <div>
                    <label htmlFor="type" className="block text-gray-700 font-medium mb-2">
                        نوع
                    </label>
                    <Select
                        instanceId="type"
                        onChange={setSelectedType}
                        defaultValue={selectedType}
                        options={categoryTypes}
                        className="text-sm sm:text-base"
                        styles={{
                            control: (base) => ({
                                ...base,
                                borderColor: 'gray',
                                '&:hover': { borderColor: 'blue' },
                                boxShadow: 'none',
                                borderRadius: '0.375rem',
                            }),
                            option: (provided, state) => ({
                                ...provided,
                                backgroundColor: state.isSelected ? '#3b82f6' : '#ffffff',
                                color: state.isSelected ? '#ffffff' : '#000000',
                                '&:hover': { backgroundColor: '#3b82f6', color: '#ffffff' },
                            }),
                        }}
                    />
                </div>
                <div>
                    {isLoading ? (
                        <Loading />
                    ) : (
                        <button className="btn btn--primary w-full py-3 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-lg shadow-md transition duration-300" type="submit">
                            ارسال
                        </button>
                    )}
                </div>
            </form>
        </div>
    );
}

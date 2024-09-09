"use client"
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import RadioInput from '@/common/radioInput'
import { useCallback, useEffect, useState } from 'react'

const sortOptions = [
    {
        id:1,
        value:"latest",
        label:"جدیدترین"
    },
    {
        id:2,
        value:"earliest",
        label:"قدیمی ترین"
    },
    {
        id:3,
        value:"popular",
        label:"محبوب ترین"
    },
]

export default function ProductSort() {

    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const [sort, setSort] = useState("");

    const createQueryString = useCallback(
        (name, value) => {
            const params = new URLSearchParams(searchParams);
            params.set(name, value);
            return params.toString();
        },
        [searchParams]
    );

    const sortHandler = (e) => {
        const value = e.target.value;
        setSort(value);
        router.push(pathname + "?" + createQueryString("sort", value));
    };

    useEffect(() => {
        setSort(searchParams.get("sort") || "");
    }, [searchParams]);

    return (
        <div className="p-4 bg-white shadow-md rounded-lg mt-6">
            <p className="font-bold mb-4 text-lg text-gray-800">مرتب سازی محصولات بر اساس</p>
            <ul className="space-y-4">
                {sortOptions.map((item) => {
                    return (
                        <li key={item.id} className="flex items-center space-x-2">
                            <RadioInput 
                                id={item.id}
                                label={item.label}
                                name="product-sort"
                                value={item.value}
                                checked={sort === item.value}
                                onChange={sortHandler}
                            />
                        </li>
                    );
                })}
            </ul>
        </div>
    );
}

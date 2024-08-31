import TextFild from '@/common/TextFild'
import RadioInput from '@/common/radioInput';
import Select from 'react-select';
import DatePicker from "react-multi-date-picker"
import persian from "react-date-object/calendars/persian"
import persian_fa from "react-date-object/locales/persian_fa"
import Loading from '@/common/Loading';

export default function CouponForm({
  formData ,
  onSubmit,
  onFormChange,
  setType,
  type,
  options,
  expireDate,
  setExpireDate,
  isLoading,
  selectOnChange,
  defaultValue = "" ,

}) {
  return (
    <div className='max-w-sm'>
          <form className='space-y-4' onSubmit={onSubmit}>
            <TextFild 
              label="نام کد" 
              name="code"
              value={formData.code || ""}
              onChange={onFormChange}
            />
            <TextFild 
              label="مقدار تخفیف" 
              name="amount"
              value={formData.amount || ""}
              onChange={onFormChange}
            />
            <TextFild 
              label="ظرفیت کد" 
              name="usageLimit"
              value={formData.usageLimit || ""} 
              onChange={onFormChange}
            />

            <div>
              <span className="mb-2 block">نوع کد تخفیف</span>
              <div className="flex items-center justify-between">
                <RadioInput
                  checked={type === "percent"}
                  id="percent-type"
                  name="type"
                  label="درصد"
                  value="percent"
                  onChange={(e) => setType(e.target.value)}
                />
                <RadioInput
                  checked={type === "fixedProduct"}
                  id="fixedProduct-type"
                  name="type"
                  label="قیمت ثابت"
                  value="fixedProduct"
                  onChange={(e) => setType(e.target.value)}
                />
              </div>
            </div>
            <div>
                <label htmlFor='products' className='mt-5 mb-4 block'> شامل محصولات </label>
                <Select
                  placeholder={"انتخاب محصول"}
                  instanceId="products"
                  isMulti
                  onChange={selectOnChange} 
                  options={options}
                  getOptionLabel={(option) => option.title }
                  getOptionValue={(option) => option._id }
                  defaultValue={defaultValue}
            />
            </div>
            <div className='w-full'>
              <label className='mb-2 block' htmlFor='exporeDate'>تاریخ انقضا</label>
              <DatePicker 
                inputClass='textField__input w-[330px]'
                value={expireDate}
                onChange={(date) => setExpireDate(date)}
                format="DD/MM/YYYY"
                calendar={persian}
                locale={persian_fa}
            />
            </div>
            <div>
              {
                isLoading ? (
                  <Loading />
                ):(
                  <button className='btn btn--primary w-full'>تایید</button>
                )
              }
            </div>
            
          </form>
        </div>
  )
}

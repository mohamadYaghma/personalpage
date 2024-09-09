import TextFild from '@/common/TextFild';
import RadioInput from '@/common/radioInput';
import Select from 'react-select';
import DatePicker from 'react-multi-date-picker';
import persian from 'react-date-object/calendars/persian';
import persian_fa from 'react-date-object/locales/persian_fa';
import Loading from '@/common/Loading';
import {
  Card,
  List,
  ListItem,
  ListItemPrefix,
  Typography,
} from '@material-tailwind/react';

export default function CouponForm({
  formData,
  onSubmit,
  onFormChange,
  setType,
  type,
  options,
  expireDate,
  setExpireDate,
  isLoading,
  selectOnChange,
  defaultValue = '',
}) {
  return (
    <div className='max-w-md mx-auto bg-white rounded-lg shadow-md'>
      <form className='space-y-4' onSubmit={onSubmit}>
        <TextFild 
          label="نام کد" 
          name="code"
          value={formData.code || ''}
          onChange={onFormChange}
        />
        <TextFild 
          label="مقدار تخفیف" 
          name="amount"
          value={formData.amount || ''}
          onChange={onFormChange}
        />
        <TextFild 
          label="ظرفیت کد" 
          name="usageLimit"
          value={formData.usageLimit || ''}
          onChange={onFormChange}
        />

        {/* Radio Buttons for Discount Type */}
        <div>
          <span className='mb-2 block text-gray-700 font-medium'>نوع کد تخفیف</span>
          <Card className='w-full'>
            <List className='flex-row'>
              <ListItem className='p-0'>
                <label
                  htmlFor='percent-type'
                  className='flex w-full cursor-pointer items-center px-3 py-2'>
                  <ListItemPrefix className='mr-3'>
                    <RadioInput
                      ripple={false}
                      className='hover:before:opacity-0'
                      checked={type === 'percent'}
                      id='percent-type'
                      name='type'
                      value='percent'
                      onChange={(e) => setType(e.target.value)}
                    />
                  </ListItemPrefix>
                  <Typography color='blue-gray' className='font-medium text-blue-gray-400'>
                    درصد
                  </Typography>
                </label>
              </ListItem>
              <ListItem className='p-0'>
                <label
                  htmlFor='fixedProduct-type'
                  className='flex w-full cursor-pointer items-center px-3 py-2'>
                  <ListItemPrefix className='mr-3'>
                    <RadioInput
                      ripple={false}
                      className='hover:before:opacity-0'
                      checked={type === 'fixedProduct'}
                      id='fixedProduct-type'
                      name='type'
                      value='fixedProduct'
                      onChange={(e) => setType(e.target.value)}
                    />
                  </ListItemPrefix>
                  <Typography color='blue-gray' className='font-medium text-blue-gray-400'>
                    قیمت ثابت
                  </Typography>
                </label>
              </ListItem>
            </List>
          </Card>
        </div>

        {/* Select for Products */}
        <div className='mt-6'>
          <label htmlFor='products' className='block text-gray-700 font-medium mb-2'>شامل محصولات</label>
          <Select
            placeholder={'انتخاب محصول'}
            instanceId='products'
            isMulti
            onChange={selectOnChange}
            options={options}
            getOptionLabel={(option) => option.title}
            getOptionValue={(option) => option._id}
            defaultValue={defaultValue}
            className='react-select-container'
            classNamePrefix='react-select'
            styles={{
              control: (base) => ({
                ...base,
                borderRadius: '0.5rem',
                borderColor: '#D1D5DB', // light gray border
                padding: '0.375rem', // padding around the select input
                boxShadow: 'none',
                '&:hover': {
                  borderColor: '#9CA3AF', // darker gray on hover
                },
              }),
              multiValue: (base) => ({
                ...base,
                backgroundColor: '#E5E7EB', // light gray background for selected options
                borderRadius: '0.375rem',
                padding: '0.125rem 0.375rem',
              }),
              multiValueLabel: (base) => ({
                ...base,
                color: '#111827', // darker gray text color
              }),
              multiValueRemove: (base) => ({
                ...base,
                color: '#9CA3AF',
                '&:hover': {
                  backgroundColor: '#D1D5DB',
                  color: '#6B7280',
                },
              }),
            }}
          />
        </div>

        {/* Date Picker for Expiration Date */}
        <div className='w-full'>
          <label className='mb-2 block text-gray-700 font-medium' htmlFor='exporeDate'>تاریخ انقضا</label>
          <DatePicker
            inputClass='textField__input w-full border rounded-lg p-2'
            value={expireDate}
            onChange={(date) => setExpireDate(date)}
            format='DD/MM/YYYY'
            calendar={persian}
            locale={persian_fa}
          />
        </div>

        <div>
          {isLoading ? (
            <Loading />
          ) : (
            <button className='btn btn--primary w-full'>تایید</button>
          )}
        </div>
      </form>
    </div>
  );
}

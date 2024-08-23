export default function CheckBox({name,id,checked,value,onChange,label}) {
  return (
    <div>
        <input 
            type='checkbox'
            name={name}
            id={id}
            checked={checked}
            value={value}
            onChange={onChange}
            className='cursor-pointer form-checkbox rounded-[5px] border-none bg-secondary-100/80 w-4 h-4 checked:text-primary-900'
        />
        <label htmlFor={id} className='cursor-pointer'>{label}</label>
    </div>
  )
}

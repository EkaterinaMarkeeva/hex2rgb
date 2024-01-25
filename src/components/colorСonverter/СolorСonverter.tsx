import { FC, useState } from 'react';
import { hexToRgb } from './hexToRgb'
import '../style/colorConverterStyle.css'

type FormType = {
  name: string,
  label?: string,
  color?: string
};

export const ColorConverter: FC = () => {
  const [form, setForm] = useState<FormType>({
    name: '',
    label: ''
  });

  const handleFormChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    e.preventDefault();

    const { name, value } = e.target;
    
    value.length > 7 || value.length < 7 ? setForm((prev) => ({ ...prev, [name]: value, color: '', label: ''})) 
      : (hexToRgb(value) === 'Ошибка!' ? setForm((prev) => ({ ...prev, [name]: value, color: 'red', label: hexToRgb(value)}))
        : setForm((prev) => ({ ...prev, [name]: value, color: hexToRgb(value), label: hexToRgb(value)})));
  };

  return (
    <form className='form' style={{ backgroundColor: form.color}}>
      <input type='text' name='name' id='color' className='color' value={form.name} onChange={handleFormChange} />
      <label className='color' htmlFor='color'>{form.label}</label>
    </form>
  )
}

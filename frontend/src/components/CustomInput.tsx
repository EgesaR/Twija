import React from 'react';
import { FormControl, FormField, FormLabel, FormMessage } from './ui/form';
import { Input } from './ui/input';
import type { Control, FieldPath } from 'react-hook-form';

interface CustomInputProps {
  control: Control<any>;
  name: FieldPath<any>;
  label: string;
  placeholder: string;
  type?: string; // Optional: let us override type if needed
}

const CustomInput = ({
  control,
  name,
  label,
  placeholder,
}: CustomInputProps) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <div className='form-item'>
          <FormLabel className='form-label'>{label}</FormLabel>
          <div className='flex w-full flex-col'>
            <FormControl>
              <Input
                placeholder={placeholder}
                className='input-class'
                type={name === 'password' ? 'password' : 'text'}
                //id={name}
                {...field}
              />
            </FormControl>
            <FormMessage className='form-message mt-2' />
          </div>
        </div>
      )}
    />
  );
};

export default CustomInput;

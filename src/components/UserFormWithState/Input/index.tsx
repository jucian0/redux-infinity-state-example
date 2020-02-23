import React, { useRef, FunctionComponent, InputHTMLAttributes, useEffect, ChangeEvent, ChangeEventHandler, useState } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
   error?: string
   label: string
}

const Input: FunctionComponent<InputProps> = ({ error, label, ...rest }) => {
   const [touched, setTouched] = useState<boolean>(false)

   return (
      <>
         <label htmlFor={rest.name}>{label}</label>
         <input className="form-control" {...rest} onBlur={() => setTouched(true)} />
         <span className="text-danger">{touched && error}</span>
      </>
   );
}

export default Input


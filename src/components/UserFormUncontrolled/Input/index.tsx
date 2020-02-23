import React, { useRef, FunctionComponent, InputHTMLAttributes, useEffect, ChangeEvent, ChangeEventHandler } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
   error?: string
   debounceChange: (param: string) => void
   label: string
}

const Input: FunctionComponent<InputProps> = ({ error, label, debounceChange, ...rest }) => {
   const inputRef = useRef<HTMLInputElement>(null)

   const setValue = debounce((e: ChangeEvent<HTMLInputElement>) => debounceChange(e.target.value), 500, false)

   useEffect(() => {
      inputRef.current?.addEventListener('input', setValue)
   }, [])

   return (
      <>
         <label htmlFor={rest.name}>{label}</label>
         <input type="text" className="form-control" {...rest} ref={inputRef} />
         <span className="text-danger">{error}</span>
      </>
   );
}

export default Input


function debounce(func: (e: any) => void, wait: number, immediate: boolean) {
   var timeout: any;

   return function executedFunction(this: any) {
      var context = this;
      var args = arguments

      var later = function () {
         timeout = null;
         if (!immediate) func.apply(context, args as any);
      };

      var callNow = immediate && !timeout;

      clearTimeout(timeout);

      timeout = setTimeout(later, wait);

      if (callNow) func.apply(context, args as any);
   };
};


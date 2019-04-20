import React, {useEffect, useState} from "react";
interface InputTextProps {
  value: string;
  onChange: (newV: string) => void;
};

export default function InputText (props: InputTextProps) {
  let [isEditState, changeEditState] = useState<boolean>(false);

  let cacheValue = props.value;
  let inputNewValue = (v:any) => {
    cacheValue = (v.currentTarget.value);
  };
  let onBlur = () => {
    let v = String(cacheValue)[0];
    if (/^[a-zA-Z]$/.test(v)) {
      changeEditState(false);
      props.onChange(v);
    } else {
      props.onChange(props.value)
    }
  };
  return (
    <div className="input-text" onClick={() => { changeEditState(true); }}>
      {isEditState ? <input autoFocus defaultValue={props.value} onBlur={onBlur} onChange={inputNewValue}/>: <span>{props.value}</span>}
    </div>
  );
}

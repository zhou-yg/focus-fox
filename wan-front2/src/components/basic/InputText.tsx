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
    changeEditState(false);
    props.onChange(cacheValue);
  };
  return (
    <div className="input-text" onClick={() => { changeEditState(true); }}>
      {isEditState ? <input autoFocus onBlur={onBlur} onChange={inputNewValue}/>: <span>{props.value}</span>}
    </div>
  );
}

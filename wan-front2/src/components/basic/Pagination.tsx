import React from "react";

interface PaginationProp {
  all?: number;
  current: number;
  onPrev ?: () => void;
  onNext ?: () => void;
  onChange: (target: number) => void;
}

function Pagination(props:PaginationProp ) {

  let prev = () => {
    if (props.current > 1) {
      props.onChange(props.current - 1);
    }
  };

  let next = () => {
    props.onChange(props.current + 1);
  }
  let jumpto = () => {
    let input:HTMLInputElement|null = document.querySelector('#paginationInput');
    if (input) {
      let v = parseInt(input.value);
      if (!isNaN(v)) {
        props.onChange(v);
      }
    }
  }
  let onEnter = (e:React.KeyboardEvent) => {
    if (e.keyCode === 13) {
      jumpto();
    }
  }

  return <div className="pagination-top">
    <div className="pagination">
      {props.all ? (
        <span>
        总数: {props.all}
        </span>        
      ) : ''}
      <span className="goto">
        <input onKeyDown={onEnter} id="paginationInput"/>
        <span className="go-btn" onClick={jumpto}> go> </span>
      </span>
      <span className={`prev ${props.current > 1 ? '' : 'disabled'}`} onClick={prev}>上一页</span>
      <span className="current">
        {props.current}
      </span>
      <span className="next" onClick={next}>下一页</span>
    </div>
  </div>
}

export default Pagination;

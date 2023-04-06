import React, { useState } from "react";
import { useDispatch } from 'react-redux';
import { FILTER_BY } from '../constants';
import { filterByStatus} from "../slices/todo";

const TodoFilter = () => {
  const [active, setActive] = useState('All');
  // const handleClick = (e) => {
  //   setActive(!active);
  // };
  
  const dispatch = useDispatch();
  return (
    <div className="col-md-12 filter">
      <span className="show">Show:</span>

      {Object.keys(FILTER_BY).map(filterkey => {
        const currentFilter = FILTER_BY[filterkey];
        
        return (
          <span key={`visibility-filter-${currentFilter}`}
            onClick={() => {dispatch(filterByStatus(currentFilter)); setActive(currentFilter);} }
            className={ (active === currentFilter) ? 'active' : 'status' }
          >
            {currentFilter}
          </span>
        )
      })}
    </div>
  );
};

export default TodoFilter;
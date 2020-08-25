import React, { useEffect, useState, useRef } from "react";

import DatePicker from "react-datepicker";

const FilterDateSelector = props => {
  const {
    onChange,
    selected,
    dateId,
    formId = "Daterange",
    name,
    hint,
    error,
    label,
    onClickOutside = () => {},
    datePickerIsOpen,
    minDate,
    maxDate,
    open = () => {},
    btnOnClick,
    ...otherProps
  } = props;

  const datePickerIsClosed = true;
  const calendarRef = React.createRef();
  const [state, setState] = useState({
    datePickerIsOpen,
    datePickerIsClosed
  });

  const openDatePicker = () => {
    setState({
      datePickerIsOpen: !state.datePickerIsOpen
    });
    open(!state.datePickerIsOpen);
  };

  const handleClose = () => {
    setState({
      datePickerIsClosed: !state.datePickerIsClosed
    });
    onClickOutside(!state.datePickerIsClosed);
  };

  const onKeyDown = e => {
    if (e.keyCode == 9) {
      calendarRef.current.state.open = false;
    }
  };

  return (
    <div className="dg_date-container">
      <div className="dg_form-field">
        <label htmlFor="full-name" className="dg_label">
          <span className="dg_label-text">{label}</span>
        </label>

        <DatePicker
          selected={selected}
          onChange={onChange}
          name={name}
          id={dateId}
          minDate={minDate}
          maxDate={maxDate}
          onClickOutside={handleClose}
          open={state.datePickerIsOpen}
          onKeyDown={onKeyDown}
          onSelect={handleClose}
          ref={calendarRef}
          {...otherProps}
        />
      </div>
      <button className="dg_date-btn" type="submit" onClick={openDatePicker}>
        <i className="fa fa-calendar" aria-hidden="true"></i>
      </button>
    </div>
  );
};

export default FilterDateSelector;

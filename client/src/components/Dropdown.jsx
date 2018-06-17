import React from 'react';
import PropTypes from 'prop-types';

const Dropdown = props => (
  <select onChange={props.handleChange}>
    {props.options.map(({ text, value }) => <option key={value} value={value}>{text}</option>)}
  </select>
);

Dropdown.propTypes = {
  handleChange: PropTypes.func.isRequired,
  options: PropTypes.arrayOf(PropTypes.shape({
    text: PropTypes.string,
    value: PropTypes.any,
  })).isRequired,
};

export default Dropdown;

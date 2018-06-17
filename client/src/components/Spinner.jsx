import React, { Component } from 'react';
import PropTypes from 'prop-types';

const Spinner = (props) => {
  return (
    props.loading ?
    <div className="spinner">
      <img src="images/spiffygif_46x46.gif"></img>
    </div>
    :
    <div></div>
  );
}

Spinner.propTypes = {
  loading: PropTypes.bool.isRequired,
};

export default Spinner;

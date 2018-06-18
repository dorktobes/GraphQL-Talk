import React from 'react';
import PropTypes from 'prop-types';

const Spinner = props => (
  props.loading ?
    <div className="spinner">
      <img src="images/spiffygif_46x46.gif" alt="loading" />
    </div>
    :
    <div />
);

Spinner.propTypes = {
  loading: PropTypes.bool.isRequired,
};

export default Spinner;

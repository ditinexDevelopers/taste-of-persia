import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { ToggleButton } from 'components';

const Section = ({ switchState, menuId, onClickHandler }) => {
  const [toggle, setToggle] = useState(switchState);

  const onToggle = async (value) => {
    const response = await onClickHandler(menuId, !value);
    if (response) setToggle(!value);
  };

  return (
    <h1>toggle button</h1>
    // <ToggleButton
    //   inactiveLabel={'Disabled'}
    //   activeLabel={'Enabled'}
    //   colors={{
    //     active: {
    //       base: '#1CB0BC',
    //       hover: '#178188'
    //     },
    //     inactive: {
    //       base: 'rgb(65,66,68)',
    //       hover: 'rgb(95,96,98)'
    //     }
    //   }}
    //   value={toggle}
    //   onToggle={onToggle}
    // />
  );
};

Section.propTypes = {
  switchState: PropTypes.bool
};

export default Section;

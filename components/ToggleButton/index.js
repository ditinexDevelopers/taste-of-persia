import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  reactToggle,
  reactToggleScreenReaderOnly,
  reactToggleTrack,
  reactToggleOn,
  reactToggleOff,
  reactToggleThumb,
  reactThumbCenteringContainer
} from './styles';

import { rgbToHex, hexToRGB, interpolateColor, mapValueInRange } from './colors';

const defaultColors = {
  active: {
    base: `rgb(1,124,66)`,
    hover: `rgb(1,124,66)`
  },
  inactive: {
    base: `rgb(65,66,68)`,
    hover: `rgb(65,66,68)`
  },
  activeThumb: {
    base: `rgb(250,250,250)`,
    hover: `rgb(250,250,250)`
  },
  inactiveThumb: {
    base: `rgb(250,250,250)`,
    hover: `rgb(250,250,250)`
  }
};

const emptyStyle = {};

export default class ToggleButton extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isHover: false
    };
  }

  static defaultProps = {
    value: false,
    onToggle: () => {},
    colors: defaultColors,
    passThroughInputProps: {},
    activeLabel: 'ON',
    containerStyle: emptyStyle,
    activeLabelStyle: emptyStyle,
    activeLabelStyleHover: emptyStyle,
    inactiveLabel: 'OFF',
    inactiveLabelStyle: emptyStyle,
    inactiveLabelStyleHover: emptyStyle,
    thumbStyle: emptyStyle,
    thumbStyleHover: emptyStyle,
    animateThumbStyleHover: () => {
      return {};
    },
    animateThumbStyleToggle: () => {
      return {};
    },
    trackStyle: emptyStyle,
    trackStyleHover: emptyStyle,
    animateTrackStyleHover: () => {
      return {};
    },
    animateTrackStyleToggle: () => {
      return {};
    },
    thumbAnimateRange: [1, 80],
    internalSpringSetting: {
      stiffness: 180,
      damping: 22
    },
    internalHoverSpringSetting: {
      stiffness: 180,
      damping: 20
    }
  };

  static displayName = 'Toggle';

  onMouseOver() {
    this.setState({ isHover: true });
  }

  onMouseOut() {
    this.setState({ isHover: false });
  }

  _convertToRgb(color, defaultColor) {
    if (color.indexOf('#') != -1) {
      const rgbObj = hexToRGB(color);
      return `rgb(${rgbObj.r}, ${rgbObj.g}, ${rgbObj.b})`;
    } else if (color.indexOf('rgb') == -1) {
      return defaultColor; //something weird, so it's going to be defaulted
    } else {
      return color;
    }
  }

  /**
   * Goes through all colors in obj and converts them to proper format or default
   * @param  {[type]} colors [description]
   * @return {[type]}        [description]
   */
  checkAllColors(colors) {
    Object.keys(colors).forEach((key) => {
      this.checkColors(colors, key);
    });
    return colors;
  }

  /**
   * Make sure a color is an rgb or rgba value
   * @param  {[type]} colors [description]
   * @param  {[type]} key    [description]
   * @return {[type]}        [description]
   */
  checkColors(colors, key) {
    if (!colors[key]) {
      colors[key] = defaultColors[key];
    } else if (!colors[key].hover) {
      if (!colors[key].base) {
        console.warn('Color prop should have a "base" style and a "hover" style!');
        colors[key] = defaultColors[key];
      } else {
        colors[key].base = this._convertToRgb(colors[key].base, defaultColors[key].base);
        colors[key].hover = colors[key].base;
      }
    } else {
      colors[key].base = this._convertToRgb(colors[key].base, defaultColors[key].base);
      colors[key].hover = this._convertToRgb(colors[key].hover, defaultColors[key].hover);
    }
  }

  interpolateColorWithHover(colorNumber, activeKey, inactiveKey) {
    const colors = this.props.colors;
    this.checkColors(colors, activeKey);
    this.checkColors(colors, inactiveKey);
    if (this.state.isHover) {
      return {
        backgroundColor: interpolateColor(
          colorNumber,
          colors[activeKey].hover,
          colors[inactiveKey].hover,
          0,
          400
        )
      };
    } else {
      return {
        backgroundColor: interpolateColor(
          colorNumber,
          colors[activeKey].base,
          colors[inactiveKey].base,
          0,
          400
        )
      };
    }
  }

  makeStyle(style, focusStyle) {
    if (this.state.isHover) {
      return {
        ...style,
        ...focusStyle
      };
    } else {
      return style;
    }
  }

  handleClick(evt) {
    if (evt.target !== this._input) {
      evt.preventDefault();
      this._input.focus();
      this._input.click();
    }
  }

  render() {
    const {
      internalSpringSetting,
      internalHoverSpringSetting,
      value,
      thumbAnimateRange,
      isHover,
      containerStyle,
      trackStyle,
      animateTrackStyleToggle,
      animateTrackStyleHover,
      thumbStyleHover,
      trackStyleHover,
      activeLabelStyle,
      activeLabelStyleHover,
      activeLabel,
      inactiveLabelStyle,
      inactiveLabelStyleHover,
      inactiveLabel,
      thumbStyle,
      animateThumbStyleHover,
      animateThumbStyleToggle,
      thumbIcon,
      onClick,
      onToggle,
      passThroughInputProps
    } = this.props;

    const SpringConfig = internalSpringSetting;
    const HoverSpringConfig = internalHoverSpringSetting;
    return <></>;
  }
}

ToggleButton.propTypes = {
  value: PropTypes.bool.isRequired,
  onToggle: PropTypes.func.isRequired,
  passThroughInputProps: PropTypes.object,
  onClick: PropTypes.func,
  colors: PropTypes.object,
  activeLabel: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  containerStyle: PropTypes.object,
  activeLabelStyle: PropTypes.object,
  activeLabelStyleHover: PropTypes.object,
  activeThumbStyle: PropTypes.object,
  activeThumbStyleHover: PropTypes.object,
  inactiveLabel: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  inactiveLabelStyle: PropTypes.object,
  inactiveLabelStyleHover: PropTypes.object,
  thumbStyle: PropTypes.object,
  thumbStyleHover: PropTypes.object,
  trackStyle: PropTypes.object,
  trackStyleHover: PropTypes.object,
  animateThumbStyleHover: PropTypes.func,
  animateTrackStyleHover: PropTypes.func,
  animateTrackStyleToggle: PropTypes.func,
  animateThumbStyleToggle: PropTypes.func,
  internalSpringSetting: PropTypes.object,
  internalHoverSpringSetting: PropTypes.object,
  thumbIcon: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  thumbAnimateRange: PropTypes.array
};

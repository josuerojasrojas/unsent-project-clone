import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import styles from "./styles.module.css";

import TextColorPicker from "components/TextColorPicker";
import DefaultColorPicker from "components/DefaultColorPicker";
import ColorTextArea from "components/ColorTextArea";

const UnsentBox = ({
  initBackgroundColor,
  initMessage,
  initTextColor,
  initTo,
  isDisabled,
  sendCallBack,
  textOnchange,
  toOnChange
}) => {
  const [backgroundColor, backgroundColorChange] = useState(
    initBackgroundColor
  );
  const [textColor, textColorChange] = useState(initTextColor);
  const [toValue, toValueChange] = useState(initTo);
  const [text, textChange] = useState(initMessage);

  const sendData = () => {
    !isDisabled &&
      sendCallBack &&
      sendCallBack({
        backgroundColor: backgroundColor,
        textColor: textColor,
        text: text,
        to: toValue
      });
  };

  useEffect(() => {
    if (!!initMessage && initMessage !== text) textChange(initMessage);
  }, [initMessage, text]);

  // if initto is define and it is not handle up the chain then it will become readonly
  useEffect(() => {
    if (!!initTo && initTo !== toValue) toValueChange(initTo);
  }, [initTo, toValue]);

  // handle value changes for text as a parent woulld normally do
  // but since not all parents care for their child,
  // it only alerts it for those that care (fake 2 way binding cause you also need to keep track of the change in the parent else is readonly)
  const _textOnchange = nextValue => {
    textChange(nextValue);
    textOnchange && textOnchange(nextValue);
  };

  const _toOnChange = nextValue => {
    toValueChange(nextValue);
    toOnChange && toOnChange(nextValue);
  };

  return (
    <div className={styles.unsentBox}>
      <div className={styles.top}>
        <TextColorPicker
          colorOnChange={c => textColorChange(c)}
          initColor={initTextColor}
          readOnly={isDisabled}
        />
        <span className={styles.textWrapper}>
          <label htmlFor="sender">To</label>
          <input
            className={styles.toInput}
            id="sender"
            onChange={_ => _toOnChange(_.target.value)}
            type="text"
            readOnly={isDisabled}
            value={toValue}
          />
        </span>
        <DefaultColorPicker
          colorOnChange={c => backgroundColorChange(c)}
          initColor={initBackgroundColor}
          readOnly={isDisabled}
        />
      </div>
      <div className={styles.middle}>
        <ColorTextArea
          backgroundColor={backgroundColor}
          onChange={_textOnchange}
          textColor={textColor}
          readOnly={isDisabled}
          value={text}
        />
      </div>
      <div className={styles.bottom}>
        <span className={styles.clickable} onClick={sendData}>
          Send
        </span>
        <a href="https://theunsentproject.com/abouttheunsentproject/">
          #unsentproject
        </a>
        {
          //"TODO: still not sure what to do with back"
        }
        <span className={styles.clickable}>Back</span>
      </div>
    </div>
  );
};

UnsentBox.defaultProps = {
  initMessage: "",
  initTo: ""
};

UnsentBox.propTypes = {
  initBackgroundColor: PropTypes.string,
  initMessage: PropTypes.string,
  initTextColor: PropTypes.string,
  initTo: PropTypes.string,
  isDisabled: PropTypes.bool,
  sendCallBack: PropTypes.func,
  textOnchange: PropTypes.func,
  toOnchange: PropTypes.func
};

export default UnsentBox;

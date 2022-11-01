import React, { useState } from "react";
import { Statistic } from "antd";
import { CountDownWrapper } from "./styled";

const convertMs = (milliseconds) => {
  let seconds = Math.floor(milliseconds / 1000);
  let minutes = Math.floor(seconds / 60);
  let hours = Math.floor(minutes / 60);
  let days = Math.floor(hours / 24);

  seconds = seconds % 60;
  minutes = minutes % 60;
  hours = hours % 24;
  return [days, hours, minutes, seconds];
};

const CountDown = ({ value, render, isUseCustom }) => {
  const [time, _setTime] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const setTime = (data = {}) => {
    _setTime((prev) => ({
      ...prev,
      ...data,
    }));
  };
  const { days, hours, minutes, seconds } = time;
  return (
    <CountDownWrapper className="custom-countdown">
      <Statistic.Countdown
        value={value}
        onChange={(value) => {
          setTime({ ...convertMs(value) });
        }}
      />
      {isUseCustom && render({ days, hours, minutes, seconds })}
    </CountDownWrapper>
  );
};

export default CountDown;

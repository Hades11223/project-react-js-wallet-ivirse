import { useCountdown } from "@hook/useCountDown";
import { CountDownWrapper } from "./styled";

const CountDownTimer = ({ targetTime = "", size = "30px" }) => {
  const [days, hours, minutes, seconds] = useCountdown(targetTime);
  return (
    <CountDownWrapper size={size}>
      {`${days.onlySecondDigist()} ${hours.onlySecondDigist()} ${minutes.onlySecondDigist()} ${seconds.onlySecondDigist()}`}
    </CountDownWrapper>
  );
};

export default CountDownTimer;

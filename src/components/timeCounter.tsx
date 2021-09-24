import { useState, useEffect } from "react";
import moment from "moment";

var countDownTimer;

const TimeCounter = (props) => {

  const [duration, setDuration] = useState(moment.duration(0));

  useEffect(() => {
    if (props.timeTillDate !== null) {
      var eventTime;
      if (typeof props.timeTillDate === "number") {
        eventTime = props.timeTillDate;
      }
      else {
        eventTime = moment(
          props.timeTillDate,
          props.timeFormat
        ).unix();
      }
      var currentTime = moment().unix();
      var diffTime = eventTime - currentTime;
      var dur = moment.duration(diffTime * 1000, "milliseconds");
      if (dur.asMilliseconds() > 0) {
        countDownTimer = setInterval(() => {
          if (dur.asMilliseconds() <= 0) {
            clearInterval(countDownTimer);
            return;
          }
          dur = moment.duration(dur.asMilliseconds() - 1000, "milliseconds");
          setDuration(dur);
        }, 1000);
      }
      return () => {clearInterval(countDownTimer)};
    }
    else {
      clearInterval(countDownTimer);
      setDuration(moment.duration(0, "milliseconds"));
    }
    return () => {};
  }, [props.timeTillDate, props.timeFormat]);

  const toTwoDigit = (val) => {
    if (String(val).length === 1)
      return "0" + val;
    return val;
  }
  
  return (
    <div className="d-flex justify-content-center text-white">
      <div className="text-center px-1 px-md-2">
        <h1 className="count_text count_bg mb-3 mt-1 px-md-4 px-2">
          {toTwoDigit(Math.floor(duration?.asDays()) ?? "0")}
        </h1>
        <span>DAYS</span>
      </div>
      <div className="text-center px-1 px-md-2">
        <h1 className="count_text count_bg mt-1 mb-3 px-md-4 px-2">
          {toTwoDigit(Math.floor(duration?.hours()) ?? "0")}
        </h1>
        <span>HOURS</span>
      </div>
      <div className="text-center px-1 px-md-2">
        <h1 className="count_text count_bg mt-1 mb-3 px-md-4 px-2">
          {toTwoDigit(Math.floor(duration?.minutes()) ?? "0")}
        </h1>
        <span>MINUTES</span>
      </div>
      <div className="text-center px-1 px-md-2">
        <h1 className="count_text count_bg mt-1 mb-3 px-md-4 px-2">
          {toTwoDigit(Math.floor(duration?.seconds()) ?? "0")}
        </h1>
        <span>SECONDS</span>
      </div>
    </div>
  );
}

export default TimeCounter;

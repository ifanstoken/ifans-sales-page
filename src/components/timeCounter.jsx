import React, { Component } from "react";
import moment from "moment";

class TimeCounter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
      interval: 0,
      duration: null,
    };
  }

  componentDidMount() {
    var eventTime = moment(
      this.props.timeTillDate,
      this.props.timeFormat
    ).unix();
    var currentTime = moment().unix();
    var diffTime = eventTime - currentTime;
    var duration = moment.duration(diffTime * 1000, "milliseconds");

    if (duration > 0) {
      this.countDownTimer = setInterval(() => {
        duration = moment.duration(duration - 1000, "milliseconds");
        this.setState({
          duration,
        });
      }, 1000);
    }
  }

  digitSattle(num) {
    return num.toString().length > 1 ? num : "0" + num;
  }

  componentWillUnmount() {
    clearInterval(this.countDownTimer);
  }

  render() {
    return (
      <div className="d-flex justify-content-center text-white">
        <div className="text-center px-1 px-md-2">
          <h1 className="count_text count_bg mb-3 mt-1 px-md-4 px-2">
            {parseInt(this.state.duration?.asDays() ?? "00")}
          </h1>
          <span>DAYS</span>
        </div>
        <div className="text-center px-1 px-md-2">
          <h1 className="count_text count_bg mt-1 mb-3 px-md-4 px-2">
            {this.state.duration?.hours()
              ? this.digitSattle(this.state.duration?.hours())
              : "00"}
          </h1>
          <span>HOURS</span>
        </div>
        <div className="text-center px-1 px-md-2">
          <h1 className="count_text count_bg mt-1 mb-3 px-md-4 px-2">
            {this.state.duration?.minutes()
              ? this.digitSattle(this.state.duration?.minutes())
              : "00"}
          </h1>
          <span>MINUTES</span>
        </div>
        <div className="text-center px-1 px-md-2">
          <h1 className="count_text count_bg mt-1 mb-3 px-md-4 px-2">
            {this.state.duration?.seconds()
              ? this.digitSattle(this.state.duration?.seconds())
              : "00"}
          </h1>
          <span>SECONDS</span>
        </div>
      </div>
    );
  }
}

export default TimeCounter;

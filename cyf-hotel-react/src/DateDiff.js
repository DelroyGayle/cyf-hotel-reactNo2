import React from "react";
// import { useState } from "react";
import moment from "moment";

const DateDiff = (props) => {
  const earlierDate = props.twoDates.a.split("-").map((element) => +element);
  const laterDate = props.twoDates.b.split("-").map((element) => +element);
  // console.log(props.twoDates.a, props.twoDates.b); // EG 2017-11-21 2017-11-23
  let earlierMoment = moment(props.twoDates.a);
  let laterMoment = moment(props.twoDates.b);
  // console.log(laterMoment.diff(earlierMoment,'days')); // EG 2
  let theDiff = laterMoment.diff(earlierMoment, "days");
  return theDiff;
};

export default DateDiff;
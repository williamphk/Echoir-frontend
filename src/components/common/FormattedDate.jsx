import React from "react";
import {
  differenceInSeconds,
  differenceInMinutes,
  differenceInHours,
  differenceInDays,
  differenceInWeeks,
  differenceInYears,
} from "date-fns";

const FormattedDate = ({ date, className }) => {
  const now = new Date();

  const diffInSeconds = differenceInSeconds(now, date);
  if (diffInSeconds < 60) {
    return <div className={className}>{diffInSeconds}s</div>;
  }

  const diffInMinutes = differenceInMinutes(now, date);
  if (diffInMinutes < 60) {
    return <div className={className}>{diffInMinutes}m</div>;
  }

  const diffInHours = differenceInHours(now, date);
  if (diffInHours < 24) {
    return <div className={className}>{diffInHours}h</div>;
  }

  const diffInDays = differenceInDays(now, date);
  if (diffInDays < 7) {
    return <div className={className}>{diffInDays}d</div>;
  }

  const diffInWeeks = differenceInWeeks(now, date);
  if (diffInWeeks < 52) {
    return <div className={className}>{diffInWeeks}w</div>;
  }

  const diffInYears = differenceInYears(now, date);
  return <div className={className}>{diffInYears}y</div>;
};

export default FormattedDate;

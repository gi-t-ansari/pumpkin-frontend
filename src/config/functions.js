import moment from "moment";

export const formatTimestamp = (timestamp) => {
  const inputDate = moment(timestamp);
  const now = moment();

  let dateFull, dateShort;

  if (inputDate.isSame(now, "day")) {
    dateFull = "Today";
    dateShort = inputDate.format("hh:mm A");
  } else if (inputDate.isSame(now.clone().subtract(1, "day"), "day")) {
    dateFull = "Yesterday";
    dateShort = inputDate.format("hh:mm A");
  } else if (inputDate.isAfter(now.clone().subtract(7, "days"), "day")) {
    dateFull = inputDate.format("dddd");
    dateShort = inputDate.format("hh:mm A");
  } else {
    dateFull = inputDate.format("DD/MM/YYYY");
    dateShort = inputDate.format("hh:mm A");
  }

  return { dateFull, dateShort };
};

// Example execution:
console.log(formatTimestamp("2025-02-25T20:30:00Z")); // Modify the timestamp as needed

export const extractFirstLetterOfNameAndSurname = (name) => {
  const parts = name?.trim().split(" ");

  if (parts.length > 1) {
    return parts[0][0].toUpperCase() + parts[1][0].toUpperCase();
  } else {
    return parts[0].slice(0, 2).toUpperCase();
  }
};

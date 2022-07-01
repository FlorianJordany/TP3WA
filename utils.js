var dayjs = require("dayjs");

const transformDate = function (data) {
  console.log(data);
  for (i = 0; i < data.length; i++) {
    data[i].birth = dayjs(data[i].birth)
      .locale("fr")
      .format("dddd D MMMM YYYY");
  }
};

module.exports = {
  transformDate,
};

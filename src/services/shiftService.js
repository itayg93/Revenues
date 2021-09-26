import shiftApi from '../api/shiftApi';
import handlers from '../utils/handlers';
import constants from '../utils/constants';
import timeFormatter from '../utils/timeFormatter';

// handle submit shift
const handleSubmitShift = async (userId, commissionRate, values) => {
  try {
    const shift = handleCreateShiftObjectToSubmit(commissionRate, values);
    await shiftApi.submitShift(userId, shift);
    // success
    return handlers.handleSuccess();
  } catch (err) {
    return handlers.handleError(err.message);
  }
};

// handle create shift object to submit
const handleCreateShiftObjectToSubmit = (commissionRate, values) => {
  commissionRate /= 100;
  Object.entries(values).forEach(([key, value]) => {
    value ? (values[key] = parseFloat(value)) : (values[key] = 0);
  });
  const date = new Date();
  // time
  time = {
    timestamp: date.getTime(),
    year: date.getFullYear(),
    month: date.getMonth() + 1,
    workTimeInSeconds: values.timeInSeconds,
  };
  // deliveries
  deliveries = values.deliveries;
  // wolt
  wolt = {
    value: values.wolt,
    commission: values.wolt * commissionRate,
  };
  // tips
  tips = {
    credit: {
      value: values.creditTips,
      vat: values.creditTips > 0 ? values.creditTips * constants.VAT : 0,
      commission:
        values.creditTips > 0
          ? (values.creditTips - values.creditTips * constants.VAT) *
            commissionRate
          : 0,
    },
    cash: values.cashTips,
  };
  // hourly wage
  hourlyWage =
    (wolt.value -
      wolt.commission +
      (tips.credit.value - tips.credit.vat - tips.credit.commission) +
      tips.cash) /
    timeFormatter(time.workTimeInSeconds, true);
  return {time, deliveries, wolt, tips, hourlyWage};
};

export default {
  handleSubmitShift,
};

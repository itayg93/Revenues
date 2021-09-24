import shiftApi from '../api/shiftApi';
import handlers from '../utils/handlers';
import constants from '../utils/constants';
import timeFormatter from '../utils/timeFormatter';

// handle submit shift
const handleSubmitShift = async (userId, commissionRate, values) => {
  const shift = {...values};
  // date
  const date = new Date();
  shift['timestamp'] = date.getTime();
  shift['year'] = date.getFullYear();
  shift['month'] = date.getMonth() + 1;
  // commission
  shift['commissionRate'] = commissionRate / 100;
  // deliveries
  shift.deliveries = parseInt(shift.deliveries);
  // wolt
  shift.wolt = parseFloat(shift.wolt);
  shift['woltAfterCommission'] = shift.wolt - shift.wolt * shift.commissionRate;
  shift['woltDelta'] = shift.wolt - shift.woltAfterCommission;
  // credit
  if (shift.creditTips !== '') shift.creditTips = parseFloat(shift.creditTips);
  else shift.creditTips = 0;
  if (shift.creditTips > 0) {
    shift['creditTipsAfterVAT'] =
      shift.creditTips - shift.creditTips * constants.VAT;
    shift['creditTipsAfterVatAndCommission'] =
      shift.creditTipsAfterVAT -
      shift.creditTipsAfterVAT * shift.commissionRate;
  }
  // cash
  if (shift.cashTips !== '') shift.cashTips = parseInt(shift.cashTips);
  else shift.cashTips = 0;
  // total
  shift['total'] = shift.wolt + shift.creditTips + shift.cashTips;
  // total after commission and vat for credit tips
  shift['totalAfterCommission'] =
    shift.woltAfterCommission +
    shift.creditTipsAfterVatAndCommission +
    shift.cashTips;
  // hourly wage
  shift['hourlyWage'] =
    shift.totalAfterCommission / timeFormatter(shift.timeInSeconds, true);
  try {
    await shiftApi.submitShift(userId, shift);
    // success
    return handlers.handleSuccess();
  } catch (err) {
    return handlers.handleError(err.message);
  }
};

export default {
  handleSubmitShift,
};

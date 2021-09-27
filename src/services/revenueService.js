import shiftService from '../services/shiftService';
import expenseService from './expenseService';
import constants from '../utils/constants';
import handlers from '../utils/handlers';
import timeFormatter from '../utils/timeFormatter';

const shiftsData = {...constants.shiftsData};
const expensesData = {...constants.expensesData};
const taxesData = {...constants.taxesData};
const netData = {...constants.netData};

// handle calculate revenues for month
const handleCalculateRevenuesForMonth = async (userId, userProfile, month) => {
  // shifts
  const shiftsRes = await getShifts(userId, month);
  // error
  if (!shiftsRes.isSuccess) return handlers.handleError(shiftsRes.error);
  sumShiftsEarnings(shiftsRes.data);

  // expenses
  const expensesRes = await getExpenses(userId, month);
  // error
  if (!expensesRes.isSuccess)
    if (expensesRes.error !== 'None expenses found')
      return handlers.handleError(expensesRes.error);
  if (expensesRes.data) sumExpensesCosts(expensesRes.data);

  // user
  taxesData.taxPointsValue =
    constants.TAX_POINT_VALUE_2021 * userProfile.taxPoints;
  expensesData.insurancesPerMonth =
    (userProfile.compulsory + userProfile.collateral) / 12;

  // taxes
  const earningsForTax = sumEarningsForTax(userProfile.taxRefunds);
  // national insurance
  taxesData.nationalInsurance = calculateNationalInsuranceFine(earningsForTax);
  // income tax
  taxesData.incomeTax = calculateIncomeTaxFine(earningsForTax);
  taxesData.totals.value = taxesData.nationalInsurance + taxesData.incomeTax;

  // net
  calculateNet();

  return handlers.handleSuccess({
    shifts: shiftsData,
    expenses: expensesData,
    taxes: taxesData,
    net: netData,
  });
};

// handle get shifts by month for calculations
const getShifts = async (userId, month) => {
  const response = await shiftService.handleGetShiftsByMonth(userId, month);
  // error
  if (!response.isSuccess) return handlers.handleError(response.error);
  // success
  return handlers.handleSuccess(response.data);
};

// handle get expenses by month for calculations
const getExpenses = async (userId, month) => {
  const response = await expenseService.handleGetExpensesByMonth(userId, month);
  // error
  if (!response.isSuccess) return handlers.handleError(response.error);
  // success
  return handlers.handleSuccess(response.data);
};

// handle sum shifts earnings
const sumShiftsEarnings = shifts => {
  resetShiftsData();
  shiftsData.amountOfShifts = shifts.length;
  shifts.forEach(s => {
    shiftsData.workTimeInSeconds += s.time.workTimeInSeconds;
    shiftsData.wolt.value += s.wolt.value;
    shiftsData.wolt.commission += s.wolt.commission;
    shiftsData.tips.credit.value += s.tips.credit.value;
    shiftsData.tips.credit.vat += s.tips.credit.vat;
    shiftsData.tips.credit.commission += s.tips.credit.commission;
    shiftsData.tips.cash += s.tips.cash;
  });
  // wolt ex commission
  shiftsData.wolt.valueExCommission =
    shiftsData.wolt.value - shiftsData.wolt.commission;
  // credit ex vat & commission
  shiftsData.tips.credit.valueExVatCommission =
    shiftsData.tips.credit.value -
    shiftsData.tips.credit.vat -
    shiftsData.tips.credit.commission;
  // total wolt & credit ex vat & commission & cash
  shiftsData.totals.valueExVatCommissionCash =
    shiftsData.wolt.valueExCommission +
    shiftsData.tips.credit.valueExVatCommission;
};

// handle sum expenses costs
const sumExpensesCosts = expenses => {
  resetExpensesData();
  expenses.forEach(e => {
    switch (e.type) {
      case 'fuel':
        expensesData.fuel += e.cost;
        break;
      case 'maintenance':
        expensesData.maintenance += e.cost;
        break;
      case 'equipment':
        expensesData.equipment += e.cost;
        break;
      default:
        break;
    }
  });
  expensesData.totals.valueExInsurances =
    expensesData.fuel + expensesData.maintenance + expensesData.equipment;
};

// handle sum earnings for tax
const sumEarningsForTax = taxRefunds => {
  if (!taxRefunds) return shiftsData.totals.valueExVatCommissionCash;
  return (
    shiftsData.totals.valueExVatCommissionCash -
    expensesData.totals.valueExInsurances
  );
};

// handle calculate national insurance fine
const calculateNationalInsuranceFine = earnings => {
  if (earnings <= 6331) return earnings * 0.0705;
  else return 6331 * 0.0705 + (earnings - 6331) * 0.196;
};

// handle calculate income tax fine
const calculateIncomeTaxFine = earnings => {
  let iT = 0;
  let iTa = 0;
  let iTb = 0;
  let iTc = 0;
  let iTd = 0;
  if (earnings <= 6290) {
    iT = earnings * 0.1;
  } else {
    if (earnings > 6290) {
      iTa = 6290 * 0.1;
      let remainEarnings = earnings - 6290;
      if (remainEarnings > 2740) {
        iTb = 2740 * 0.14;
        remainEarnings -= 2740;
        if (remainEarnings > 5460) {
          iTc = 5460 * 0.2;
          remainEarnings -= 5460;
          if (remainEarnings > 5650) {
            iTd = 5650 * 0.31;
            remainEarnings -= 5650;
          } else {
            iTd = remainEarnings * 0.31;
          }
        } else if (remainEarnings < 5460) {
          iTc = remainEarnings * 0.2;
        }
      } else if (remainEarnings < 2740) {
        iTb = remainEarnings * 0.14;
      }
      iT = iTa + iTb + iTc + iTd;
    }
  }
  if (iT - taxesData.taxPointsValue > 0) return iT - taxesData.taxPointsValue;
  else return 0;
};

// handle calculate net
const calculateNet = () => {
  netData.earnings =
    shiftsData.totals.valueExVatCommissionCash +
    shiftsData.tips.cash -
    taxesData.totals.value -
    expensesData.insurancesPerMonth -
    expensesData.totals.valueExInsurances;
  netData.hourlyWage =
    netData.earnings / timeFormatter(shiftsData.workTimeInSeconds, true);
};

// handle reset shifts data
const resetShiftsData = () => {
  shiftsData.workTimeInSeconds = 0;
  shiftsData.wolt.value = 0;
  shiftsData.wolt.commission = 0;
  shiftsData.tips.credit.value = 0;
  shiftsData.tips.credit.vat = 0;
  shiftsData.tips.credit.commission = 0;
  shiftsData.tips.cash = 0;
};

// handle reset expenses data
const resetExpensesData = () => {
  expensesData.fuel = 0;
  expensesData.maintenance = 0;
  expensesData.equipment = 0;
};

export default {
  handleCalculateRevenuesForMonth,
};

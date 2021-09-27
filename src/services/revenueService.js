import shiftService from '../services/shiftService';
import expenseService from './expenseService';
import constants from '../utils/constants';
import handlers from '../utils/handlers';
import timeFormatter from '../utils/timeFormatter';

const shiftsData = {
  amountOfShifts: 0,
  workTimeInSeconds: 0,
  wolt: {
    value: 0,
    commission: 0,
    valueExCommission: 0,
  },
  tips: {
    credit: {
      value: 0,
      vat: 0,
      commission: 0,
      valueExVatCommission: 0,
    },
    cash: 0,
  },
  totals: {
    valueExVatCommissionCash: 0,
  },
};

const expensesData = {
  insurancesPerMonth: 0,
  fuel: 0,
  maintenance: 0,
  equipment: 0,
  totals: {
    valueExInsurances: 0,
  },
};

const taxesData = {
  taxPointsValue: 0,
  nationalInsurance: 0,
  incomeTax: 0,
  totals: {
    value: 0,
  },
};

const netData = {
  earnings: 0,
  hourlyWage: 0,
};

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
  if (expensesRes.data.length > 0) sumExpensesCosts(expensesRes.data);

  // user
  taxesData.taxPointsValue =
    constants.TAX_POINT_VALUE_2021 * userProfile.taxPoints;
  expensesData.insurancesPerMonth =
    (userProfile.compulsory + userProfile.collateral) / 12;

  // taxes
  const earningsForTax = sumEarningsForTax(userProfile.taxRefunds);
  // national insurance
  calculateNationalInsuranceFine(earningsForTax);
  // income tax
  calculateIncomeTaxFine(earningsForTax);
  taxesData.totals.value = taxesData.nationalInsurance + taxesData.incomeTax;

  // net
  calculateNet();

  return handlers.handleSuccess({
    shiftsData,
    expensesData,
    taxesData,
    netData,
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
  if (earnings <= 6331)
    return (taxesData.nationalInsurance = earnings * 0.0705);
  taxesData.nationalInsurance = 6331 * 0.0705 + (earnings - 6331) * 0.196;
};

// handle calculate income tax fine
const calculateIncomeTaxFine = earnings => {
  let incomeTax = 0;
  let incomeTaxA = 0;
  let incomeTaxB = 0;
  let incomeTaxC = 0;
  let incomeTaxD = 0;
  if (earnings <= 6290) {
    incomeTax = earnings * 0.1;
  } else {
    if (earnings > 6290) {
      incomeTaxA = 6290 * 0.1;
      var remainEarnings = earnings - 6290;
      if (remainEarnings > 2740) {
        incomeTaxB = 2740 * 0.14;
        remainEarnings -= 2740;
        if (remainEarnings > 5460) {
          incomeTaxC = 5460 * 0.2;
          remainEarnings -= 5460;
          if (remainEarnings > 5650) {
            incomeTaxD = 5650 * 0.31;
            remainEarnings -= 5650;
          } else {
            incomeTaxD = remainEarnings * 0.31;
          }
        } else if (remainEarnings < 5460) {
          incomeTaxC = remainEarnings * 0.2;
        }
      } else if (remainEarnings < 2740) {
        incomeTaxB = remainEarnings * 0.14;
      }
      incomeTax = incomeTaxA + incomeTaxB + incomeTaxC + incomeTaxD;
    }
  }
  if (incomeTax - taxesData.taxPointsValue > 0)
    taxesData.incomeTax = incomeTax - taxesData.taxPointsValue;
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

export default {
  handleCalculateRevenuesForMonth,
};

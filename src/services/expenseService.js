import expenseApi from '../api/expenseApi';
import handlers from '../utils/handlers';

// handle submit expense
const handleSubmitExpense = async (userId, values) => {
  const expense = {...values};
  expense.cost = parseFloat(expense.cost);
  const date = new Date();
  // time
  expense.time = {
    timestamp: date.getTime(),
    year: date.getFullYear(),
    month: date.getMonth() + 1,
  };
  try {
    await expenseApi.submitExpense(userId, expense);
    // success
    return handlers.handleSuccess();
  } catch (err) {
    return handlers.handleError(err.message);
  }
};

export default {
  handleSubmitExpense,
};

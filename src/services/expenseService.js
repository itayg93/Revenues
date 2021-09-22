import expenseApi from '../api/expenseApi';
import handlers from '../utils/handlers';

// handle submit expense
const handleSubmitExpense = async (userId, values) => {
  const date = new Date();
  const expense = {...values};
  expense.cost = parseFloat(expense.cost);
  try {
    await expenseApi.submitExpense(userId, {
      ...expense,
      timestamp: date.getTime(),
      year: date.getFullYear(),
      month: date.getMonth() + 1,
    });
    // success
    return handlers.handleSuccess();
  } catch (err) {
    return handlers.handleError(err.message);
  }
};

export default {
  handleSubmitExpense,
};

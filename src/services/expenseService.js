import expenseApi from '../api/expenseApi';
import handlers from '../utils/handlers';

// handle submit expense
const handleSubmitExpense = async (userId, values) => {
  try {
    await expenseApi.submitExpense(userId, {...values, timestamp: Date.now()});
    // success
    return handlers.handleSuccess();
  } catch (err) {
    return handlers.handleError(err.message);
  }
};

export default {
  handleSubmitExpense,
};

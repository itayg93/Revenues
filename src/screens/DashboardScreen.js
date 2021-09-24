import React, {useContext, useState} from 'react';
import {StyleSheet, ScrollView} from 'react-native';
import {Portal, Headline} from 'react-native-paper';

import authContext from '../auth/authContext';
import expenseService from '../services/expenseService';
import constants from '../utils/constants';
import handlers from '../utils/handlers';
import defaultStyles from '../config/defaultStyles';
import LoadingScreen from './LoadingScreen';
import AppScreen from '../components/AppScreen';
import {AppSubmitExpenseForm} from '../components/form';
import AppTimerControlPanel from '../components/AppTimerControlPanel';

const DashboardScreen = () => {
  const {user, userProfile} = useContext(authContext);

  const [loading, setLoading] = useState(false);

  const handleSubmit = async values => {
    setLoading(true);
    const response = await expenseService.handleSubmitExpense(user.uid, values);
    setLoading(false);
    // error
    if (!response.isSuccess) return handlers.handleErrorAlert(response.error);
    // success
    handlers.handleSuccessAlert(constants.SUBMIT_EXPENSE_SUCCESS_ALERT_MESSAGE);
  };

  return (
    <AppScreen style={styles.contentContainer}>
      <Portal>{loading && <LoadingScreen />}</Portal>
      <ScrollView>
        {/** add expense */}
        <Headline>{constants.ADD_EXPENSE}</Headline>
        <AppSubmitExpenseForm
          onSubmitExpense={values => handleSubmit(values)}
        />
        {/** start shift */}
        <Headline>{constants.START_SHIFT}</Headline>
        <AppTimerControlPanel />
      </ScrollView>
    </AppScreen>
  );
};

export default DashboardScreen;

const styles = StyleSheet.create({
  contentContainer: {
    padding: defaultStyles.spacers.space10,
  },
});

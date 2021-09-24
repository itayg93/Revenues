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
import SubmitShiftModal from '../modals/SubmitShiftModal';
import shiftService from '../services/shiftService';

const DashboardScreen = () => {
  const {user, userProfile} = useContext(authContext);

  const [timeInSeconds, setTimeInSeconds] = useState(0);
  const [showSubmitShiftModal, setShowSubmitShiftModal] = useState(false);

  const [loading, setLoading] = useState(false);

  const handleSubmitExpense = async values => {
    setLoading(true);
    const response = await expenseService.handleSubmitExpense(user.uid, values);
    setLoading(false);
    // error
    if (!response.isSuccess) return handlers.handleErrorAlert(response.error);
    // success
    handlers.handleSuccessAlert(constants.SUBMIT_EXPENSE_SUCCESS_ALERT_MESSAGE);
  };

  const handleSubmitShift = async values => {
    setShowSubmitShiftModal(false);
    setLoading(true);
    const response = await shiftService.handleSubmitShift(
      user.uid,
      userProfile.commissionRate,
      {
        ...values,
        timeInSeconds,
      },
    );
    setLoading(false);
    // error
    if (!response.isSuccess) return handlers.handleErrorAlert(response.error);
    // success
    handlers.handleSuccessAlert(constants.SUBMIT_SHIFT_SUCCESS_ALERT_MESSAGE);
  };

  return (
    <AppScreen style={styles.contentContainer}>
      <Portal>{loading && <LoadingScreen />}</Portal>
      <ScrollView>
        {/** expense */}
        <Headline>{constants.EXPENSE}</Headline>
        <AppSubmitExpenseForm
          onSubmitExpense={values => handleSubmitExpense(values)}
        />
        {/** shift */}
        <Headline>{constants.SHIFT}</Headline>
        <AppTimerControlPanel
          onFinish={timer => {
            setTimeInSeconds(timer);
            setShowSubmitShiftModal(true);
          }}
        />
        {/** submit shift modal */}
        <Portal>
          <SubmitShiftModal
            visible={showSubmitShiftModal}
            onFinish={values => handleSubmitShift(values)}
          />
        </Portal>
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

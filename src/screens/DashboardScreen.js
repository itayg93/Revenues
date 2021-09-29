import React, {useContext, useState} from 'react';
import {
  StyleSheet,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import {Portal, Headline} from 'react-native-paper';

import authContext from '../auth/authContext';
import expenseService from '../services/expenseService';
import constants from '../utils/constants';
import handlers from '../utils/handlers';
import defaultStyles from '../config/defaultStyles';
import LoadingScreen from './LoadingScreen';
import {AppSubmitExpenseForm} from '../components/form';
import AppTimerControlPanel from '../components/AppTimerControlPanel';
import SubmitShiftModal from '../modals/SubmitShiftModal';
import shiftService from '../services/shiftService';

const DashboardScreen = () => {
  const {
    user: {uid},
    userProfile: {commissionRate},
  } = useContext(authContext);

  const [timeInSeconds, setTimeInSeconds] = useState(0);
  const [showSubmitShiftModal, setShowSubmitShiftModal] = useState(false);

  const [loading, setLoading] = useState(false);

  const handleSubmitExpense = async values => {
    setLoading(true);
    const response = await expenseService.handleSubmitExpense(uid, values);
    setLoading(false);
    // error
    if (!response.isSuccess) return handlers.handleErrorAlert(response.error);
    // success
    handlers.handleSuccessAlert(constants.SUBMIT_EXPENSE_SUCCESS_ALERT_MESSAGE);
  };

  const handleSubmitShift = async values => {
    setShowSubmitShiftModal(false);
    setLoading(true);
    const response = await shiftService.handleSubmitShift(uid, commissionRate, {
      ...values,
      timeInSeconds,
    });
    setLoading(false);
    // error
    if (!response.isSuccess) return handlers.handleErrorAlert(response.error);
    // success
    handlers.handleSuccessAlert(constants.SUBMIT_SHIFT_SUCCESS_ALERT_MESSAGE);
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.keyboardAvoidingContainer}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <SafeAreaView style={styles.safeAreaViewContainer}>
          <Portal>{loading && <LoadingScreen />}</Portal>
          {/** expense */}
          <View style={styles.contentContainer}>
            <Headline>{constants.EXPENSE}</Headline>
            <AppSubmitExpenseForm
              onSubmitExpense={values => handleSubmitExpense(values)}
            />
          </View>
          {/** shift */}
          <View style={styles.contentContainer}>
            <Headline>{constants.SHIFT}</Headline>
            <AppTimerControlPanel
              onFinish={timer => {
                setTimeInSeconds(timer);
                setShowSubmitShiftModal(true);
              }}
            />
          </View>
          {/** submit shift modal */}
          <Portal>
            <SubmitShiftModal
              visible={showSubmitShiftModal}
              onDismiss={() => setShowSubmitShiftModal(false)}
              onFinish={values => handleSubmitShift(values)}
            />
          </Portal>
        </SafeAreaView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default DashboardScreen;

const styles = StyleSheet.create({
  keyboardAvoidingContainer: {
    flex: 1,
  },
  safeAreaViewContainer: {
    flex: 1,
  },
  contentContainer: {
    padding: defaultStyles.spacers.space10,
  },
});

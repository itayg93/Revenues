import React, {useContext, useState} from 'react';
import {StyleSheet, View, ScrollView, Keyboard} from 'react-native';
import {Portal, Surface, Headline, Paragraph} from 'react-native-paper';
import * as Yup from 'yup';

import authContext from '../auth/authContext';
import expenseService from '../services/expenseService';
import constants from '../utils/constants';
import handlers from '../utils/handlers';
import defaultStyles from '../config/defaultStyles';
import LoadingScreen from './LoadingScreen';
import AppScreen from '../components/AppScreen';
import {
  AppForm,
  AppFormTextInput,
  AppFormButton,
  AppFormChip,
} from '../components/form';

const validationSchema = Yup.object().shape({
  type: Yup.string(),
  cost: Yup.number().required('Required'),
  comment: Yup.string(),
});

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
    handlers.handleSuccessAlert('Expense successfully Added!');
  };

  return (
    <AppScreen style={styles.contentContainer}>
      <Portal>{loading && <LoadingScreen />}</Portal>
      <ScrollView>
        {/** add expense */}
        <Headline>Add Expense</Headline>
        <Surface style={styles.addExpenseContainer}>
          <AppForm
            initialValues={{
              type: constants.expensesTypes[0].value,
              cost: '',
              comment: '',
            }}
            validationSchema={validationSchema}
            onSubmit={async (values, {resetForm}) => {
              Keyboard.dismiss();
              await handleSubmit(values);
              resetForm();
            }}>
            {/** type */}
            <Paragraph>Type</Paragraph>
            <View style={styles.typeChipsContainer}>
              {constants.expensesTypes.map((t, index) => (
                <AppFormChip key={index.toString()} type={t} />
              ))}
            </View>
            {/** cost & comment */}
            <View style={styles.TextInputsContainer}>
              {/** cost */}
              <View style={styles.leftInputContainer}>
                <AppFormTextInput
                  name="cost"
                  label="Cost"
                  keyboardType="numeric"
                />
              </View>
              {/** comment */}
              <View style={styles.rightInputContainer}>
                <AppFormTextInput
                  name="comment"
                  label="Comment"
                  autoCorrect={false}
                  multiline
                />
              </View>
            </View>
            {/** submit */}
            <AppFormButton />
          </AppForm>
        </Surface>
        {/** start shift */}
        <Headline>Start Shift</Headline>
        <Surface style={styles.startShiftContainer}></Surface>
      </ScrollView>
    </AppScreen>
  );
};

export default DashboardScreen;

const styles = StyleSheet.create({
  contentContainer: {
    padding: defaultStyles.spacers.space10,
  },
  addExpenseContainer: {
    marginVertical: defaultStyles.spacers.space5,
    padding: defaultStyles.spacers.space10,
    borderRadius: 10,
    backgroundColor: defaultStyles.colors.white,
    elevation: 2,
  },
  typeChipsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: defaultStyles.spacers.space5,
    marginBottom: defaultStyles.spacers.space10,
  },
  TextInputsContainer: {
    flexDirection: 'row',
  },
  leftInputContainer: {
    flex: 1,
    marginRight: defaultStyles.spacers.space5,
  },
  rightInputContainer: {
    flex: 2,
    marginLeft: defaultStyles.spacers.space5,
  },
  startShiftContainer: {
    marginTop: defaultStyles.spacers.space5,
    padding: defaultStyles.spacers.space10,
    borderRadius: 10,
    backgroundColor: defaultStyles.colors.white,
    elevation: 2,
  },
});

import React from 'react';
import {Keyboard, StyleSheet, View} from 'react-native';
import {Surface} from 'react-native-paper';

import validationSchemas from '../../utils/validationSchemas';
import constants from '../../utils/constants';
import defaultStyles from '../../config/defaultStyles';
import {AppForm, AppFormChip, AppFormTextInput, AppFormButton} from '../form';

const AppSubmitExpenseForm = ({onSubmitExpense}) => {
  return (
    <Surface style={styles.addExpenseContainer}>
      <AppForm
        initialValues={{
          type: constants.expensesTypes[0].value,
          cost: '',
          comment: '',
        }}
        validationSchema={validationSchemas.EXPENSE}
        onSubmit={async (values, {resetForm}) => {
          Keyboard.dismiss();
          await onSubmitExpense(values);
          resetForm();
        }}>
        {/** type */}
        <View style={styles.typeChipsContainer}>
          {constants.expensesTypes.map((t, index) => (
            <AppFormChip key={index.toString()} type={t} />
          ))}
        </View>
        {/** cost & comment */}
        <View style={styles.textInputsContainer}>
          {/** cost */}
          <View style={styles.leftInputContainer}>
            <AppFormTextInput
              name={constants.cost}
              label={constants.COST}
              keyboardType="numeric"
            />
          </View>
          {/** comment */}
          <View style={styles.rightInputContainer}>
            <AppFormTextInput
              name={constants.comment}
              label={constants.COMMENT}
              autoCorrect={false}
              multiline
            />
          </View>
        </View>
        {/** submit */}
        <AppFormButton />
      </AppForm>
    </Surface>
  );
};

export default AppSubmitExpenseForm;

const styles = StyleSheet.create({
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
  textInputsContainer: {
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
});

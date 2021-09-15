import React, {useState} from 'react';
import {Alert, StyleSheet} from 'react-native';
import * as Yup from 'yup';

import authService from '../services/authService';

import defaultStyles from '../config/defaultStyles';
import AppScreen from '../components/AppScreen';
import {AppForm, AppFormTextInput, AppFormButton} from '../components/form';

const validationSchema = Yup.object().shape({
  name: Yup.string().required().label('Name'),
  email: Yup.string().required().email().label('Email'),
  password: Yup.string().required().min(6).label('Password'),
});

const RegisterScreen = () => {
  const [loading, setLoading] = useState(false);

  const [hidePassword, setHidePassword] = useState(true);

  const handleRegister = async values => {
    setLoading(true);
    let response = await authService.handleRegisterWithEmailAndPassword(
      values.name,
      values.email,
      values.password,
    );

    if (!response.isSuccess) {
      setLoading(false);
      Alert.alert('Error', response.error);
    }
  };

  return (
    <AppScreen style={styles.contentContainer}>
      <AppForm
        initialValues={{
          name: '',
          email: '',
          password: '',
        }}
        validationSchema={validationSchema}
        onSubmit={values => handleRegister(values)}>
        {/** name */}
        <AppFormTextInput name="name" placeholder="Name" autoCorrect={false} />
        {/** email */}
        <AppFormTextInput
          name="email"
          placeholder="Email"
          autoCapitalize="none"
          autoCorrect={false}
          keyboardType="email-address"
        />
        {/** password */}
        <AppFormTextInput
          name="password"
          placeholder="Password"
          icon="eye"
          onIconPress={() => setHidePassword(!hidePassword)}
          autoCapitalize="none"
          autoCorrect={false}
          secureTextEntry={hidePassword}
        />
        {/** submit */}
        <AppFormButton label="Register" loading={loading} />
      </AppForm>
    </AppScreen>
  );
};

export default RegisterScreen;

const styles = StyleSheet.create({
  contentContainer: {
    padding: defaultStyles.spacers.space10,
  },
});

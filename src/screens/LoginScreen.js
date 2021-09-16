import React, {useState, useContext} from 'react';
import {Alert, StyleSheet} from 'react-native';
import * as Yup from 'yup';

import authService from '../services/authService';
import authContext from '../auth/authContext';

import defaultStyles from '../config/defaultStyles';
import AppScreen from '../components/AppScreen';
import {AppForm, AppFormTextInput, AppFormButton} from '../components/form';

const validationSchema = Yup.object().shape({
  email: Yup.string().required().email().label('Email'),
  password: Yup.string().required().min(6).label('Password'),
});

const LoginScreen = () => {
  const {setUser} = useContext(authContext);

  const [loading, setLoading] = useState(false);

  const [hidePassword, setHidePassword] = useState(true);

  const handleLogin = async values => {
    setLoading(true);
    let response = await authService.handleLoginWithEmailAndPassword(
      values.email,
      values.password,
    );

    // error
    if (!response.isSuccess) {
      setLoading(false);
      Alert.alert('Error', response.error);
      return;
    }

    // success
    setLoading(false);
    setUser(response.data);
  };

  return (
    <AppScreen style={styles.contentContainer}>
      <AppForm
        initialValues={{
          email: '',
          password: '',
        }}
        validationSchema={validationSchema}
        onSubmit={values => handleLogin(values)}>
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
        <AppFormButton label="Login" loading={loading} />
      </AppForm>
    </AppScreen>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  contentContainer: {
    padding: defaultStyles.spacers.space10,
  },
});

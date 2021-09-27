import React, {useEffect, useState, useContext} from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import {Portal, Headline, Subheading, Chip} from 'react-native-paper';

import revenueService from '../services/revenueService';
import authContext from '../auth/authContext';
import handlers from '../utils/handlers';
import constants from '../utils/constants';
import defaultStyles from '../config/defaultStyles';
import LoadingScreen from './LoadingScreen';
import AppScreen from '../components/AppScreen';

const RevenuesScreen = () => {
  const {
    user: {uid},
    userProfile,
  } = useContext(authContext);

  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1);

  const [revenuesData, setRevenuesData] = useState();

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    handleMonthSelection();
  }, [selectedMonth]);

  const handleMonthSelection = async () => {
    setLoading(true);
    const response = await revenueService.handleCalculateRevenuesForMonth(
      uid,
      userProfile,
      selectedMonth,
    );
    setLoading(false);
    // error
    if (!response.isSuccess) return handlers.handleErrorAlert(response.error);
    // success
    setRevenuesData(response.data);
  };

  return (
    <AppScreen style={styles.contentContainer}>
      <Portal>{loading && <LoadingScreen />}</Portal>
      <ScrollView>
        <Headline>Month</Headline>
        <View style={styles.monthChipsContainer}>
          {constants.months.map((month, index) => (
            <Chip
              key={index.toString()}
              style={styles.monthChip}
              onPress={() => {
                if (month.value !== selectedMonth)
                  setSelectedMonth(month.value);
              }}
              selected={month.value === selectedMonth}>
              {month.label}
            </Chip>
          ))}
        </View>
      </ScrollView>
    </AppScreen>
  );
};

export default RevenuesScreen;

const styles = StyleSheet.create({
  contentContainer: {
    padding: defaultStyles.spacers.space10,
  },
  monthChipsContainer: {
    flexWrap: 'wrap',
    flexDirection: 'row',
    marginTop: defaultStyles.spacers.space10,
  },
  monthChip: {
    marginRight: defaultStyles.spacers.space5,
    marginBottom: defaultStyles.spacers.space10,
  },
  revenuesDataContainer: {
    marginTop: defaultStyles.spacers.space5,
  },
});

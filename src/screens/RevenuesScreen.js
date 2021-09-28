import React, {useEffect, useState, useContext} from 'react';
import {StyleSheet, View, ScrollView, RefreshControl} from 'react-native';
import {Portal, Headline, Chip, Subheading, Button} from 'react-native-paper';

import revenueService from '../services/revenueService';
import authContext from '../auth/authContext';
import constants from '../utils/constants';
import defaultStyles from '../config/defaultStyles';
import LoadingScreen from './LoadingScreen';
import AppScreen from '../components/AppScreen';
import AppRevenuesPanel from '../components/AppRevenuesPanel';

const RevenuesScreen = () => {
  const {user, userProfile} = useContext(authContext);

  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1);
  const [revenuesData, setRevenuesData] = useState();

  const [loading, setLoading] = useState(true);
  const [refresh, setRefresh] = useState(false);

  const [error, setError] = useState('');

  useEffect(() => {
    handleMonthSelection();
  }, [selectedMonth]);

  const handleGetRevenuesData = async setController => {
    setController(true);
    const response = await revenueService.handleCalculateRevenuesForMonth(
      user.uid,
      userProfile,
      selectedMonth,
    );
    setController(false);
    // error
    if (!response.isSuccess) {
      setRevenuesData();
      setError(response.error);
      return;
    }
    // success
    setRevenuesData(response.data);
  };

  const handleMonthSelection = () => {
    handleGetRevenuesData(setLoading);
  };

  const handleRefresh = () => {
    handleGetRevenuesData(setRefresh);
  };

  const handleRetry = () => {
    handleGetRevenuesData(setLoading);
  };

  return (
    <AppScreen style={styles.contentContainer}>
      <Portal>{loading && <LoadingScreen />}</Portal>
      <Headline>Select Month</Headline>
      <View style={styles.monthChipsContainer}>
        {constants.months.map((month, index) => (
          <Chip
            key={index.toString()}
            style={styles.monthChip}
            onPress={() => {
              if (month.value !== selectedMonth) setSelectedMonth(month.value);
            }}
            selected={month.value === selectedMonth}>
            {month.label}
          </Chip>
        ))}
      </View>
      {revenuesData ? (
        <ScrollView
          style={styles.revenuesDataContainer}
          refreshControl={
            <RefreshControl refreshing={refresh} onRefresh={handleRefresh} />
          }>
          <AppRevenuesPanel revenues={revenuesData} />
        </ScrollView>
      ) : (
        <View style={styles.errorContainer}>
          <Subheading>{error}</Subheading>
          <Button onPress={handleRetry}>Retry</Button>
        </View>
      )}
    </AppScreen>
  );
};

export default RevenuesScreen;

const styles = StyleSheet.create({
  contentContainer: {
    paddingHorizontal: defaultStyles.spacers.space10,
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
    marginBottom: defaultStyles.spacers.space5,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

import React from 'react';
import {StyleSheet} from 'react-native';
import {Subheading, Title, Divider} from 'react-native-paper';

import timeFormatter from '../utils/timeFormatter';
import constants from '../utils/constants';
import AppRevenuesPanelItem from './AppRevenuesPanelItem';
import defaultStyles from '../config/defaultStyles';

const AppRevenuesPanel = ({revenues}) => {
  return (
    <>
      {/** shifts amount */}
      <Subheading>
        Amount Of Shifts: {revenues.shifts.amountOfShifts}
      </Subheading>
      <Divider style={styles.divider} />
      {/** work time */}
      <Subheading>
        Total Work Time: {timeFormatter(revenues.shifts.workTimeInSeconds)}
      </Subheading>
      <Divider style={styles.divider} />
      {/** wolt */}
      <Subheading>
        Wolt: {revenues.shifts.wolt.value}
        {constants.INS}
      </Subheading>
      <Divider style={styles.divider} />
      {/** tips */}
      <Subheading>
        Tips: {revenues.shifts.tips.credit.value + revenues.shifts.tips.cash}
        {constants.INS}
      </Subheading>
      <>
        <AppRevenuesPanelItem
          label="Credit"
          data={revenues.shifts.tips.credit.value}
        />
        <AppRevenuesPanelItem label="Cash" data={revenues.shifts.tips.cash} />
      </>
      <Divider style={styles.divider} />
      {/** commission */}
      <Subheading>
        Commission:{' '}
        {(
          revenues.shifts.wolt.commission +
          revenues.shifts.tips.credit.commission
        ).toFixed(2)}
        {constants.INS}
      </Subheading>
      <>
        <AppRevenuesPanelItem
          label="Wolt"
          data={revenues.shifts.wolt.commission}
        />
        <AppRevenuesPanelItem
          label="Credit"
          data={revenues.shifts.tips.credit.commission}
        />
      </>
      <Divider style={styles.divider} />
      {/** vat */}
      <Subheading>
        Vat On Credit Tips: {revenues.shifts.tips.credit.vat.toFixed(2)}
        {constants.INS}
      </Subheading>
      <Divider style={styles.divider} />
      {/** taxes */}
      <Subheading>
        Taxes: {revenues.taxes.totals.value.toFixed(2)}
        {constants.INS}
      </Subheading>
      <>
        <AppRevenuesPanelItem
          label="National insurance"
          data={revenues.taxes.nationalInsurance}
        />
        <AppRevenuesPanelItem
          label="Income tax"
          data={revenues.taxes.incomeTax}
        />
      </>
      <Divider style={styles.divider} />
      {/** expenses */}
      <Subheading>
        Expenses:{' '}
        {revenues.expenses.totals.valueExInsurances +
          revenues.expenses.insurancesPerMonth}
        {constants.INS}
      </Subheading>
      <>
        <AppRevenuesPanelItem
          label="Insurances"
          data={revenues.expenses.insurancesPerMonth}
        />
        <AppRevenuesPanelItem label="Fuel" data={revenues.expenses.fuel} />
        <AppRevenuesPanelItem
          label="Maintenance"
          data={revenues.expenses.maintenance}
        />
        <AppRevenuesPanelItem
          label="Equipment"
          data={revenues.expenses.equipment}
        />
      </>
      <Divider style={styles.divider} />
      {/** net */}
      <Title>Net</Title>
      <>
        <AppRevenuesPanelItem label="Earnings" data={revenues.net.earnings} />
        <AppRevenuesPanelItem
          label="Hourly wage"
          data={revenues.net.hourlyWage}
        />
      </>
    </>
  );
};

export default AppRevenuesPanel;

const styles = StyleSheet.create({
  divider: {
    backgroundColor: defaultStyles.colors.mediumGrey,
    marginVertical: defaultStyles.spacers.space5,
    marginRight: defaultStyles.spacers.space30,
  },
});

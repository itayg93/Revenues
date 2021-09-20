import React from 'react';
import {StyleSheet, View, TouchableOpacity} from 'react-native';
import {Surface, Avatar, Title, Paragraph, Caption} from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import defaultStyles from '../config/defaultStyles';

const AppUserProfileCard = ({user, lastUpdateMillis, onPress}) => {
  var lastUpdateDate = new Date(parseInt(lastUpdateMillis, 10)).toString();
  return (
    <Surface style={styles.container}>
      {/** avatar */}
      <View style={styles.avatarContainer}>
        <Avatar.Text label={user.displayName[0]} />
      </View>
      {/** user details */}
      <View style={styles.userDetailsContainer}>
        <Title>{user.displayName}</Title>
        <Paragraph>{user.email}</Paragraph>
        <Caption numberOfLines={1}>Last update: {lastUpdateDate}</Caption>
      </View>
      {/** logout icon */}
      <TouchableOpacity onPress={onPress}>
        <MaterialCommunityIcons
          name="logout"
          size={24}
          color={defaultStyles.colors.mediumGrey}
        />
      </TouchableOpacity>
    </Surface>
  );
};

export default AppUserProfileCard;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: defaultStyles.colors.white,
    padding: defaultStyles.spacers.space10,
    marginBottom: defaultStyles.spacers.space10,
    borderRadius: 10,
    elevation: 2,
  },
  avatarContainer: {},
  userDetailsContainer: {
    flex: 1,
    marginLeft: defaultStyles.spacers.space10,
  },
});

// @flow

import * as React from 'react';
import { StyleSheet, View, FlatList, RefreshControl } from 'react-native';
import { connect } from 'react-redux';
import { INVITE_ACTIVE } from '@/utils/constants';
import fetchUserInfo from '@/actions/fetchUserInfo';
import EmptyList from '@/components/Helpers/EmptyList';
import NotificationCard from './NotificationCard';
import InviteCard from './InviteCard';

type State = {
  refreshing: boolean,
};

class NotificationsScreen extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      refreshing: false,
    };
  }

  componentDidMount() {
    const { navigation, dispatch } = this.props;
    navigation.addListener('focus', () => {
      dispatch(fetchUserInfo());
    });
  }

  onRefresh = async () => {
    try {
      const { dispatch } = this.props;
      this.setState({ refreshing: true });
      await dispatch(fetchUserInfo());
      this.setState({ refreshing: false });
    } catch (err) {
      console.log(err.message);
      this.setState({ refreshing: false });
    }
  };

  render() {
    const { navigation, notifications, invites } = this.props;
    const activeInvites = invites
      ? invites.filter((invite) => invite.state === INVITE_ACTIVE)
      : [];
    const notificationData = notifications.concat(activeInvites);

    return (
      <View style={styles.container}>
        <FlatList
          contentContainerStyle={{ paddingBottom: 50, flexGrow: 1 }}
          data={notificationData}
          keyExtractor={({ inviteId, msg }, index) => (inviteId || msg) + index}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl
              refreshing={this.state.refreshing}
              onRefresh={this.onRefresh}
            />
          }
          ListEmptyComponent={
            <EmptyList
              title="Nothing here, come back later.."
              iconType="bell-off-outline"
            />
          }
          renderItem={({ item }) =>
            item.inviteId ? (
              <InviteCard invite={item} />
            ) : (
              <NotificationCard
                navigation={navigation}
                msg={item.msg}
                icon={item.icon}
              />
            )
          }
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fdfdfd',
  },
});

export default connect(({ groups, user }) => ({ ...groups, ...user }))(
  NotificationsScreen,
);

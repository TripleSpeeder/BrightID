// @flow

import * as React from 'react';
import { TextInput, TouchableOpacity, StyleSheet, View } from 'react-native';
import { connect } from 'react-redux';
import Octicons from 'react-native-vector-icons/Octicons';
import { setGroupSearch } from '../../actions/groups';

/**
 * Search Bar in the Groups Screen
 *
 * TODO: Create a shared search component to use in both Connections and Group view
 */

type LocalProps = {
  navigation: Navigation,
};

class SearchGroups extends React.Component<Props & LocalProps> {
  componentWillUnmount() {
    // reset search Param
    const { dispatch } = this.props;
    dispatch(setGroupSearch(''));
  }

  render() {
    const { searchParam } = this.props;
    return (
      <View style={styles.container}>
        <TouchableOpacity style={styles.searchIcon}>
          <Octicons size={26} name="search" color="#333" />
        </TouchableOpacity>
        <TextInput
          onChangeText={(value) => this.props.dispatch(setGroupSearch(value))}
          style={styles.searchField}
          placeholder="Search Groups"
          autoCapitalize="words"
          autoCorrect={false}
          textContentType="name"
          underlineColorAndroid="transparent"
          placeholderTextColor="#aaa"
          value={searchParam}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginTop: 10,
    width: '90%',
    borderColor: '#ccc',
    borderWidth: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  searchIcon: {
    marginLeft: 10,
    marginRight: 12,
    marginTop: 5,
  },
  searchField: {
    fontFamily: 'ApexNew-Book',
    fontSize: 16,
    color: '#333',
    marginTop: 3.1,
    marginLeft: 23,
    flex: 1,
    fontWeight: 'normal',
    fontStyle: 'normal',
    letterSpacing: 0,
  },
});

function mapStateToProps(state) {
  const { searchParam } = state.groups;
  return { searchParam };
}

export default connect(mapStateToProps)(SearchGroups);
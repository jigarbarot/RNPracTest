/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useState} from 'react';
import {SafeAreaView, StyleSheet, Text, TouchableOpacity} from 'react-native';
import Dropdown from './components/dropdown';
import GridView from './components/gridView';

function App(): React.JSX.Element {
  const [isDropdownVisible, setIsDropdownVisible] = useState<boolean>(false);
  const [selectedNumber, setSelectedNumber] = useState<number | null>(null);

  const toggleDropdown = () => {
    setIsDropdownVisible(!isDropdownVisible);
  };

  const selectItem = (item: number) => {
    setSelectedNumber(item);
    toggleDropdown();
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.txtTitle}>Select a number</Text>

      <TouchableOpacity onPress={toggleDropdown}>
        <Text style={styles.dropdownToggle}>
          {selectedNumber ? selectedNumber : 'Select a number'}
        </Text>
      </TouchableOpacity>

      <GridView selectedNumber={selectedNumber} />

      <Dropdown
        isDropdownVisible={isDropdownVisible}
        onCloseModal={toggleDropdown}
        selectedItem={selectedNumber}
        selectItem={selectItem}
      />
    </SafeAreaView>
  );
}

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
  },
  dropdownToggle: {
    fontSize: 16,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    marginHorizontal: 16,
  },
  txtTitle: {
    marginHorizontal: 16,
    marginTop: 20,
    marginBottom: 5,
  },
});

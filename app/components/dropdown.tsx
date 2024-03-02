import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  StyleSheet,
  FlatList,
  ListRenderItem,
} from 'react-native';

const myNumbers: number[] = [...Array(8).keys()].map(num => num + 2);

interface Props {
  isDropdownVisible: boolean;
  onCloseModal: () => void;
  selectedItem: any;
  selectItem: (item: number) => void;
}

const Dropdown: React.FC<Props> = ({
  isDropdownVisible,
  onCloseModal,
  selectedItem,
  selectItem,
}) => {
  const _renderItems: ListRenderItem<number> = ({item}) => {
    return (
      <TouchableOpacity
        onPress={() => selectItem(item)}
        style={styles.itemView}>
        <Text style={styles.option}>{item}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <Modal
        visible={isDropdownVisible}
        animationType="slide"
        onRequestClose={onCloseModal}>
        <View style={styles.modalContainer}>
          <View style={styles.header}>
            <TouchableOpacity onPress={onCloseModal} style={styles.hederLeft}>
              <Text style={styles.backButton}>Back</Text>
            </TouchableOpacity>
            <View style={styles.hederCenter}>
              <Text style={styles.headerTitle}>Select a number</Text>
            </View>
            <View style={styles.hederRight} />
          </View>
          <FlatList
            data={myNumbers}
            keyExtractor={(item, index) => 'option_' + index}
            renderItem={_renderItems}
            ItemSeparatorComponent={() => <View style={styles.separatorView} />}
          />
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    marginTop: 40,
    backgroundColor: 'white',
    borderRadius: 8,
    elevation: 4,
  },
  option: {
    fontSize: 16,
    padding: 10,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  backButton: {
    fontSize: 16,
    color: 'blue',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  hederLeft: {
    flex: 1,
  },
  hederCenter: {
    flex: 2,
  },
  hederRight: {
    flex: 0.5,
  },
  itemView: {
    marginTop: 10,
  },
  separatorView: {
    height: 1,
    width: '100%',
    backgroundColor: '#ccc',
  },
});

export default Dropdown;

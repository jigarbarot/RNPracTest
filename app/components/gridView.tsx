import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {SCREEN_WIDTH} from '../utils/constants';

interface Props {
  selectedNumber: number | null;
}

const GridView: React.FC<Props> = ({selectedNumber}) => {
  const [generatedNumber, setGeneratedNumber] = useState<number | null>(null);
  const [disabled, setDisabled] = useState<boolean>(false);
  const [lastGeneratedNumber, setLastGeneratedNumber] = useState<number | null>(
    null,
  );

  useEffect(() => {
    setGeneratedNumber(null);
    setDisabled(false);
    setLastGeneratedNumber(null);
  }, [selectedNumber]);

  if (!selectedNumber) {
    return null;
  }

  const gridSize = selectedNumber * selectedNumber;
  const gridItems = Array.from({length: gridSize}, (_, index) => index + 1);
  const boxSize = SCREEN_WIDTH / selectedNumber;

  const generateRandomNumber = () => {
    if (selectedNumber && !disabled) {
      let randomNumber = Math.floor(Math.random() * gridSize) + 1;
      while (randomNumber === lastGeneratedNumber) {
        randomNumber = Math.floor(Math.random() * gridSize) + 1;
      }
      setGeneratedNumber(randomNumber);
      setDisabled(true);
    }
  };

  const handleBlockPress = (item: number) => {
    if (generatedNumber === item) {
      setDisabled(false);
      setLastGeneratedNumber(generatedNumber);
    }
  };

  return (
    <View style={styles.gridContainer}>
      {gridItems.map(item => (
        <TouchableOpacity
          key={item}
          style={[
            styles.gridItem,
            generatedNumber === item ? styles.highlighted : null,
            {width: boxSize, height: boxSize},
          ]}
          onPress={() => handleBlockPress(item)}>
          <Text style={styles.gridText}>{item}</Text>
        </TouchableOpacity>
      ))}

      <TouchableOpacity
        style={[styles.generateButton, disabled ? styles.disabledButton : null]}
        onPress={generateRandomNumber}
        disabled={disabled}>
        <Text style={styles.buttonText}>Generate</Text>
      </TouchableOpacity>
    </View>
  );
};

export default GridView;

const styles = StyleSheet.create({
  gridContainer: {
    marginTop: 20,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  gridItem: {
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
  },
  gridText: {
    fontSize: 16,
  },
  highlighted: {
    backgroundColor: 'yellow',
  },
  generateButton: {
    marginTop: 20,
    backgroundColor: 'blue',
    padding: 10,
    alignSelf: 'center',
    borderRadius: 5,
    width: SCREEN_WIDTH - 32,
    marginHorizontal: 16,
  },
  disabledButton: {
    backgroundColor: 'gray',
  },
  buttonText: {
    textAlign: 'center',
    color: 'white',
    fontSize: 16,
  },
});

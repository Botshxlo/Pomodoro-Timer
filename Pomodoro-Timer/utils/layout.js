import React, { Component, useState } from 'react';
import {StyleSheet, Text, View, Button, TextInput } from 'react-native';

export const Change = () => {
  // set up the state for the Work mins
  const [workMinuteValue, setWorkMinuteValue] = useState('25')
  const [workSecondsValue, setWorkSecondsValue] = useState('00')
  const [breakMinuteValue, setBreakMinuteValue] = useState('')
  const [breakSecondsValue, setBreakSecondsValue] = useState('')

  const values = {
    // state value and set state for work {minute && seconds}
    workMinuteValue: workMinuteValue,
    setWorkMinuteValue: setWorkMinuteValue,
    workSecondsValue: workSecondsValue,
    setWorkSecondsValue: setWorkSecondsValue,

    // state value and set state for break {minute && seconds}
    breakMinuteValue: breakMinuteValue,
    setBreakMinuteValue: setBreakMinuteValue,
    breakSecondsValue: breakSecondsValue,
    setBreakSecondsValue: setBreakSecondsValue
  }

  return values
}


export const Layout = props => {
    const { workMinuteValue, 
            setWorkMinuteValue, 
            workSecondsValue, 
            setWorkSecondsValue,
            breakMinuteValue,
            setBreakMinuteValue,
            breakSecondsValue,
            setBreakSecondsValue
          } = Change()
    
    return (
      <View style={styles.container}>
          <Text style={styles.header}>WORK TIMER</Text>
          <View>
            <Text style={styles.text}>{props.time}</Text>
          </View>

          <View style={styles.buttons}>
            <Button title={props.button} onPress={props.function}></Button>
            <Text>  </Text>
            <Button title='reset' onPress={props.resetFunction}></Button>
          </View>

          <Text>  </Text>

          <View style={styles.textInput}>
            <Text>Work Mins: {workMinuteValue}</Text>
            <TextInput 
            style={styles.input}
            keyboardType = 'number-pad'
            placeholder="Enter number"
            onChangeText={value => setWorkMinuteValue(value)}
            onChangeText={props.changeFunction}
            defaultValue={workMinuteValue}
            />
            <Text>  {workSecondsValue}</Text>
            <Text>Secs: </Text>
            <TextInput 
            style={styles.input}
            keyboardType = 'number-pad'
            placeholder="Enter number"
            onChangeText={value => setWorkSecondsValue(value)}
            onChangeText={props.changeFunction}
            defaultValue={workSecondsValue}
            />
          </View>

          <Text>  </Text>

          <View style={styles.textInput}>
            <Text>Break Mins: {breakMinuteValue}</Text>
            <TextInput 
            style={styles.input}
            keyboardType = 'number-pad'
            placeholder="Enter number"
            onChangeText={value => setBreakMinuteValue(value)}
            onChangeText={props.changeFunction}
            defaultValue={breakMinuteValue}
            />
            <Text> {breakSecondsValue} </Text>
            <Text>Secs: </Text>
            <TextInput 
            style={styles.input}
            keyboardType = 'number-pad'
            placeholder="Enter number"
            onChangeText={value => setBreakSecondsValue(value)}
            onChangeText={props.changeFunction}
            defaultValue={breakSecondsValue}
            />
          </View>
      </View>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 70,
      margin: 90,
    },
    header: {
      fontSize: 50,
      fontWeight: 700
    },
    text: {
      fontSize: 40,
    },
    buttons: {
      justifyContent: 'space-between',
      flexDirection: "row"
    },
    textInput: {
      flexDirection: "row",
      fontWeight: 15
    },
    input: {
      height: 40,
      borderColor: 'black',
      borderWidth: 2,
      borderRadius: 5,
    }
});
  
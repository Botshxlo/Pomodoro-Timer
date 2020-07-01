import React, { Component, useState } from 'react';
import {StyleSheet, Text, View, Button, TextInput } from 'react-native';
import PropTypes from 'prop-types';

export const Layout = props => {
    return (
      <View style={styles.view}>
        <View style={styles.headingContainer}>
        <Text style={styles.heading}>Pomodoro Timer</Text>
        </View>
        <View style={styles.container}>

            <Text style={styles.header}>{props.title}</Text>

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

              <Text style={styles.label}>Work Mins: </Text>

              <TextInput 
              style={styles.input}
              keyboardType = 'number-pad'
              placeholder="Enter number"
              onChangeText={value => props.setWorkMinutes(value)}
              defaultValue={'25'}
              maxLength = {2}
              keyboardType='numeric'
              
              />

              <Text>  </Text>

              <Text style={styles.label}>Secs: </Text>

              <TextInput 
              style={styles.input}
              keyboardType = 'number-pad'
              placeholder="Enter number"
              onChangeText={value => props.setWorkSeconds(value)}
              defaultValue={'00'}
              maxLength={2}
              keyboardType='numeric'
              />

            </View>

            <Text>  </Text>

            <View style={styles.textInput}>

              <Text style={styles.label}>Break Mins: </Text>

              <TextInput 
              style={styles.input}
              keyboardType = 'number-pad'
              placeholder="Enter number"
              onChangeText={value => props.setBreakMinutes(value)}
              defaultValue={'05'}
              maxLength={2}
              keyboardType='numeric'
              />

              <Text> </Text>

              <Text style={styles.label}>Secs: </Text>

              <TextInput 
              style={styles.input}
              keyboardType = 'number-pad'
              placeholder="Enter number"
              onChangeText={value => props.setBreakSeconds(value)}
              defaultValue={'00'}
              maxLength={2}
              keyboardType='numeric'
              />

            </View>
        </View>
      </View>  
    )
}

Layout.propTypes = {
  time: PropTypes.string.isRequired,
  button: PropTypes.string.isRequired,
  function: PropTypes.func.isRequired,
  resetFunction: PropTypes.func.isRequired,
  setWorkMinutes: PropTypes.func.isRequired,
  setWorkSeconds: PropTypes.func.isRequired,
  setBreakMinutes: PropTypes.func.isRequired,
  setBreakSeconds: PropTypes.func.isRequired,
}

const styles = StyleSheet.create({
    view: {
      backgroundColor: '#fff'
    },
    container: {
      flex: 1,
      backgroundColor: '#00ffff',
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 50,
      margin: 80,
      padding: 30,
    },
    headingContainer: {
      justifyContent: 'center',
      alignItems: 'center',
      padding: 30,
    },
    heading: {
      fontWeight: 700,
      fontFamily: 'monospace',
      fontSize: 40,
    },
    header: {
      fontSize: 50,
      fontWeight: 700
    },
    text: {
      fontSize: 40,
    },
    label: {
      fontSize: 16
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
  
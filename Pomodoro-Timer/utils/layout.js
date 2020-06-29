import React from 'react';
import {StyleSheet, Text, View, Button } from 'react-native';

export const Layout = props => {
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
      </View>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#00ffff',
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
    }
});
  
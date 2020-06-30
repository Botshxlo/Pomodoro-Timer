import React, { Component} from 'react';
import { Layout, Change } from './utils/layout.js'
import {Vibration} from 'react-native'

export default class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      showButton: true,
      time: {
        minutes: '25',
        seconds: '00',
      },
      work: {
        minutes: '',
        seconds: '',
      },
      break: {
        minutes: '',
        seconds: '',
      }
    }
  }

  onChangeWorkMinsSeconds = () => {
    const { 
      workMinuteValue, 
      workSecondsValue, 
    } = Change()

    this.setState(prevState => ({
      time: {
        minutes: prevState.time.minutes + 1,
        seconds: prevState.time.seconds + 1,
      }
    }))
  }

  incr = () => {
    if (this.state.time.minutes === 0 && this.state.time.seconds === 0) {
      this.vibrate()
    }

    if (this.state.time.seconds === '00') {
      this.setState(prevState => ({
        time: {
          minutes: `${prevState.time.minutes - 1}`,
          seconds: `${60}`,
        }
      }))
    }

    this.setState(prevState => ({
      time: {
        minutes: prevState.time.minutes < 10 ? `0${prevState.time.minutes-1+1}` : `${prevState.time.minutes}`,
        seconds: prevState.time.seconds < 10 ? `0${prevState.time.seconds - 1}` : `${prevState.time.seconds - 1}`,
      }
    }))
    
  }

  changeCount = () => {
    this.interval = setInterval(this.incr, 1000)
  }

  // onChange function toggles between start and stop button
  onChange = () => {
    this.setState(prevState => ({
      showButton: !prevState.showButton
    }))
  }


  // link two functionalities to one button
  changeCountFlipButton = () => {
    this.changeCount()
    this.onChange()
  }

  // stop the timer { by chaning state } and flip the button to { start }
  stopTimer = () => {
    clearInterval(this.interval)
    this.setState(prevState => ({
      time: prevState.time,
      showButton: !prevState.showButton
    }))
  }

  // reset the time {by changing the state} and the change the button to {start}
  reset = () => {
    clearInterval(this.interval)
    this.setState(() => ({
      time: {
        minutes: 24,
        seconds: 59,
      },
      showButton: true,
    }))
  }


  render() {
    if (this.state.showButton) { // true {show start button}
      return (
        <Layout 
          resetFunction={this.reset} 
          button={'start'} 
          changeFunction={this.onChangeWorkMinsSeconds}
          // for a start button
          // pass in a function that will start the timer or resume the current time
          function={this.changeCountFlipButton}
          time={this.state.time.minutes + ":" + this.state.time.seconds} 
        />
      )
    } else { // false {show stop button}
      return (
        <Layout
          resetFunction={this.reset} 
          button={'stop'} 
          changeFunction={this.onChangeWorkMinsSeconds}
          // for a stop button
          // pass in a function that will stop the timer and flip the button to { start }
          function={this.stopTimer}
          time={this.state.time.minutes + ":" + this.state.time.seconds} 
        />
      )
    }
  }
}



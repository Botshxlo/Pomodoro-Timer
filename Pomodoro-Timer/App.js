import React, { Component} from 'react';
import { Layout } from './utils/layout.js'
import {Vibration} from 'react-native'


export default class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      count: {
        minutes: 24,
        seconds: 59,
      },
      showButton: true,
    }
  }

  vibrate = () => {
    Vibration.vibrate([500, 500, 500])
  }

  incr = () => {
    if (this.state.count.minutes === 0 && this.state.count.seconds === 0) {
      this.vibrate()
    }

    if (this.state.count.seconds === 0) {
      this.setState(prevState => ({
        count: {
          minutes: prevState.count.minutes - 1,
          seconds: 60,
        }
      }))
    }

    this.setState(prevState => ({
      count: {
        minutes: prevState.count.minutes,
        seconds: prevState.count.seconds - 1,
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
      count: prevState.count,
      showButton: !prevState.showButton
    }))
  }

  // reset the time {by changing the state} and the change the button to {start}
  reset = () => {
    clearInterval(this.interval)
    this.setState(() => ({
      count: {
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
          // for a start button
          // pass in a function that will start the timer or resume the current time
          function={this.changeCountFlipButton}
          time={this.state.count.minutes + ":" + this.state.count.seconds} 
        />
      )
    } else { // false {show stop button}
      return (
        <Layout
          resetFunction={this.reset} 
          button={'stop'} 
          // for a stop button
          // pass in a function that will stop the timer and flip the button to { start }
          function={this.stopTimer}
          time={this.state.count.minutes + ":" + this.state.count.seconds} 
        />
      )
    }
  }
}



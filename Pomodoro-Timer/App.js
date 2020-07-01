import React, { Component} from 'react';
import { Layout } from './utils/layout.js'
import {Vibration} from 'react-native'

const vibrate = () => {
  Vibration.vibrate([500, 500, 500])
}

const characters = "!@#$%^&*()_+{}:><?qwertyuiop[]'/.;l,mkjnhbgvfcdxsza "

export default class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      showButton: true,
      breakTime: false,
      title: 'WORK TIMER',
      work: {
        minutes: '25',
        seconds: '00',
      },
      break: {
        minutes: '05',
        seconds: '00',
      }
    }
  }

  // function to set the state of the work minutes
  setWorkMinutesValue = value => {
    if (!(value < 0 || value > 60)) {
      clearInterval(this.interval)
      this.setState(prevState => ({
        showButton: true,
        work: {
          minutes: value < 10 ? `0${value}` : `${value}`,
          seconds: `${prevState.work.seconds}`,
        }
      }))
    }
  }

  // function to set the state of the work seconds
  setWorkSecondsValue = value => {
    if (!(value < 0 || value > 60)) {
      clearInterval(this.interval)
      this.setState(prevState => ({
        showButton: true,
        work: {
          minutes: `${prevState.work.minutes}`,
          seconds: value < 10 ? `0${value}` : `${value}`,
        }
      }))
    }
  }

  // function to set the state of the break minutes
  setBreakMinutesValue = value => {
    if (!(value < 0 || value > 60)) {
      clearInterval(this.interval)
      this.setState(prevState => ({
        showButton: true,
        break: {
          minutes: value < 10 ? `0${value}` : `${value}`,
          seconds: `${prevState.break.seconds}`,
        }
      }))
    }
  }

  // function to set the state of the break seconds
  setBreakSecondsValue = value => {
    if (!(value < 0 || value > 60)) {
      clearInterval(this.interval)
      this.setState(prevState => ({
        showButton: true,
        break: {
          minutes: `${prevState.break.minutes}`,
          seconds: value < 10 ? `0${value}` : `${value}`,
        }
      }))
    }
  }

  
  // set the state / change the timer based on the seconds given
  incr = () => {

    // toggle the timer mode between (BREAK TIMER && WORK TIMER) once clock hist 00 {status: ok}
    if ((this.state.work.minutes === '00' && this.state.work.seconds === '00') || (this.state.break.minutes == '00' && this.state.break.seconds == '00')) {
      vibrate()
      // clearInterval(this.interval)
      if (this.state.title === 'BREAK TIMER') {
        this.setState(prevState => (
          {
          break: true,
          showButton: false,
          title: 'WORK TIMER',
          break: {
            minutes: '05',
            seconds: '00'
          },
          work: {
            minutes: `${prevState.work.minutes}`,
            seconds: `${prevState.work.seconds}`,
          }
        }))

      } else {
        this.setState(prevState => ({
          break: false,
          showButton: false,
          title: 'BREAK TIMER',
          work: {
            minutes: '25',
            seconds: '00'
          },
          break: {
            minutes: `${prevState.break.minutes}`,
            seconds: `${prevState.break.seconds}`,
          }
        }))
      }
    }

    if (this.state.title === 'WORK TIMER') {  // change the work times once in WORK TIMER mode {status: ok}
      // clearInterval(this.interval)
      if (this.state.work.seconds === '00') {
        this.setState(prevState => ({
          work: {
            minutes: `${prevState.work.minutes - 1}`,
            seconds: `${60}`,
          }
        }))
      }
  
      this.setState(prevState => ({
        work: {
          minutes: prevState.work.minutes < 11 ? `0${prevState.work.minutes-1+1}` : `${prevState.work.minutes}`,
          seconds: prevState.work.seconds < 11 ? `0${prevState.work.seconds - 1}` : `${prevState.work.seconds - 1}`,
        }
      }))
    } else {  // change the work times once in BREAK TIMER mode {status: !ok}
      // clearInterval(this.interval)
      if (this.state.break.seconds === '00') {
        this.setState(prevState => ({
          break: {
            minutes: `${prevState.break.minutes - 1}`,
            seconds: `${60}`,
          }
        }))
      }
  
      this.setState(prevState => ({
        break: {
          minutes: prevState.break.minutes < 11 ? `0${prevState.break.minutes-1+1}` : `${prevState.break.minutes}`,
          seconds: prevState.break.seconds < 11 ? `0${prevState.break.seconds - 1}` : `${prevState.break.seconds - 1}`,
        }
      }))
    }
  }
  
  // run the incr function every second
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
      // work: {
      //   minutes: `${prevState.work.minutes}`,
      //   seconds: `${prevState.work.seconds}`,
      // },
      showButton: !prevState.showButton
    }))
  }

  // reset the time {by changing the state} and the change the button to {start}
  reset = () => {
    clearInterval(this.interval)
    this.setState(() => ({
      showButton: true,
      work: {
        minutes: '25',
        seconds: '00',
      },
      break: {
        minutes: '05',
        seconds: '00'
      }
    }))
  }


  render() {
    if (this.state.title === 'WORK TIMER') { // {status: ok}
      if (this.state.showButton) { // true {show start button}
        return (
          <Layout 
            resetFunction={this.reset} 
            button={'start'} 
            setWorkMinutes={this.setWorkMinutesValue}
            setWorkSeconds={this.setWorkSecondsValue}
            setBreakMinutes={this.setBreakMinutesValue}
            setBreakSeconds={this.setBreakSecondsValue}
            title={this.state.title}
            // for a start button
            // pass in a function that will start the timer or resume the current time
            function={this.changeCountFlipButton}
            time={this.state.work.minutes + ":" + this.state.work.seconds} 
          />
        )
      } else { // false {show stop button}
          return (
            <Layout
              resetFunction={this.reset} 
              button={'stop'} 
              setWorkMinutes={this.setWorkMinutesValue}
              setWorkSeconds={this.setWorkSecondsValue}
              setBreakMinutes={this.setBreakMinutesValue}
              setBreakSeconds={this.setBreakSecondsValue}
              title={this.state.title}
              // for a stop button
              // pass in a function that will stop the timer and flip the button to { start }
              function={this.stopTimer}
              time={this.state.work.minutes + ":" + this.state.work.seconds} 
            />
          )
        }
    } else if (this.state.title === 'BREAK TIMER') { // {status: !ok}
        if (this.state.showButton) { // true {show start button}
          return (
            <Layout 
              resetFunction={this.reset} 
              button={'start'} 
              setWorkMinutes={this.setWorkMinutesValue}
              setWorkSeconds={this.setWorkSecondsValue}
              setBreakMinutes={this.setBreakMinutesValue}
              setBreakSeconds={this.setBreakSecondsValue}
              title={this.state.title}
              // for a start button
              // pass in a function that will start the timer or resume the current time
              function={this.changeCountFlipButton}
              time={this.state.break.minutes + ":" + this.state.break.seconds} 
            />
          )
        } else { // false {show stop button}
            return (
              <Layout
                resetFunction={this.reset} 
                button={'stop'} 
                setWorkMinutes={this.setWorkMinutesValue}
                setWorkSeconds={this.setWorkSecondsValue}
                setBreakMinutes={this.setBreakMinutesValue}
                setBreakSeconds={this.setBreakSecondsValue}
                title={this.state.title}
                // for a stop button
                // pass in a function that will stop the timer and flip the button to { start }
                function={this.stopTimer}
                time={this.state.break.minutes + ":" + this.state.break.seconds} 
              />
            )
          }
      }
  }
}



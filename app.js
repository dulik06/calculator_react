import React from 'react'
import ReactDOM from 'react-dom'
import './styles.css'

class Calculator extends React.Component {
  constructor(props) {
    super(props);
    this.state = {displayValue: '0', waitingForValue: false, operator: null}
  }

  handleValue(digit) {
    const {waitingForValue} = this.state;
    if(waitingForValue) {
      this.setState({displayValue: String(digit), waitingForValue: false});
    } else {
      this.setState({displayValue: this.state.displayValue === '0' ? '' + digit : this.state.displayValue + '' + digit})
    }
  }

  handleClear(){
    this.setState({displayValue: '0'})
  }

  handleSing(){
    this.setState({displayValue: this.state.displayValue.charAt(0) === '-' ? this.state.displayValue.substr(1) : '-' + this.state.displayValue })
  }

  handlePercent(){
    const value = parseFloat(this.state.displayValue)
    this.setState({displayValue: String(value/100)})
  }

  handleOperation(operator){
    this.setState({waitingForValue: true, operator: operator})
  }

  handleDot(){
    if(this.state.waitingForValue) {
      this.setState({displayValue: '.', waitingForValue: false})
    }
    else if(this.state.displayValue.indexOf('.') === -1) {
      this.setState({displayValue:this.state.displayValue + '.' , waitingForValue: false})
    }

  }
  render() {
    return (
      <div className="calculator">
        <div className="calculator-display">{this.state.displayValue}</div>
        <div className="calculator-keypad">
          <div className="input-keys">
            <div className="function-keys">
              <button className="calculator-key key-clear" onClick={() => this.handleClear()}>AC</button>
              <button className="calculator-key key-sign" onClick={() => this.handleSing()}>±</button>
              <button className="calculator-key key-percent" onClick={() => this.handlePercent()}>%</button>
            </div>
            <div className="digit-keys">
              <button className="calculator-key key-0" onClick={() => this.handleValue(0)}>0</button>
              <button className="calculator-key key-dot" onClick={() => this.handleDot()}>●</button>
              <button className="calculator-key key-1" onClick={() => this.handleValue(1)}>1</button>
              <button className="calculator-key key-2" onClick={() => this.handleValue(2)}>2</button>
              <button className="calculator-key key-3" onClick={() => this.handleValue(3)}>3</button>
              <button className="calculator-key key-4" onClick={() => this.handleValue(4)}>4</button>
              <button className="calculator-key key-5" onClick={() => this.handleValue(5)}>5</button>
              <button className="calculator-key key-6" onClick={() => this.handleValue(6)}>6</button>
              <button className="calculator-key key-7" onClick={() => this.handleValue(7)}>7</button>
              <button className="calculator-key key-8" onClick={() => this.handleValue(8)}>8</button>
              <button className="calculator-key key-9" onClick={() => this.handleValue(9)}>9</button>
            </div>
          </div>
          <div className="operator-keys">
            <button className="calculator-key key-divide" onClick={() => this.handleOperation('/')}>÷</button>
            <button className="calculator-key key-multiply" onClick={() => this.handleOperation('*')}>×</button>
            <button className="calculator-key key-subtract" onClick={() => this.handleOperation('-')}>−</button>
            <button className="calculator-key key-add" onClick={() => this.handleOperation('+')}>+</button>
            <button className="calculator-key key-equals" onClick={() => this.handleOperation('=')}>=</button>
          </div>
        </div>
      </div>
    )
  }
}

ReactDOM.render(
  <div id="wrapper">
    <Calculator/>
  </div>,
  document.getElementById('app')
);
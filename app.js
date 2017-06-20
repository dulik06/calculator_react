import React from 'react'
import ReactDOM from 'react-dom'
import './styles.css'

class AutoTextShrinking extends React.Component {
  constructor(props) {
    super(props);
    this.state = {scale: 1}
  }

  componentDidUpdate(){
    const { scale } = this.state;

    const node = this.node;
    const parentNode = node.parentNode;

    const availableWidth = parentNode.offsetWidth;
    const actualWidth = node.offsetWidth;
    const actualScale = availableWidth / actualWidth;

    if (scale === actualScale)
      return

    if (actualScale < 1) {
      this.setState({ scale: actualScale })
    } else if (scale < 1) {
      this.setState({ scale: 1 })
    }



  }
  render(){
    const {scale} = this.state;
    return(
      <div
        className="auto-scaling-text"
        style={{ transform: `scale(${scale},${scale})` }}
        ref={node => this.node = node}
      >{this.props.children}</div>
    )
  }
}

class Calculator extends React.Component {
  constructor(props) {
    super(props);
    this.state = {displayValue: '0', waitingForValue: false, operator: null, value: null}
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

  handleOperation(nextOperator){
    const nextValue = parseFloat(this.state.displayValue);

    const Operations ={
      '/': (prevValue, nextValue) => prevValue / nextValue,
      '*': (prevValue, nextValue) => prevValue * nextValue,
      '+': (prevValue, nextValue) => prevValue + nextValue,
      '-': (prevValue, nextValue) => prevValue - nextValue,
      '=': (prevValue, nextValue) => nextValue
    };

    if(this.state.value == null) { //if i didnt have  a previous value
      this.setState({value: nextValue})
    } else if(this.state.operator) {
      const currentValue = this.state.value || 0;
      const computedValue = Operations[this.state.operator](currentValue, nextValue);

      this.setState({
        value: computedValue,
        displayValue: String(computedValue)
      })
    }

    this.setState({waitingForValue: true, operator: nextOperator})
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
        <div className="calculator-display">
          <AutoTextShrinking>{this.state.displayValue}</AutoTextShrinking>
        </div>
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
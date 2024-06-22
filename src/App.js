import React, { Component } from "react";
import Button from "./components/Button";

class App extends Component {

  constructor(props) {
    super(props);

    this.state ={
      current: '0',
      previous: [],
      isZero: true,
      isDecimal: false,
      prevIsSymbol: false
    };
    
  }

  reset = () =>{
    this.setState({
      current: '0',
      previous: [],
      isZero:true,
      isDecimal: false,
      prevIsSymbol: false
    });
  }

  addToCurrent = (newNumber) =>{
    if(this.state.isZero && !this.state.isDecimal && newNumber !== "."){
      this.setState({
        current: String(newNumber),
        isZero: false
      });
    }else if (this.state.isDecimal && newNumber === "."){

    }else {
      this.setState({
        current: this.state.current + newNumber
      });
      if(newNumber === "."){
        this.setState({
          isDecimal:true
        });
      }
    }
  }
  addSymToCurrent = (newNumber) =>{
    if(this.state.prevIsSymbol && this.state.previous.length > 0){
      console.debug(this.state.previous.length);
      this.state.previous[this.state.previous.length-1] = newNumber;
      this.setState({
        previous: this.state.previous
      });
    }else{
      this.setState({
          previous: this.state.current + newNumber,
          current: String(this.state.previous),
          isZero: true,
          isDecimal: false,
          prevIsSymbol: true
        });
    }
  }

  evalEquation=() =>{
    this.setState({
      current: eval(String(this.state.previous + this.state.current)),
      previous: [],
      isZero: true,
      isDecimal: false,
      prevIsSymbol: false
    });
  }

  render(){
    const buttons = [
      {symbol:'C', cols: 3, action: this.reset},
      {symbol:'/', cols: 1, action: this.addSymToCurrent},
      {symbol:'7', cols: 1, action: this.addToCurrent}, 
      {symbol:'8', cols: 1, action: this.addToCurrent}, 
      {symbol:'9', cols: 1, action: this.addToCurrent}, 
      {symbol:'*', cols: 1, action: this.addSymToCurrent}, 
      {symbol:'4', cols: 1, action: this.addToCurrent}, 
      {symbol:'5', cols: 1, action: this.addToCurrent}, 
      {symbol:'6', cols: 1, action: this.addToCurrent}, 
      {symbol:'-', cols: 1, action: this.addSymToCurrent}, 
      {symbol:'1', cols: 1, action: this.addToCurrent}, 
      {symbol:'2', cols: 1, action: this.addToCurrent}, 
      {symbol:'3', cols: 1, action: this.addToCurrent},
      {symbol:'+', cols: 1, action: this.addSymToCurrent},
      {symbol:'.', cols: 1, action: this.addToCurrent},
      {symbol:'0', cols: 2, action: this.addToCurrent}, 
      {symbol:'=', cols: 1, action: this.evalEquation},       

    ];

    return (
      <div className="App">
        {this.state.previous.length > 0 ?
            <div className="floaty-last">{String(this.state.previous)}</div>
        : null }
        <input className="result" type="text" value={this.state.current}></input>
        {buttons.map((btn,i) => {
          return(
            <div>
              <Button key={i} symbol={btn.symbol} cols={btn.cols} action={(symbol) => btn.action(symbol)}></Button>
            </div>
          )
        })}
      </div>

    );
  }
}

export default App;

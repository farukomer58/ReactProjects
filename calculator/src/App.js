import { useState } from "react"
import './App.css';

function App() {

  const [operations, setOperations] = useState([])
  const [isLastOperation, setIsLastOperation] = useState(false)
  const [displayValue, setDisplayValue] = useState("")

  const [negative,setNegative] = useState(false)

  const Parser = require('expr-eval').Parser;


  const setClickedButton = (e, isNumber, isOperation) => {
    e.preventDefault()
    const value = e.target.value

    if (isNumber) {
      setDisplayValue(displayValue + value)
      setIsLastOperation(false)
    } else if (isOperation) {
      if (isLastOperation) {
        // Remove last operator char from displayvalue en replace with new operator
      } else {
        let operationValue = value

        // setOperation(operationValue)
        setDisplayValue(displayValue + operationValue)
        setIsLastOperation(true)

        setOperations(...operations, operationValue)
      }
    } else {
      if (value === "AC") {
        setDisplayValue("")
        setOperations([])
      }
      if (value === "+/-") {
        if(negative){
          setDisplayValue("-"+displayValue)
          setNegative(!negative)
        }else{
          try{
            setDisplayValue(displayValue.replace('-',''))
            setNegative(!negative)
          }catch(e){}
        }
        // setOperations([])
      }
    }
  }

  const calculate = (e) => {
    e.preventDefault()
    const value = e.target.value

    if (displayValue != "") {
      try {
        const parser = new Parser();
        let expression = parser.parse(displayValue);
        var result = expression.evaluate({ x: 3 });

        setDisplayValue(result)
        setOperations([])
      }catch(e){

      }
    }
  }

  return (
    <div className="calculator">
      <div className="calculator-body">
        <div className="calculator-head">
          {/* display result */}
          <h4>{displayValue}</h4>
        </div>
        <div className="calculator-row">
          <button onClick={(e) => setClickedButton(e, false, false)} value="AC">AC</button>
          <button onClick={(e) => setClickedButton(e, false, false)} value="+/-">+/-</button>
          <button onClick={(e) => setClickedButton(e, false, true)} value="%">%</button>
          <button onClick={(e) => setClickedButton(e, false, true)} value="/"><span style={{ fontSize: "1rem" }}>&divide;</span></button>
        </div>
        <div className="calculator-row">
          <button onClick={(e) => setClickedButton(e, true, false)} value="7">7</button>
          <button onClick={(e) => setClickedButton(e, true, false)} value="8">8</button>
          <button onClick={(e) => setClickedButton(e, true, false)} value="9">9</button>
          <button onClick={(e) => setClickedButton(e, false, true)} value="*">x</button>
        </div>
        <div className="calculator-row">
          <button onClick={(e) => setClickedButton(e, true, false)} value="4">4</button>
          <button onClick={(e) => setClickedButton(e, true, false)} value="5">5</button>
          <button onClick={(e) => setClickedButton(e, true, false)} value="6">6</button>
          <button onClick={(e) => setClickedButton(e, false, true)} value="-">-</button>
        </div>
        <div className="calculator-row">
          <button onClick={(e) => setClickedButton(e, true, false)} value="1">1</button>
          <button onClick={(e) => setClickedButton(e, true, false)} value="2">2</button>
          <button onClick={(e) => setClickedButton(e, true, false)} value="3">3</button>
          <button onClick={(e) => setClickedButton(e, false, true)} value="+">+</button>
        </div>
        <div className="calculator-row">
          <button onClick={(e) => setClickedButton(e, true, false)} value="0">0</button>
          <button onClick={(e) => setClickedButton(e, true, false)} value=".">.</button>
          <button onClick={(e) => calculate(e)} value="=">=</button>
        </div>

      </div>
    </div>
  );
}

export default App;

import React, {useState, useEffect, useRef} from "react"
import FlashCardList from "./FlashCardList"
import "./App.css"
import axios from "axios"

function App() {

  const [flashCards, setFlashCards] = useState([])
  const [categories, setCategories] = useState([])
  const [amount, setAmount] = useState(10)
  const categoryRef = useRef()
  const numberRef = useRef()

  useEffect(() => {
    fetch("https://opentdb.com/api_category.php")
      .then(response=>response.json())
      .then(response=> {
        setCategories(response.trivia_categories)
      })
  }, [])

  useEffect(()=> {
    fetch(`https://opentdb.com/api.php?amount=10`)
      .then(response=>response.json())
      .then(response=> {

          setFlashCards(response.results.map((item, index) => {
            const all_options = item.incorrect_answers.push(item.correct_answer)
            return {
              id: `index`,
              ques: decode(item.question),
              options: item.incorrect_answers,
              ans: item.correct_answer
            }
          }))
        }
      )
  }, [])

  function handleSubmit(e) {
    e.preventDefault();
    axios(`https://opentdb.com/api.php`, {
      params: {
        amount: numberRef.current.value,
        category: categoryRef.current.value
      }
    })
      .then(response=> {

          setFlashCards(response.data.results.map((item, index) => {
            const all_options = item.incorrect_answers.push(item.correct_answer)
            return {
              id: `index`,
              ques: decode(item.question),
              options: item.incorrect_answers,
              ans: item.correct_answer
            }
          }))
        }
      )
  }

  function handleChange(e) {
    setAmount(e.value)
  }


  return (
    <>
    <form className="header" onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="category">Category </label>
        <select id="category" ref={categoryRef}>
          {categories.map(category => {
            return <option value={category.id} key={category.id}>{category.name}</option>
          })}
        </select>
      </div>
      <div className="form-group">
        <label htmlFor="amount">Amount of Question </label>
        <input type="number" id="amount" defaultValue={10} value={amount} onChange={handleChange} ref={numberRef}></input>
      </div>
      <div className="form-group">
        <button className="btn">Generate</button>
      </div>
    </form>
      <div className="container">
        <FlashCardList flashCards={flashCards}></FlashCardList>
      </div>
    </>
  );
}


function decode(str) {
  const textArea = document.createElement("textarea")
  textArea.innerHTML = str
  return textArea.value
}


export default App;

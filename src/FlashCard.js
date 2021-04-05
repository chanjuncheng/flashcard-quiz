import React, {useState, useRef, useEffect} from "react"

function FlashCard({flashCard}) {

    const [isFlipped, setIsFlipped] = useState(false)
    const [height, setHeight] = useState(100)
    const frontEl = useRef()

    useEffect(() => {
        return setHeight(frontEl.current.getBoundingClientRect().height)
    }, [flashCard.ques, flashCard.options, flashCard.ans])



    return (
        <div className={`flashcard ${isFlipped ? "flashcard-flip" : ""}`}
            onClick={() => setIsFlipped(!isFlipped)}
            style={{height: height}}>

            <div className="flashcard-front" ref={frontEl}>

                {flashCard.ques}

                <div className="flashcard-options">
                    {flashCard.options.map( option => {
                        return <div className="flashcard-option">{option}</div>
                    })}
                </div>

            </div>

            <div className="flashcard-back">
                <br/>
                {flashCard.ans}
            </div>

        </div>
    )
}

export default FlashCard
import React from "react"
import FlashCard from "./FlashCard"

function FlashCardList({flashCards}) {
    
    return (
        <div className="flashcard-grid">
            {flashCards.map( flashCard => {
                return <FlashCard flashCard={flashCard} key={flashCard.id}></FlashCard>
            })}
        </div>
    )
}

export default FlashCardList
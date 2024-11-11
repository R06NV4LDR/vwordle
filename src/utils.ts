export function chooseRandomWord(wordLength: number): string {
// const worte = ["apfel", "blume", "birne", "fuchs", "regal", "tiger", "wolle", "zange"];
const words = ["apple", "crane", "ideal", "bonus", "crazy", "demon", "eagle", "fairy", "giant", "happy", "joker", "kitty", "laser", "magic", "noble", "opera", "piano", "queen", "radio", "sunny", "tiger", "unity", "vivid", "witty", "xerox", "yacht", "zebra", "angel", "beast", "candy", "daisy", "earth", "fable", "globe", "honey", "jelly", "karma", "lucky", "mango", "novel", "ocean", "panda", "quilt", "ruler", "sugar", "tulip", "umbra", "virus", "waltz", "xenon", "youth", "zesty"];
return words[Math.floor(Math.random() * words.length)].toUpperCase();
}

// Example of what the validateGuess function might look like
export function validateGuess(wordToGuess: string, guess: string): string[] {
    let feedback = Array(guess.length).fill("gray");

    // Mark letters that are in the correct position (green)
    for (let i = 0; i < guess.length; i++) {
        if (guess[i] === wordToGuess[i]) {
            feedback[i] = "green";
        }
    }

    // Mark letters that are in the word but wrong position (yellow)
    for (let i = 0; i < guess.length; i++) {
        if (feedback[i] === "gray" && wordToGuess.includes(guess[i])) {
            feedback[i] = "yellow";
        }
    }

    return feedback;
}



// export function validateGuess(wordToGuess: string, guess: string): string[] {
//  const feedback: string[] = [];
//  for (let i = 0; i < wordToGuess.length; i++) {
//      if (wordToGuess[i] === guess[i]) {
//          feedback.push("green");
//      } else if (wordToGuess.includes(guess[i])) {
//          feedback.push("white");
//      } else {
//          feedback.push(" ");
//      }
//  }
//  return feedback;
// }
import {chooseRandomWord, validateGuess} from "./utils";
import * as readline from "readline";
import chalk from "chalk"; // Ensure chalk is imported for coloring

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

export class Game {
    private wordToGuess: string;
    private maxAttempts: number = 6;
    private attempts: string[] = [];
    private wordLength: number = 5;
    private winCount: number = 0;

    constructor() {
        this.wordToGuess = chooseRandomWord(this.wordLength);
    }

    start() {
        console.log("Welcome to the game! Try to guess the word!");
        this.play();
    }

    private async play() {
        let gameWon = false;
        while (this.attempts.length < this.maxAttempts) {
            const guess = await this.askForGuess();
            if (guess && guess.length === this.wordLength) {
                this.attempts.push(guess);
                const feedback = validateGuess(this.wordToGuess, guess);

                // Log the feedback for debugging
                //  console.log("Feedback array:", feedback);  // Debugging line

                console.log(`Feedback: ${this.colorizeFeedback(guess, feedback)}`);

                if (guess === this.wordToGuess) {
                    console.log(chalk.green("Congratulations! You won!"));
                    gameWon = true;
                    break;
                }
            } else {
                console.log(chalk.red("Invalid input. Please enter a word with 5 characters."));
            }
        }
        if (gameWon) {
            //if (this.attempts.length === this.maxAttempts && this.wordToGuess !== this.attempts[this.attempts.length - 1]) {
            this.winCount++;
            console.log(chalk.green(`You have won ${this.winCount} games!`));
        } else {
            console.log(chalk.red(`You lost! The word was: ${this.wordToGuess}`));
        }

        rl.question("Do you want to play another game? (yes/no): ", (answer) => {
            const lowerCaseAnswer = answer.toLowerCase();
            if (lowerCaseAnswer === "yes" || lowerCaseAnswer === "y") {
                console.log("Starting a new game...");
                this.resetGame();
                this.start();  // Restart the game loop
            } else if (lowerCaseAnswer === "no" || lowerCaseAnswer === "n") {
                console.log("Thanks for playing!");
                rl.close();  // Close the readline interface
            } else {
                console.log(chalk.red("Invalid input. Please type 'yes' or 'no'."));
                this.play();  // Re-run the play loop to ask again
            }
        });
    }

    // Colorize the feedback letters
    private colorizeFeedback(guess: string, feedback: string[]): string {
        let colorizedFeedback = "";

        // Iterate over each letter of the guess and color it based on feedback
        for (let i = 0; i < guess.length; i++) {
            const letter = guess[i];
            const color = feedback[i]; // Assuming feedback is an array of strings like "green", "yellow", "gray"

            switch (color) {
                case "green":
                    colorizedFeedback += chalk.green(letter);
                    break;
                case "yellow":
                    colorizedFeedback += chalk.yellow(letter);
                    break;
                case "gray":
                    colorizedFeedback += chalk.gray(letter);
                    break;
                default:
                    colorizedFeedback += chalk.white(letter); // Default color for non-colored letters
                    break;
            }
        }

        return colorizedFeedback;
    }

    private askForGuess(): Promise<string> {
        return new Promise((resolve) => {
            rl.question("Enter your guess: ", (answer) => {
                resolve(answer.toUpperCase());
            });
        });
    }

    private resetGame(): void {
        this.attempts = [];
        this.wordToGuess = chooseRandomWord(this.wordLength);
    }
}


// import {chooseRandomWord, validateGuess} from "./utils";
// import * as readline from "readline";
// import chalk from "chalk";
//
// const rl = readline.createInterface({
//     input: process.stdin,
//     output: process.stdout
// });
//
// export class Game {
//     private wordToGuess: string;
//     private maxAttempts: number = 6;
//     private attempts: string[] = [];
//     private wordLength: number = 5;
//
//     constructor() {
//         this.wordToGuess = chooseRandomWord(this.wordLength);
//     }
//
//     start() {
//         console.log("Welcome to the game! Try to guess the word!");
//         this.play();
//     }
//
//     private async play() {
//         while (this.attempts.length < this.maxAttempts) {
//             const guess = await this.askForGuess();
//             if (guess && guess.length === this.wordLength) {
//                 this.attempts.push(guess);
//
//                 const feedback = validateGuess(this.wordToGuess, guess);
//                 console.log(`Feedback: ${this.colorizeFeedback(guess, feedback)}`);
//
//                 if (guess === this.wordToGuess) {
//                     console.log(chalk.green("Congratulations! You won!"));
//                     rl.close();
//                     return;
//                 }
//             } else {
//                 console.log(chalk.red("Invalid input. Please enter a word with 5 characters."));
//             }
//         }
//         console.log(chalk.red("You lost! The word was: " + this.wordToGuess));
//         rl.question("Do you want to play another game? (yes/no): ", (answer) => {
//             if (answer.toLowerCase() === "yes") {
//                 console.log("Starting a new game...");
//                 this.resetGame();
//                 this.start();  // Restart the game loop
//             } else {
//                 console.log("Thanks for playing!");
//                 rl.close();  // Close the readline interface
//             }
//         });
//     }
//
//     private colorizeFeedback(guess: string, feedback: string[]): string {
//         let colorizedFeedback = "";
//
//         for (let i = 0; i < guess.length; i++) {
// const letter = guess[i];
// const color = feedback[i];
//
//         // return feedback.map((color) => {
//             switch (color) {
//                 case "green":
//                     colorizedFeedback += chalk.green(letter);
//                     break;
//                 case "yellow":
//                     colorizedFeedback += chalk.yellow(letter);
//                     break;
//
//                 case "gray":
//                     colorizedFeedback += chalk.gray(letter);
//                     break;
//                 default:
//                     colorizedFeedback +=  chalk.white(letter);
//                     break;
//             }
//         }
//         return colorizedFeedback;
//     }
//
//     private askForGuess(): Promise<string> {
//         return new Promise((resolve) => {
//             rl.question("Enter your guess: ", (answer) => {
//                 resolve(answer.toUpperCase());
//             });
//         });
//     }
//
//     private resetGame(): void {
//         this.attempts = [];
//         this.wordToGuess = chooseRandomWord(this.wordLength);
//     }
// }
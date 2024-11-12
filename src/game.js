"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Game = void 0;
const utils_1 = require("./utils");
const readline = __importStar(require("readline"));
const chalk_1 = __importDefault(require("chalk")); // Ensure chalk is imported for coloring
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});
class Game {
    constructor() {
        this.maxAttempts = 6;
        this.attempts = [];
        this.wordLength = 5;
        this.gameCount = 0;
        this.winCount = 0;
        this._guessedLetters = new Map();
        this.wordToGuess = (0, utils_1.chooseRandomWord)(this.wordLength);
    }
    start() {
        console.log("Welcome to the game! Try to guess the word!");
        this.play();
    }
    play() {
        return __awaiter(this, void 0, void 0, function* () {
            this.gameCount++;
            let gameWon = false;
            while (this.attempts.length < this.maxAttempts) {
                console.log(this.renderKeyboard());
                const guess = yield this.askForGuess();
                if (guess && guess.length === this.wordLength) {
                    this.attempts.push(guess);
                    this.updateGuessedLetters(guess);
                    const feedback = (0, utils_1.validateGuess)(this.wordToGuess, guess);
                    // Log the feedback for debugging
                    //  console.log("Feedback array:", feedback);  // Debugging line
                    console.log(`Feedback: ${this.colorizeFeedback(guess, feedback)}`);
                    console.log(`Guessed letters: ${Array.from(this._guessedLetters).join(", ")}`);
                    if (guess === this.wordToGuess) {
                        console.log(chalk_1.default.green("Congratulations! You won!"));
                        gameWon = true;
                        break;
                    }
                }
                else {
                    console.log(chalk_1.default.red("Invalid input. Please enter a word with 5 characters."));
                }
            }
            if (gameWon) {
                //if (this.attempts.length === this.maxAttempts && this.wordToGuess !== this.attempts[this.attempts.length - 1]) {
                this.winCount++;
                console.log(chalk_1.default.green(`You have won ${this.winCount} games!`));
            }
            else {
                console.log(chalk_1.default.red(`You lost! The word was: ${this.wordToGuess}`));
            }
            rl.question("Do you want to play another game? (yes/no): ", (answer) => {
                const lowerCaseAnswer = answer.toLowerCase();
                if (lowerCaseAnswer === "yes" || lowerCaseAnswer === "y") {
                    console.log("Starting a new game...");
                    this.resetGame();
                    this.start(); // Restart the game loop
                }
                else if (lowerCaseAnswer === "no" || lowerCaseAnswer === "n") {
                    console.log("Thanks for playing!");
                    rl.close(); // Close the readline interface
                }
                else {
                    console.log(chalk_1.default.red("Invalid input. Please type 'yes' or 'no'."));
                    this.play(); // Re-run the play loop to ask again
                }
            });
        });
    }
    updateGuessedLetters(guess) {
        const feedback = (0, utils_1.validateGuess)(this.wordToGuess, guess);
        for (let i = 0; i < guess.length; i++) {
            this._guessedLetters.set(guess[i], feedback[i]);
        }
    }
    get guessedLetters() {
        return this._guessedLetters;
    }
    set guessedLetters(letters) {
        this._guessedLetters = letters;
    }
    // Colorize the feedback letters
    colorizeFeedback(guess, feedback) {
        let colorizedFeedback = "";
        // Iterate over each letter of the guess and color it based on feedback
        for (let i = 0; i < guess.length; i++) {
            const letter = guess[i];
            const color = feedback[i]; // Assuming feedback is an array of strings like "green", "yellow", "gray"
            switch (color) {
                case "green":
                    colorizedFeedback += chalk_1.default.green(letter);
                    break;
                case "yellow":
                    colorizedFeedback += chalk_1.default.yellow(letter);
                    break;
                case "gray":
                    colorizedFeedback += chalk_1.default.gray(letter);
                    break;
                default:
                    colorizedFeedback += chalk_1.default.white(letter); // Default color for non-colored letters
                    break;
            }
        }
        return colorizedFeedback;
    }
    renderKeyboard() {
        const rows = [
            "QWERTZUIOP",
            " ASDFGHJKL",
            "  YXCVBNM"
        ];
        let keyboard = "\n";
        for (const row of rows) {
            for (const letter of row) {
                const color = this._guessedLetters.get(letter) || "white";
                switch (color) {
                    case "green":
                        keyboard += chalk_1.default.green(letter) + " ";
                        break;
                    case "yellow":
                        keyboard += chalk_1.default.yellow(letter) + " ";
                        break;
                    case "gray":
                        keyboard += chalk_1.default.black(letter) + " ";
                        break;
                    default:
                        keyboard += chalk_1.default.white(letter) + " ";
                        break;
                }
            }
            keyboard += "\n";
        }
        return keyboard;
    }
    askForGuess() {
        return new Promise((resolve) => {
            rl.question("Enter your guess: ", (answer) => {
                resolve(answer.toUpperCase());
            });
        });
    }
    resetGame() {
        this.attempts = [];
        this.wordToGuess = (0, utils_1.chooseRandomWord)(this.wordLength);
        this._guessedLetters.clear();
    }
}
exports.Game = Game;
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

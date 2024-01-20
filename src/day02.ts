import { readData } from "./utils";

type Draw = {
    red: number,
    green: number,
    blue: number,
}

type Game = {
    round: number,
    draws: Draw[],
};

export function extractGameRound(input: string): number {
    const match = input.match("Game ([0-9]+)");
    if (match === null) {
        throw new Error("invalid input");
    }
    return parseInt(match[1]);
}

export function extractSingleCube (color: string, input: string): number {
    const regex = `([0-9]+ ${color})`;
    const match = input.match(regex);
    return (match === null) ? 0 : parseInt(match[1]);
}

export function extractDraw(input: string): Draw {
    return {
        red: extractSingleCube("red", input),
        green: extractSingleCube("green", input),
        blue: extractSingleCube("blue", input),
    }
}

export function readGame (input: string): Game {
    const split_game = input.split(":")
    const split_draw = split_game[1].split(";");

    return {
        round: extractGameRound(split_game[0]),
        draws: split_draw.map((draw) => extractDraw(draw))
    }
}

export function isValidGame(game: Game, max_colors: Draw): boolean {
    for (const draw of game.draws) {
        if (draw.red > max_colors.red || draw.green > max_colors.green || draw.blue > max_colors.blue) {
            return false;
        }
    }
    return true;
}

export function day02 () {
    const data = readData("src/data/day02.txt");
    const games = data.map((line) => readGame(line));
    const max_colors: Draw = {
        red: 12,
        green: 13,
        blue: 14,
    }
    const valid_games = games.filter((game) => isValidGame(game, max_colors));
    const game_sum = valid_games.reduce((acc, game) => acc + game.round, 0);
    console.log(`The sum of game IDs is: ${game_sum}`);
}

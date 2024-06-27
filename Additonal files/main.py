# -*- coding: utf-8 -*-
"""
Created on Thu Jun 27 07:11:27 2024

@author: S340-2RIN
"""

from game import AntiChessGame

def main():
    game = AntiChessGame()

    while not game.game_over:
        print(f"\n{game.current_player}'s turn")
        game.draw_board()
        move = input("Enter your move (e.g., e2 e4) or type 'quit' to quit: ")

        if move.lower() == 'quit':
            winner = game.quit_game()
            print(f"{winner} wins by resignation!")
            break

        if game.validate_move(move):
            game.make_move(move)
            winner = game.check_winner()
            if winner:
                print(f"{winner} wins the game!")
                game.game_over = True
            else:
                game.switch_player()
        else:
            print("Invalid move. Try again.")

if __name__ == "__main__":
    main()

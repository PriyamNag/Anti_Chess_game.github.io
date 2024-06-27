# -*- coding: utf-8 -*-
"""
Created on Thu Jun 27 07:09:47 2024

@author: S340-2RIN
"""

class AntiChessGame:
    def __init__(self):
        self.board = [
            ['r', 'n', 'b', 'q', 'k', 'b', 'n', 'r'],
            ['p', 'p', 'p', 'p', 'p', 'p', 'p', 'p'],
            ['', '', '', '', '', '', '', ''],
            ['', '', '', '', '', '', '', ''],
            ['', '', '', '', '', '', '', ''],
            ['', '', '', '', '', '', '', ''],
            ['P', 'P', 'P', 'P', 'P', 'P', 'P', 'P'],
            ['R', 'N', 'B', 'Q', 'K', 'B', 'N', 'R']
        ]
        self.current_player = 'Player 1'
        self.game_over = False

    def draw_board(self):
        for row in self.board:
            print(' '.join(piece if piece else '.' for piece in row))

    def validate_move(self, move):
        try:
            from_pos, to_pos = move.split()
            from_row, from_col = 8 - int(from_pos[1]), ord(from_pos[0]) - ord('a')
            to_row, to_col = 8 - int(to_pos[1]), ord(to_pos[0]) - ord('a')
            if self.board[from_row][from_col] and not self.board[to_row][to_col]:
                return True
        except Exception as e:
            print(f"Error validating move: {e}")
        return False

    def make_move(self, move):
        from_pos, to_pos = move.split()
        from_row, from_col = 8 - int(from_pos[1]), ord(from_pos[0]) - ord('a')
        to_row, to_col = 8 - int(to_pos[1]), ord(to_pos[0]) - ord('a')
        self.board[to_row][to_col] = self.board[from_row][from_col]
        self.board[from_row][from_col] = ''

    def check_winner(self):
        pieces_left = sum(1 for row in self.board for piece in row if piece)
        if pieces_left <= 2:
            self.game_over = True
            return self.current_player == 'Player 1' and 'Player 2' or 'Player 1'
        return None

    def quit_game(self):
        self.game_over = True
        return self.current_player == 'Player 1' and 'Player 2' or 'Player 1'

    def switch_player(self):
        self.current_player = 'Player 1' if self.current_player == 'Player 2' else 'Player 2'

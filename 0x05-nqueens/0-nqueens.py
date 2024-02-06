#!/usr/bin/python3
import sys

def is_valid(queens, row, col):
    """Checks if placing a queen in the given position is valid."""
    for i in range(len(queens)):
        if queens[i][0] == row or abs(queens[i][0] - row) == abs(queens[i][1] - col):
            return False
    return True

def solve_n_queens(n, queens=[], row=0):
    """Solves the N-Queens problem recursively."""
    if row == n:
        print(queens)
        return
    for col in range(n):
        if is_valid(queens, row, col):
            queens.append([row, col])
            solve_n_queens(n, queens, row + 1)
            queens.pop()

def main():
    """Gets the input and calls the solver."""
    if len(sys.argv) != 2:
        print("Usage: nqueens N", file=sys.stderr)
        sys.exit(1)

    try:
        n = int(sys.argv[1])
    except ValueError:
        print("N must be a number", file=sys.stderr)
        sys.exit(1)

    if n < 4:
        print("N must be at least 4", file=sys.stderr)
        sys.exit(1)

    solve_n_queens(n)

if __name__ == "__main__":
    main()

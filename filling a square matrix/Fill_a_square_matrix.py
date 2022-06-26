# -*- coding: utf-8 -*-
"""
Created on Sat Jun 12 13:02:35 2021
@author: freakeye

Task:
Generate a square matrix N*N filled with
    1) elements from 1 to N*N in spiral order
    2) concentric squares, increasing towards the center of the matrix
"""

import numpy as np
import math

# The function generates clockwise_spiral bypass
# uses function attribute 'last' instead of global var
# to save the calculated value
#
def func_clockwise_spiral(l):
    result = func_clockwise_spiral.last + 1
    func_clockwise_spiral.last = result
    return result

# The function generates walking around concentric rings
def func_concentric(l):
    return l + 1

# the current level is @lv
def to_right(mx, lv, func_cells):
    theRow = lv
    F = len(mx) - 1
    indexSet = range(lv, F - lv + 1, 1)
    for j in indexSet:
        mx[theRow][j] = func_cells(lv)

def to_down(mx, lv, func_cells):
    F = len(mx) - 1
    theCol = F - lv
    indexSet = range(lv + 1, F - lv + 1, 1)
    for i in indexSet:
        mx[i][theCol] = func_cells(lv)

def to_left(mx, lv, func_cells):
    F = len(mx) - 1
    theRow = F - lv
    indexSet = range(F - lv - 1, lv - 1, -1)
    for j in indexSet:
        mx[theRow][j] = func_cells(lv)

def to_up(mx, lv, func_cells):
    F = len(mx) - 1
    theCol = lv
    indexSet = range(F - lv - 1, lv, -1)
    for i in indexSet:
        mx[i][theCol] = func_cells(lv)

#
# bypass @l-th level in the way specified by the function @func_cells
#
def bypass_level(mx, l, func_cells):
    to_right(mx, l, func_cells)
    to_down(mx, l, func_cells)
    to_left(mx, l, func_cells)
    to_up(mx, l, func_cells)

#
def fill_square_matrix(N, func_cells):
    mx = np.zeros((N, N), dtype = int)
    num_levels = math.ceil(N/2)
    for l in range(num_levels + 1):
        bypass_level(mx, l, func_cells)
    return mx


#
# main
#
N = int(input())

#   Fill matrix in clockwise_spiral way
# initialization function attribute for the futher first call
func_clockwise_spiral.last = 0
matrix = fill_square_matrix(N, func_clockwise_spiral)
print(matrix)

#   Fill matrix in concentric rings way
matrix = fill_square_matrix(N, func_concentric)
print(matrix)

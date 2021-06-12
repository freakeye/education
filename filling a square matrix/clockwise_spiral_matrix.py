# -*- coding: utf-8 -*-
"""
Created on Sat Jun 12 13:02:35 2021

@author: user
"""

import numpy as np
import math

# 7 _> [7, 6, 6, 5, 5, 4, 4, 3, 3, 2, 2, 1, 1]
def get_Path_Lengths(n):
    pathL = list()
    if n > 1:
        s = 0
        q = 1
        while s < n**2:
            for i in range(2):
                pathL.append(q)
                s = s + q
                if s >= n**2:
                    break
            q += 1
    else:
        pathL = [1]
    pathL.reverse()
    return pathL


#
# TODO: use nonlocal @k instead of global
def func_clockwise_spiral(l):
    global k
    #nonlocal k
    k = k + 1
    return k

def func_concentric(l):
    return l + 1

# the current level is @lv
def to_right(mx, lv, func_cells):
    theRow = lv
    F = len(mx) - 1
    indexSet = range(lv, F - lv + 1, 1)
    #nonlocal k
    for j in indexSet:
        #k += 1; mx[theRow][j] = k
        mx[theRow][j] = func_cells(lv)

def to_down(mx, lv, func_cells):
    F = len(mx) - 1
    theCol = F - lv
    indexSet = range(lv + 1, F - lv + 1, 1)
    #global k
    for i in indexSet:
        #k += 1; mx[i][theCol] = k
        mx[i][theCol] = func_cells(lv)

def to_left(mx, lv, func_cells):
    F = len(mx) - 1
    theRow = F - lv
    indexSet = range(F - lv - 1, lv - 1, -1)
    #global k
    for j in indexSet:
        #k += 1; mx[theRow][j] = k
        mx[theRow][j] = func_cells(lv)
        
def to_up(mx, lv, func_cells):
    F = len(mx) - 1
    theCol = lv
    indexSet = range(F - lv - 1, lv, -1)
    #global k
    for i in indexSet:
        #k += 1; mx[i][theCol] = k
        mx[i][theCol] = func_cells(lv)

#
# bypass @l-th level
#
#def bypass_level(mx, l):
def bypass_level(mx, l, func_cells):
    to_right(mx, l, func_cells)
    to_down(mx, l, func_cells)
    to_left(mx, l, func_cells)
    to_up(mx, l, func_cells)


def fill_square_matrix(N, func_cells):

    #k = 0
    mx = np.zeros((N, N), dtype = int)
    num_levels = math.ceil(N/2)
    #pathList = get_Path_Lengths(N)    
    
    for l in range(num_levels + 1):
        bypass_level(mx, l, func_cells)
    return mx


# main
N = int(input())

k = 0
matrix = fill_square_matrix(N, func_clockwise_spiral)
print(matrix)
matrix = fill_square_matrix(N, func_concentric)
print(matrix)

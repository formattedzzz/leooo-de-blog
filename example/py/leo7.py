# import os
# def print_board(board):
#   print(board['1'] + ' | ' + board['2'] + ' | ' + board['3'])
#   print('- + - + -')
#   print(board['4'] + ' | ' + board['5'] + ' | ' + board['6'])
#   print('- + - + -')
#   print(board['7'] + ' | ' + board['8'] + ' | ' + board['9'])

# def main():
#   init_board = {
#     '1': ' ', '2': ' ', '3': ' ',
#     '4': ' ', '5': ' ', '6': ' ',
#     '7': ' ', '8': ' ', '9': ' '
#   }
#   begin = True
#   while begin:
#     curr_board = init_board.copy()
#     begin = False
#     turn = 'x'
#     counter = 0
#     os.system('clear')
#     print_board(curr_board)
#     while counter < 9:
#       move = input('轮到%s走棋, 请输入位置: ' % turn)
#       if curr_board[move] == ' ':
#         counter += 1
#         curr_board[move] = turn
#         if turn == 'x':
#           turn = 'o'
#         else:
#           turn = 'x'
#       os.system('clear')
#       print_board(curr_board)
#     choice = input('再玩一局?(yes|no)')
#     begin = choice == 'yes'

# if __name__ == '__main__':
#   main()

# 约瑟夫环问题
def main():
  persons = [True] * 30  # 假设现在30个人都是基督徒
  counter = 0 # 现在淘汰第几个人
  index = 0   # 现在遍历到哪个位置了 1-30 循环
  number = 0  # 1-9 9个计数序号
  while counter < 15:
    print('淘汰第%d人, 位置: %d, 已淘汰: %d' % (counter + 1, index, number))
    if persons[index]:
      # 如果当前位置未被淘汰 淘汰一个的循环中计数+1
      number += 1
      if number == 9:
        print(index, '非')
        persons[index] = False
        counter += 1
        number = 0  
    index += 1
    index %= 30
  for person in persons:
    print('基' if person else '非', end='')

if __name__ == '__main__':
  main()

# 基 基 基 基 非 '4非' 非 非 '1非' 基 基 非 基 基 基 '非' 基 '2非' 非 基 基 非 非 非 基 非 '3非' 基 基 非


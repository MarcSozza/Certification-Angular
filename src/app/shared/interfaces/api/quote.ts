/*
c
Current price

d
Change

dp
Percent change

h
High price of the day

l
Low price of the day

o
Open price of the day

pc
Previous close price

*/

export interface Quote {
  c: number;
  d: number;
  dp: number;
  h: number;
  l: number;
  o: number;
  pc: number;
}

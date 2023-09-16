interface IColorProps {
  primary: 'black';
  secondary: 'white';
  success: 'green';
  error: 'red';
  info: 'blue';
  warning: 'yellow';
}

export const Colors: IColorProps = {
  primary: 'black',
  secondary: 'white',
  success: 'green',
  error: 'red',
  info: 'blue',
  warning: 'yellow'
};

type ColorKeys = keyof typeof Colors;

export type IColors = (typeof Colors)[ColorKeys];

export type IBgColorClass =
  | 'bg-black'
  | 'bg-white'
  | 'bg-transperent'
  | 'bg-red'
  | 'bg-blue'
  | 'bg-green'
  | 'bg-yellow';

export type IOutlineColorClass =
  | 'outline-black'
  | 'outline-white'
  | 'outline-red'
  | 'outline-blue'
  | 'outline-green'
  | 'outline-yellow';

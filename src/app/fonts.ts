import { Open_Sans, Rubik } from 'next/font/google';

const rubik = Rubik({
  subsets: ['latin'],
  variable: '--font-rubik',
});

const openSans = Open_Sans({
  subsets: ['latin'],
  variable: '--font-open-sans',
});

export const fonts = {
  rubik,
  openSans,
};

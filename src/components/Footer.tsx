import React from 'react';

type Props = {};

const DEVS = [
  { link: 'https://github.com/natakers', githubName: '@natakers' },
  { link: 'https://github.com/MaxTheGrandMagus', githubName: '@MaxTheGrandMagus' },
  { link: 'https://github.com/gonzjv', githubName: '@gonzjv' },
];

const Footer = (props: Props) => {
  return (
    <footer className="bg-slate-800 w-full min-h-[15vh] flex justify-center items-center flex-col gap-5 px-6 py-6 text-lg text-gray-300">
      <p>React2022Q1 | Team75</p>
      <ul className="flex gap-5">
        {DEVS.map((dev) => (
          <li key={dev.link}>
            <a
              className="font-light underline text-sky-400"
              href={dev.link}
            >
              {dev.githubName}
            </a>
          </li>
        ))}
      </ul>
    </footer>
  );
};

export default Footer;

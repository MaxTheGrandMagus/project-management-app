import React from 'react';
import { AiFillGithub } from 'react-icons/ai';

type Props = {};

const DEVS = [
  { link: 'https://github.com/natakers', githubName: 'natakers' },
  { link: 'https://github.com/MaxTheGrandMagus', githubName: 'MaxTheGrandMagus' },
  { link: 'https://github.com/gonzjv', githubName: 'gonzjv' },
];

const Footer = (props: Props) => {
  return (
    <footer className="bg-lavender-blue w-full h-full flex justify-center items-center flex-col gap-2 px-5 py-3 text-lg text-black">
      <p className='text-xl font-semibold'>React2022Q1 | Team75</p>
      <ul className="flex gap-5">
        {DEVS.map((dev) => (
          <li key={dev.link}>
            <a
              className="flex flex-row items-center gap-1 font-medium text-xl text-slate-blue hover:text-slate-blue-darker transition-all"
              href={dev.link}
            >
              <AiFillGithub />
              {dev.githubName}
            </a>
          </li>
        ))}
      </ul>
    </footer>
  );
};

export default Footer;

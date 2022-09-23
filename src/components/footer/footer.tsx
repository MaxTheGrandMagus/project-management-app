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
    <footer className="bg-lavender-blue w-full h-full flex flex-col justify-center items-center gap-2 px-5 py-4 text-lg text-black">
      <ul className="flex flex-row justify-center items-center flex-wrap gap-5">
        {DEVS.map((dev) => (
          <li key={dev.link}>
            <a
              className="flex flex-row items-center gap-1 font-medium text-xl text-black hover:text-slate-blue transition-all"
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

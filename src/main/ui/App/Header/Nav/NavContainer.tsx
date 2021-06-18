import React, { FC } from 'react';
import { Nav } from './Nav';
import {
  capitalizeFirstLetter,
  transformLinkToTitle
} from 'src/utils/textTransform';
import { PATH } from 'src/main/ui/App/Routes';


export const NavContainer: FC = () => {
  const navLinks: Array<NavLinkType> = Object.values(PATH)
      .filter(link => link !== PATH.CARDS && link !== PATH.TRAIN)
    .map((navLink) => ({
    link: navLink,
    title: capitalizeFirstLetter(transformLinkToTitle(navLink)),
  }));
  const navLinksWithoutError404: Array<NavLinkType> = navLinks.slice(
    0,
    navLinks.length - 1,
  );

  return <Nav navLinks={navLinksWithoutError404} />;
};

export type NavLinkType = {
  link: string;
  title: string;
};

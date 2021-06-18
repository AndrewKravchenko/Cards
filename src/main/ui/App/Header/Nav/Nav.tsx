import React, { FC, useState } from 'react';
import { NavLink } from 'react-router-dom';
import s from './Nav.module.scss';
import { NavLinkType } from './NavContainer';
import { randomId } from 'src/utils/randomId';

type PropsType = {
  navLinks: Array<NavLinkType>;
};

export const Nav: FC<PropsType> = ({ navLinks }) => {
  const [open, setOpen] = useState(false);

  const closeMenuHandler = () => {
    setOpen(!open);
  };

  return (
    <nav className={s.nav}>
      <input
        checked={open}
        className={s.navControl}
        type="checkbox"
        id="menu-cb"
        onChange={closeMenuHandler}
      />

      <div className={s.navContent}>
        <ul className={s.navItems} onClick={closeMenuHandler}>
          {navLinks.map(({ link, title }) => (
            <li key={randomId()} className={s.navItem}>
              <NavLink
                className={s.navItemLink}
                exact
                to={link}
                activeClassName={s.navItemLinkActive}
              >
                {title}
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
      <label className={s.navBtn} htmlFor="menu-cb" />
    </nav>
  );
};

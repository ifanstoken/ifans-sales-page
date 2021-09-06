

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { NavLink } from 'react-router-dom';

export type SidebarNavItems = {
  to: string;
  text: string;
  icon: IconProp;
}[];

interface Props {
  className?: string;
  navItems: SidebarNavItems;
}

const SideBar = ({ navItems }: Props) => {
  return (
    <div className="main-nav">
      <ul>
        {navItems.map((item, i) => (
          <li key={"nav" + i}>
            <NavLink
              className="nav-link"
              to={item.to}
              activeClassName="active"
            >
              <FontAwesomeIcon
                icon={item.icon}
                className="nav-link-icon"
              />
              {item.text}
            </NavLink>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SideBar;
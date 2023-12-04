import React from "react";
import { Link, useLocation } from "react-router-dom";
import classes from "./navbar.module.css";

const isActivePath = (currentPath: string, path: string) => {
  if (path === "/") {
    return currentPath === path;
  }

  return currentPath.includes(path);
};

const navlinks = [
  {
    link: "/books",
    label: " View Books",
  },
  {
    link: "/",
    label: "Add",
  },
];

export default function Navbar() {
  const { pathname } = useLocation();

  return (
    <ul>
      {navlinks.map((item) => {
        return (
          <Link
            key={item.link}
            to={item.link}
            className={isActivePath(pathname, item.link) ? classes.active : ""}
          >
            <li
              key={item.link}
              className={`${
                isActivePath(pathname, item.link)
                  ? classes.active
                  : classes.link
              }`}
            >
              <div>{item.label}</div>
            </li>
          </Link>
        );
      })}
    </ul>
  );
}

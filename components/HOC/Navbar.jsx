import Image from "next/image";
import Link from "next/link";
import React from "react";
import { useStateContext } from "../../context/StateContext";

const Navbar = () => {
  const { user, themes, setTheme, theme, clear, setLoading } =
    useStateContext();

  const logout = () => {
    setLoading(true);
    clear();
    setLoading(false)
    window.location.reload(false);
  };
  return (
    <>
      <div className="navbar bg-base-100" data-theme={theme}>
        <div className="navbar-start">
          <div className=" ml-10 dropdown dropdown-right">
            <label tabIndex={0} className=" m-1 cursor-pointer capitalize btn">
              {theme}
            </label>
            <ul
              tabIndex={0}
              className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52"
            >
              {themes.map((theme, i) => {
                return (
                  <li key={i}>
                    <button
                      className="cursor-pointer capitalize"
                      onClick={() => {
                        setTheme(theme);
                      }}
                    >
                      {theme}
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>
          {user?.name && (
            <Link href="/addtodo">
              <label className=" m-1 cursor-pointer capitalize btn">
                Add Todo
              </label>
            </Link>
          )}
        </div>

        {user && (
          <div className="navbar-end">
            <div class="dropdown dropdown-end">
              <label tabindex="0" class="btn btn-ghost btn-circle avatar">
                <div class="w-10 rounded-full">
                  <Image
                    src={`https://res.cloudinary.com/demo/image/fetch/${user?.photoURL}`}
                    width={80}
                    height={80}
                  />
                </div>
              </label>
              <ul
                tabindex="0"
                class="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
              >
                <li>
                  <button class="justify-between">
                    Profile
                    <span class="badge">New</span>
                  </button>
                </li>

                <li>
                  <button onClick={() => logout()}>Logout</button>
                </li>
              </ul>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Navbar;

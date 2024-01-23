import Link from "next/link";
import { Icons } from "@/components/icons";
import { boolean } from "zod";
import { useState } from "react";

const Sidebar = () => {
  // menu icon
  const [menu, setMenu] = useState<boolean>(false);
  const style = {
    display: menu ? "flex" : "none",
  };
  function openMenu() {
    setMenu((prev: boolean) => !prev);
  }
  return (
    <>
      <button
        className=" lg:hidden absolute w-1/2 z-50 p-6 text-3xl"
        onClick={openMenu}
      >
        {!menu ? <Icons.menuOpen /> : <Icons.menuClose />}
      </button>
      <section
        className={`h-fit md:w-1/4 lg:fixed hidden lg:!block flex-col lg:flex-row mt-16 ${
          menu ? "bg-white/10 backdrop-blur-xl" : ""
        } lg:bg-none lg:h-full w-full text-center`}
        style={style}
      >
        <div className="lg:flex gap-4 p-5 items-center ">
          <img
            src="/profilePic.png"
            alt="person"
            className="rounded-full lg:w-[65px] mx-auto lg:m-0"
          />
          <h2 className="font-bold text-4xl">User</h2>
        </div>
        <ul className="font-bold text-4xl text-primary flex flex-col gap-4 p-5">
          <li className="hover:text-white w-fit">
            <h2>
              <Link href="/dashboard" className="flex items-center gap-2">
                <Icons.chart />
                Overview
              </Link>
            </h2>
          </li>
          <li className="hover:text-white w-fit">
            <h2>
              <Link href="..." className="flex items-center gap-2">
                <Icons.events />
                Events
              </Link>
            </h2>
          </li>
          <li className="hover:text-white w-fit">
            <h2>
              <Link
                href="/dashboard/members"
                className="flex items-center gap-2"
              >
                <Icons.users />
                Members
              </Link>
            </h2>
          </li>
          <li className="hover:text-white w-fit">
            <h2>
              <Link href="..." className="flex items-center gap-2">
                <Icons.dCheck />
                Privileges
              </Link>
            </h2>
          </li>
        </ul>
      </section>
    </>
  );
};

export default Sidebar;

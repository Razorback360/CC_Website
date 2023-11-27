import Link from "next/link";

const Sidebar = () => {
  return (
    <section className="h-full fixed lg:w-1/3">
      <ul className="font-bold text-4xl text-primary flex flex-col gap-4 p-5">
        <li className="hover:text-white">
          <h2>
            <Link href="...">Overview</Link>
          </h2>
        </li>
        <li className="hover:text-white">
          <h2>
            <Link href="...">Events</Link>
          </h2>
        </li>
        <li className="hover:text-white">
          <h2>
            <Link href="...">Members</Link>
          </h2>
        </li>
        <li className="hover:text-white">
          <h2>
            <Link href="...">Privileges</Link>
          </h2>
        </li>
      </ul>
    </section>
  );
};

export default Sidebar;

import { cn } from "@/lib/utils";
import {
  AlertTriangle,
  ArrowRight,
  Check,
  ChevronLeft,
  ChevronRight,
  CreditCard,
  File,
  FileText,
  HelpCircle,
  Image,
  Laptop,
  Loader2,
  Moon,
  MoreVertical,
  Pizza,
  Plus,
  Settings,
  SunMedium,
  Trash,
  User,
  X,
  type IconNode as LucideIcon,
  AtSign,
  Youtube,
  LogOut,
  MessageSquare,
} from "lucide-react";

import { FaChartSimple as Chart } from "react-icons/fa6";
import { FaClipboardList as Events } from "react-icons/fa";
import { FaUsers as Users } from "react-icons/fa";
import { FaUserCheck as DoubleCheck } from "react-icons/fa";
import { GiHamburgerMenu as MenuOpen } from "react-icons/gi";
import { IoClose as MenuClose } from "react-icons/io5";
import { IoPersonSharp as Person } from "react-icons/io5";
import { MdEventAvailable as EventsDone } from "react-icons/md";
import { RiListCheck3 as EventsRemain } from "react-icons/ri";
import { VscDebugBreakpointDataUnverified as Point } from "react-icons/vsc";
import { IoLink as Link } from "react-icons/io5";

type IconProps = React.HTMLAttributes<SVGElement>;
export type Icon = LucideIcon;

export const Icons = {
  logo: (props: IconProps) => (
    <svg
      {...props}
      className={cn(props.className)}
      // width="311"
      // height="166"
      viewBox="0 0 311 166"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M41.3251 12.2109L2.19632 79.2583C0.897678 81.4835 1.23934 84.3133 3.0634 86.1329C15.7808 98.8192 26.3867 106.403 37.3672 108.972C66.7472 115.846 91.1711 87.3871 112.545 66.0889L133.835 44.8731C143.377 35.365 155.469 22.8162 150.25 10.3985C148.567 6.39611 144.768 3.64091 138.354 1.43948C135.18 0.349876 131.808 -0.00025177 128.452 -0.00025177H59.2826C50.157 0.508827 46.2599 3.24763 41.3251 12.2109Z"
        fill="url(#paint0_linear_317_40)"
      />
      <path
        d="M62.1653 42.243L58.1917 46.4505L96.0222 82.7072L100.465 78.2951L62.1653 42.243Z"
        fill="white"
      />
      <path
        d="M64.7894 40.9433C64.7894 45.3071 61.2519 48.8446 56.8881 48.8446C52.5243 48.8446 48.9868 45.3071 48.9868 40.9433C48.9868 36.5795 52.5243 33.042 56.8881 33.042C61.2519 33.042 64.7894 36.5795 64.7894 40.9433Z"
        fill="white"
      />
      <path
        d="M41.3251 153.187L2.17983 85.0903C0.902748 82.8687 1.25099 80.0577 3.06718 78.25C15.8141 65.5623 26.4347 58.1951 37.4357 55.8711C66.9576 49.6344 91.1711 78.0108 112.545 99.3091L133.835 120.525C143.377 130.033 155.469 142.582 150.25 154.999C148.567 159.002 144.768 161.757 138.354 163.958C135.18 165.048 131.808 165.398 128.452 165.398H59.2826C50.157 164.889 46.26 162.15 41.3251 153.187Z"
        fill="url(#paint1_linear_317_40)"
      />
      <path
        d="M269.675 153.185L308.804 86.1372C310.102 83.912 309.761 81.0822 307.937 79.2626C295.219 66.5763 284.613 58.9922 273.633 56.4231C244.253 49.5491 219.829 78.0084 198.455 99.3066L177.165 120.522C167.623 130.03 155.531 142.579 160.75 154.997C162.433 158.999 166.232 161.755 172.646 163.956C175.82 165.046 179.192 165.396 182.548 165.396H251.717C260.843 164.887 264.74 162.148 269.675 153.185Z"
        fill="url(#paint2_linear_317_40)"
      />
      <path
        d="M248.835 123.154L252.808 118.946L214.978 82.6893L210.535 87.1014L248.835 123.154Z"
        fill="white"
      />
      <path
        d="M246.211 124.453C246.211 120.089 249.748 116.551 254.112 116.551C258.476 116.551 262.013 120.089 262.013 124.453C262.013 128.816 258.476 132.354 254.112 132.354C249.748 132.354 246.211 128.816 246.211 124.453Z"
        fill="white"
      />
      <path
        d="M269.675 12.2104L308.82 80.3071C310.097 82.5287 309.749 85.3398 307.933 87.1475C295.186 99.8352 284.565 107.202 273.564 109.526C244.042 115.763 219.829 87.3867 198.455 66.0884L177.165 44.8726C167.623 35.3645 155.531 22.8157 160.75 10.398C162.433 6.39561 166.232 3.64042 172.646 1.43899C175.82 0.349388 179.192 -0.000740051 182.548 -0.000740051H251.717C260.843 0.508339 264.74 3.24714 269.675 12.2104Z"
        fill="url(#paint3_linear_317_40)"
      />
      <defs>
        <linearGradient
          id="paint0_linear_317_40"
          x1="75.7145"
          y1="110.327"
          x2="75.7145"
          y2="-0.000266926"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#33B1FF" />
          <stop offset="1" stopColor="#3369FF" />
        </linearGradient>
        <linearGradient
          id="paint1_linear_317_40"
          x1="75.7145"
          y1="55.0713"
          x2="75.7145"
          y2="165.398"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#273039" />
          <stop offset="1" stopColor="#181C20" />
        </linearGradient>
        <linearGradient
          id="paint2_linear_317_40"
          x1="235.285"
          y1="55.0689"
          x2="235.285"
          y2="165.396"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#33B1FF" />
          <stop offset="1" stopColor="#3369FF" />
        </linearGradient>
        <linearGradient
          id="paint3_linear_317_40"
          x1="235.285"
          y1="110.326"
          x2="235.285"
          y2="-0.000727518"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#273039" />
          <stop offset="1" stopColor="#181C20" />
        </linearGradient>
      </defs>
    </svg>
  ),
  close: X,
  spinner2: Loader2,
  chevronLeft: ChevronLeft,
  chevronRight: ChevronRight,
  trash: Trash,
  post: FileText,
  page: File,
  media: Image,
  settings: Settings,
  billing: CreditCard,
  ellipsis: MoreVertical,
  add: Plus,
  warning: AlertTriangle,
  user: User,
  arrowRight: ArrowRight,
  help: HelpCircle,
  pizza: Pizza,
  sun: SunMedium,
  chart: Chart,
  events: Events,
  users: Users,
  dCheck: DoubleCheck,
  menuOpen: MenuOpen,
  menuClose: MenuClose,
  person: Person,
  eventsDone: EventsDone,
  eventsRemain: EventsRemain,
  point: Point,
  link: Link,
  moon: Moon,
  laptop: Laptop,
  microsoft: (props: IconProps) => (
    <svg
      aria-hidden="true"
      focusable="false"
      data-prefix="fab"
      data-icon="microsoft"
      width="16"
      height="16"
      fill="currentColor"
      className="bi bi-microsoft"
      viewBox="0 0 16 16"
      {...props}
    >
      {" "}
      <path d="M7.462 0H0v7.19h7.462V0zM16 0H8.538v7.19H16V0zM7.462 8.211H0V16h7.462V8.211zm8.538 0H8.538V16H16V8.211z" />{" "}
    </svg>
  ),
  gitHub: (props: IconProps) => (
    <svg
      aria-hidden="true"
      focusable="false"
      data-prefix="fab"
      data-icon="github"
      role="img"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 496 512"
      {...props}
    >
      <path
        fill="currentColor"
        d="M165.9 397.4c0 2-2.3 3.6-5.2 3.6-3.3 .3-5.6-1.3-5.6-3.6 0-2 2.3-3.6 5.2-3.6 3-.3 5.6 1.3 5.6 3.6zm-31.1-4.5c-.7 2 1.3 4.3 4.3 4.9 2.6 1 5.6 0 6.2-2s-1.3-4.3-4.3-5.2c-2.6-.7-5.5 .3-6.2 2.3zm44.2-1.7c-2.9 .7-4.9 2.6-4.6 4.9 .3 2 2.9 3.3 5.9 2.6 2.9-.7 4.9-2.6 4.6-4.6-.3-1.9-3-3.2-5.9-2.9zM244.8 8C106.1 8 0 113.3 0 252c0 110.9 69.8 205.8 169.5 239.2 12.8 2.3 17.3-5.6 17.3-12.1 0-6.2-.3-40.4-.3-61.4 0 0-70 15-84.7-29.8 0 0-11.4-29.1-27.8-36.6 0 0-22.9-15.7 1.6-15.4 0 0 24.9 2 38.6 25.8 21.9 38.6 58.6 27.5 72.9 20.9 2.3-16 8.8-27.1 16-33.7-55.9-6.2-112.3-14.3-112.3-110.5 0-27.5 7.6-41.3 23.6-58.9-2.6-6.5-11.1-33.3 2.6-67.9 20.9-6.5 69 27 69 27 20-5.6 41.5-8.5 62.8-8.5s42.8 2.9 62.8 8.5c0 0 48.1-33.6 69-27 13.7 34.7 5.2 61.4 2.6 67.9 16 17.7 25.8 31.5 25.8 58.9 0 96.5-58.9 104.2-114.8 110.5 9.2 7.9 17 22.9 17 46.4 0 33.7-.3 75.4-.3 83.6 0 6.5 4.6 14.4 17.3 12.1C428.2 457.8 496 362.9 496 252 496 113.3 383.5 8 244.8 8zM97.2 352.9c-1.3 1-1 3.3 .7 5.2 1.6 1.6 3.9 2.3 5.2 1 1.3-1 1-3.3-.7-5.2-1.6-1.6-3.9-2.3-5.2-1zm-10.8-8.1c-.7 1.3 .3 2.9 2.3 3.9 1.6 1 3.6 .7 4.3-.7 .7-1.3-.3-2.9-2.3-3.9-2-.6-3.6-.3-4.3 .7zm32.4 35.6c-1.6 1.3-1 4.3 1.3 6.2 2.3 2.3 5.2 2.6 6.5 1 1.3-1.3 .7-4.3-1.3-6.2-2.2-2.3-5.2-2.6-6.5-1zm-11.4-14.7c-1.6 1-1.6 3.6 0 5.9 1.6 2.3 4.3 3.3 5.6 2.3 1.6-1.3 1.6-3.9 0-6.2-1.4-2.3-4-3.3-5.6-2z"
      ></path>
    </svg>
  ),
  twitter: (props: IconProps) => (
    <svg
      {...props}
      height="23"
      viewBox="0 0 1200 1227"
      width="23"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M714.163 519.284L1160.89 0H1055.03L667.137 450.887L357.328 0H0L468.492 681.821L0 1226.37H105.866L515.491 750.218L842.672 1226.37H1200L714.137 519.284H714.163ZM569.165 687.828L521.697 619.934L144.011 79.6944H306.615L611.412 515.685L658.88 583.579L1055.08 1150.3H892.476L569.165 687.854V687.828Z" />
    </svg>
  ),
  spinner: (props: IconProps) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M21 12a9 9 0 1 1-6.219-8.56" />
    </svg>
  ),

  x: X,
  linkedin: (props: IconProps) => (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
    >
      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
    </svg>
  ),
  email: AtSign,
  check: Check,
  youtube: Youtube,
  whatsapp: MessageSquare,
  logOut: LogOut,
};

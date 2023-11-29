import { cn } from "@/lib/utils";
import {
  FaExclamationTriangle as AlertTriangle,
  FaArrowRight as ArrowRight,
  FaCheck as Check,
  FaCircle as Circle,
  FaChevronLeft as ChevronLeft,
  FaChevronRight as ChevronRight,
  FaChevronDown as ChevronDown,
  FaChevronUp as ChevronUp,
  FaCreditCard as CreditCard,
  FaFile as File,
  FaFileAlt as FileText,
  FaQuestionCircle as HelpCircle,
  FaImage as Image,
  FaLaptop as Laptop,
  FaSpinner as Loader2,
  FaMoon as Moon,
  FaEllipsisV as MoreVertical,
  FaPizzaSlice as Pizza,
  FaPlus as Plus,
  FaCog as Settings,
  FaTrash as Trash,
  FaUser as User,
  FaTimes as X,
  FaAt as AtSign,
  FaYoutube as Youtube,
  FaSignOutAlt as LogOut,
  FaComment as MessageSquare,
  FaMicrosoft as MicrosoftIcon,
  FaGithub as GitHubIcon,
  FaTwitter as TwitterIcon,
  FaLinkedin as LinkedinIcon,
  FaSearch as Search,
} from "react-icons/fa";
import { IoSunnyOutline as Sun } from "react-icons/io5";

type IconProps = React.HTMLAttributes<SVGElement>;

export type Icon = React.ElementType<IconProps>;

export const Icons = {
  logo: (props: IconProps) => (
    <svg
      {...props}
      className={cn(props.className)}
      viewBox="0 0 311 166"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Your logo path here */}
    </svg>
  ),
  close: X,
  spinner2: Loader2,
  chevronLeft: ChevronLeft,
  chevronRight: ChevronRight,
  chevronDown: ChevronDown,
  chevronUp: ChevronUp,
  search: Search,
  circle: Circle,
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
  sun: Sun,
  moon: Moon,
  laptop: Laptop,
  microsoft: MicrosoftIcon,
  gitHub: GitHubIcon,
  twitter: TwitterIcon,
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
  linkedin: LinkedinIcon,
  email: AtSign,
  check: Check,
  youtube: Youtube,
  whatsapp: MessageSquare,
  logOut: LogOut,
};

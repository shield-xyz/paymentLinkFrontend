import {
  AlertTriangle,
  Archive,
  ArchiveRestore,
  ArrowLeft,
  ArrowRight,
  BarChart2,
  Check,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  CreditCard,
  DollarSign,
  File,
  FileText,
  FolderSearch,
  HelpCircle,
  Image,
  Laptop,
  LineChartIcon,
  Link,
  Loader,
  Loader2,
  LoaderCircle,
  Menu,
  Moon,
  MoreVertical,
  PackageOpen,
  Pizza,
  Plus,
  Search,
  Settings,
  Shield,
  ShieldCheck,
  Sparkles,
  Star,
  SunMedium,
  Trash,
  User,
  WalletCards,
  X,
  ZoomIn,
} from 'lucide-react';

export const Icons = {
  dollar: DollarSign,
  star: Star,
  close: X,
  loaderCircle: LoaderCircle,
  loader: Loader,
  spinner: Loader2,
  chevronLeft: ChevronLeft,
  chevronRight: ChevronRight,
  chevronDown: ChevronDown,
  trash: Trash,
  post: FileText,
  page: File,
  chart: BarChart2,
  media: Image,
  settings: Settings,
  billing: CreditCard,
  ellipsis: MoreVertical,
  add: Plus,
  warning: AlertTriangle,
  user: User,
  arrowRight: ArrowRight,
  arrowLeft: ArrowLeft,
  archiveRestore: ArchiveRestore,
  sparkles: Sparkles,
  help: HelpCircle,
  pizza: Pizza,
  sun: SunMedium,
  moon: Moon,
  laptop: Laptop,
  search: Search,
  menu: Menu,
  link: Link,
  archive: Archive,
  packageOpen: PackageOpen,
  shield: Shield,
  shieldCheck: ShieldCheck,
  wallets: WalletCards,
  folderSearch: FolderSearch,
  zoomIn: ZoomIn,
  chartLine: LineChartIcon,
  gitHub: ({ ...props }) => (
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
  check: Check,
  home: ({ ...props }) => (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M5 22C3.34315 22 2 20.6569 2 19V11.3361C2 10.4856 2.36096 9.67513 2.99311 9.1062L9.9931 2.80621C11.134 1.77938 12.866 1.77938 14.0069 2.8062L21.0069 9.1062C21.639 9.67513 22 10.4856 22 11.3361V19C22 20.6569 20.6569 22 19 22H5ZM20 11.3361V19C20 19.5523 19.5523 20 19 20H16V15C16 13.3431 14.6569 12 13 12H11C9.34315 12 8 13.3431 8 15V20H5C4.44772 20 4 19.5523 4 19V11.3361C4 11.0526 4.12032 10.7824 4.33104 10.5928L11.331 4.29279C11.7113 3.95052 12.2887 3.95052 12.669 4.29279L19.669 10.5928C19.8797 10.7824 20 11.0526 20 11.3361ZM10 20V15C10 14.4477 10.4477 14 11 14H13C13.5523 14 14 14.4477 14 15V20H10Z"
        fill="#6F767E"
      />
    </svg>
  ),
  profile_circled: ({ ...props }) => (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12 12C13.1046 12 14 11.1046 14 10C14 8.89543 13.1046 8 12 8C10.8954 8 10 8.89543 10 10C10 11.1046 10.8954 12 12 12ZM12 14C14.2091 14 16 12.2091 16 10C16 7.79086 14.2091 6 12 6C9.79086 6 8 7.79086 8 10C8 12.2091 9.79086 14 12 14Z"
        fill="#6F767E"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M18.5588 19.5488C20.6672 17.7154 22 15.0134 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 15.0134 3.33284 17.7154 5.44116 19.5488C7.19693 21.0756 9.49052 22 12 22C14.4162 22 16.6323 21.143 18.3609 19.7165C18.4276 19.6614 18.4936 19.6055 18.5588 19.5488ZM12.2579 19.9959C12.1723 19.9986 12.0863 20 12 20C11.9914 20 11.9827 20 11.9741 20C11.8937 19.9997 11.8135 19.9983 11.7337 19.9956C10.3914 19.9517 9.13273 19.5772 8.03655 18.9508C8.95181 17.7632 10.3882 17 12 17C13.6118 17 15.0482 17.7632 15.9634 18.9508C14.865 19.5785 13.6033 19.9533 12.2579 19.9959ZM17.5624 17.7498C16.2832 16.0781 14.2675 15 12 15C9.73249 15 7.7168 16.0781 6.43759 17.7498C4.93447 16.2953 4 14.2568 4 12C4 7.58172 7.58172 4 12 4C16.4183 4 20 7.58172 20 12C20 14.2568 19.0655 16.2953 17.5624 17.7498Z"
        fill="#6F767E"
      />
    </svg>
  ),
  store: ({ ...props }) => (
    <svg
      width="22"
      height="20"
      viewBox="0 0 22 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M7.51812 -6.69388e-10C7.50537 -0.000244745 7.49264 -0.000243536 7.47996 -6.69388e-10H5.55221C4.31497 -6.69388e-10 3.20463 0.759545 2.75619 1.91266L0.96825 6.51023C0.533862 7.62723 1.01111 8.85223 2 9.41213V17C2 18.6568 3.34315 20 5 20H17C18.6569 20 20 18.6568 20 17V9.41214C20.9889 8.85224 21.4662 7.62723 21.0318 6.51023L19.2438 1.91266C18.7954 0.759547 17.685 -6.69388e-10 16.4478 -6.69388e-10H14.5201C14.5074 -0.000243536 14.4947 -0.000244745 14.4819 -6.69388e-10H7.51812ZM18 9.73843C17.5515 9.68589 17.1119 9.55593 16.7016 9.35078L16.0005 9.00023L15.9994 9.00023L15.357 9.25722C14.1649 9.73404 12.8351 9.73404 11.6431 9.25722L11 9L10.357 9.25722C9.1649 9.73404 7.83511 9.73404 6.64305 9.25722L6.00058 9.00023L5.99955 9.00023L5.29844 9.35078C4.88814 9.55593 4.44854 9.68589 4 9.73843V17C4 17.5523 4.44772 18 5 18H7V15C7 13.3431 8.34315 12 10 12H12C13.6569 12 15 13.3431 15 15V18H17C17.5523 18 18 17.5523 18 17V9.73843ZM16.8944 7.21115C16.8793 7.2036 16.8642 7.19626 16.849 7.18912L15.737 2H16.4478C16.8602 2 17.2303 2.25318 17.3798 2.63755L19.1678 7.23512C19.2451 7.4341 19.1304 7.65585 18.9233 7.70763C18.4776 7.81904 18.0069 7.76736 17.596 7.56193L16.8944 7.21115ZM14.8303 7.31382L13.6916 2H12V7.24593L12.3858 7.40027C13.1011 7.68636 13.8989 7.68636 14.6142 7.40027L14.8303 7.31382ZM10 2H8.30844L7.16976 7.31384L7.38583 7.40027C8.10107 7.68636 8.89894 7.68636 9.61418 7.40027L10 7.24594V2ZM5.15109 7.1891L6.26304 2H5.55221C5.13979 2 4.76968 2.25318 4.6202 2.63755L2.83226 7.23512C2.75488 7.4341 2.8696 7.65585 3.07673 7.70763C3.52237 7.81904 3.99315 7.76736 4.40401 7.56193L5.10558 7.21115C5.12068 7.2036 5.13585 7.19625 5.15109 7.1891ZM13 15V18H9V15C9 14.4477 9.44772 14 10 14H12C12.5523 14 13 14.4477 13 15Z"
        fill="#6F767E"
      />
    </svg>
  ),
  pie_chart: ({ ...props }) => (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M9 8.08392C8.16919 8.22435 7.37341 8.53889 6.66658 9.01118C5.67989 9.67047 4.91085 10.6075 4.45673 11.7039C4.0026 12.8003 3.88378 14.0067 4.11529 15.1705C4.3468 16.3344 4.91825 17.4035 5.75736 18.2426C6.59648 19.0818 7.66558 19.6532 8.82946 19.8847C9.99335 20.1162 11.1997 19.9974 12.2961 19.5433C13.3925 19.0892 14.3295 18.3201 14.9888 17.3334C15.4611 16.6266 15.7757 15.8308 15.9161 15H10C9.73479 15 9.48043 14.8946 9.2929 14.7071C9.10536 14.5196 9 14.2652 9 14V8.08392ZM5.55544 7.34824C6.87104 6.46919 8.41775 6 10 6C10.5523 6 11 6.44772 11 7V13H17C17.5523 13 18 13.4477 18 14C18 15.5823 17.5308 17.129 16.6518 18.4446C15.7727 19.7602 14.5233 20.7855 13.0615 21.391C11.5997 21.9965 9.99113 22.155 8.43928 21.8463C6.88743 21.5376 5.46197 20.7757 4.34315 19.6569C3.22433 18.538 2.4624 17.1126 2.15372 15.5607C1.84504 14.0089 2.00347 12.4003 2.60897 10.9385C3.21447 9.47672 4.23985 8.22729 5.55544 7.34824Z"
        fill="#6F767E"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M13.2929 2.29289C13.4804 2.10536 13.7348 2 14 2C16.1217 2 18.1566 2.84285 19.6569 4.34314C21.1571 5.84344 22 7.87827 22 10C22 10.5523 21.5523 11 21 11L14 11C13.7348 11 13.4804 10.8946 13.2929 10.7071C13.1054 10.5196 13 10.2652 13 10V3C13 2.73478 13.1054 2.48043 13.2929 2.29289ZM15 4.08389V9L19.9161 9C19.7098 7.77969 19.1293 6.64405 18.2426 5.75736C17.3559 4.87067 16.2203 4.29016 15 4.08389Z"
        fill="#6F767E"
      />
    </svg>
  ),
  help2: ({ ...props }) => (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12 20C16.4183 20 20 16.4183 20 12C20 7.58172 16.4183 4 12 4C7.58172 4 4 7.58172 4 12C4 16.4183 7.58172 20 12 20ZM12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
        fill="#6F767E"
      />
      <circle cx="12" cy="18" r="1" fill="#6F767E" />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12 8C11.1307 8 10.3886 8.5551 10.1135 9.33325C9.9295 9.85396 9.35818 10.1269 8.83746 9.94284C8.31674 9.75879 8.04382 9.18747 8.22787 8.66675C8.7765 7.11451 10.2568 6 12 6C14.2091 6 16 7.79086 16 10C16 11.8638 14.7252 13.4299 13 13.874V15C13 15.5523 12.5523 16 12 16C11.4477 16 11 15.5523 11 15V13C11 12.4477 11.4477 12 12 12C13.1046 12 14 11.1046 14 10C14 8.89543 13.1046 8 12 8Z"
        fill="#6F767E"
      />
    </svg>
  ),
  notificationFrame: ({ ...props }) => (
    <svg
      width="14"
      height="14"
      viewBox="0 0 14 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <rect x="1" y="1" width="12" height="12" rx="6" fill="#FF6A55" />
      <rect
        x="1"
        y="1"
        width="12"
        height="12"
        rx="6"
        stroke="#FCFCFC"
        strokeWidth="2"
      />
    </svg>
  ),
  message: ({ ...props }) => (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M7 9C7 8.44772 7.44772 8 8 8H16C16.5523 8 17 8.44772 17 9C17 9.55228 16.5523 10 16 10H8C7.44772 10 7 9.55228 7 9Z"
        fill="#6F767E"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M7 13C7 12.4477 7.44772 12 8 12H12C12.5523 12 13 12.4477 13 13C13 13.5523 12.5523 14 12 14H8C7.44772 14 7 13.5523 7 13Z"
        fill="#6F767E"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M6.71963 17.4636C7.07906 17.164 7.53213 17 8 17H19C19.5523 17 20 16.5523 20 16V6C20 5.44771 19.5523 5 19 5H5C4.44772 5 4 5.44772 4 6V19.7299L6.71963 17.4636ZM8 19H19C20.6569 19 22 17.6569 22 16V6C22 4.34315 20.6569 3 19 3H5C3.34315 3 2 4.34315 2 6V19.7299C2 21.4256 3.97771 22.3519 5.28037 21.2664L8 19Z"
        fill="#6F767E"
      />
    </svg>
  ),
  notification: ({ ...props }) => (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M2 16.5959C2 16.2151 2.15471 15.8506 2.42864 15.586L3.45759 14.5922C3.84928 14.2139 4.06977 13.6922 4.06814 13.1476L4.05867 9.9946C4.04543 5.58319 7.61789 2 12.0293 2C16.4314 2 20 5.56859 20 9.97067L20 13.1716C20 13.702 20.2107 14.2107 20.5858 14.5858L21.5858 15.5858C21.851 15.851 22 16.2107 22 16.5858C22 17.3668 21.3668 18 20.5858 18H16C16 20.2091 14.2091 22 12 22C9.79086 22 8 20.2091 8 18H3.40408C2.62863 18 2 17.3714 2 16.5959ZM10 18C10 19.1046 10.8954 20 12 20C13.1046 20 14 19.1046 14 18H10ZM18 13.1716C18 14.2324 18.4214 15.2499 19.1716 16L4.87851 16C5.64222 15.246 6.07136 14.2161 6.06813 13.1416L6.05867 9.9886C6.04875 6.6841 8.7248 4 12.0293 4C15.3268 4 18 6.67316 18 9.97067L18 13.1716Z"
        fill="#6F767E"
      />
    </svg>
  ),
  arrowNarrowUpRight: ({ ...props }) => (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M8.33335 4.16669C7.87312 4.16669 7.50002 4.53978 7.50002 5.00002C7.50002 5.46026 7.87312 5.83335 8.33335 5.83335H12.9882L4.41076 14.4108C4.08533 14.7362 4.08533 15.2638 4.41076 15.5893C4.7362 15.9147 5.26384 15.9147 5.58928 15.5893L14.1667 7.01186V11.6667C14.1667 12.1269 14.5398 12.5 15 12.5C15.4603 12.5 15.8334 12.1269 15.8334 11.6667V5.00002C15.8334 4.53978 15.4603 4.16669 15 4.16669H8.33335Z"
        fill="black"
      />
    </svg>
  ),
  arrowUpCompressed: ({ ...props }) => (
    <svg
      width="15"
      height="8"
      viewBox="0 0 15 8"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M6.79289 0.707106L1.20711 6.29289C0.577142 6.92286 1.02331 8 1.91421 8H13.0858C13.9767 8 14.4229 6.92286 13.7929 6.29289L8.20711 0.707107C7.81658 0.316583 7.18342 0.316582 6.79289 0.707106Z"
        fill="#32AE60"
      />
    </svg>
  ),
  successfullySent: ({ ...props }) => (
    <svg
      width="341"
      height="191"
      viewBox="0 0 341 191"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M35.5341 31.013L31.1673 46.0013L26.888 61.013L18.4357 91.0646L10.1374 121.158L1.99102 151.291L0.477051 156.892L6.08308 158.379L36.2554 166.382L66.4668 174.238L96.7192 181.942C106.804 184.506 116.912 186.985 127.023 189.452L131.495 190.543L132.534 186.27C135.057 175.904 137.646 165.558 140.033 155.231L147.149 124.433L160.505 64.4986L141.544 125.171L132.501 154.677C129.955 162.977 127.552 171.261 125.133 179.532C116.548 177.028 107.959 174.537 99.3531 172.112L69.3018 163.657L39.2098 155.355L14.6517 148.708L21.1823 124.117L29.0424 93.9069L36.7482 63.6552L40.5482 48.5151L43.2117 37.6361C51.578 39.6735 59.947 41.7283 68.3981 43.6771L98.4708 50.5955L160.505 64.499L101.931 46.0859L71.7006 36.8458C61.5591 33.7566 51.3071 30.8175 41.0667 27.8192L36.8266 26.5779L35.5341 31.013Z"
        fill="#EFEFEF"
      />
      <path
        d="M312.5 -117.5L74.2343 107.972L39.7571 75.4524L4.84668 112.463L74.8628 178.5L345.176 -86.5566L312.5 -117.5Z"
        fill="#EFEFEF"
      />
      <path
        d="M161.786 35.5143L74.6322 122.669L40.1287 88.1647L16.1592 112.132L74.6322 170.605L185.754 59.4838L161.786 35.5143Z"
        fill="#35B528"
      />
    </svg>
  ),
  errorSent: ({ ...props }) => (
    <svg
      width="337"
      height="183"
      viewBox="0 0 337 183"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M42.7658 29.2665L38.5644 43.6868L34.4475 58.1297L26.3152 87.0426L18.3316 115.995L10.4939 144.987L9.03711 150.376L14.4307 151.806L43.4595 159.506L72.5261 167.065L101.632 174.476C111.335 176.943 121.06 179.329 130.788 181.702L135.09 182.752L136.091 178.641C138.517 168.667 141.009 158.713 143.305 148.777L150.151 119.147L163.001 61.4832L144.758 119.857L136.059 148.245C133.608 156.23 131.297 164.2 128.969 172.158C120.71 169.749 112.447 167.352 104.166 165.018L75.254 156.884L46.3022 148.897L22.6747 142.502L28.9576 118.843L36.5199 89.7771L43.9338 60.6718L47.5897 46.1053L50.1522 35.6386C58.2016 37.5988 66.2534 39.5757 74.3843 41.4507L103.317 48.1069L163.001 61.4836L106.647 43.7682L77.5615 34.8782C67.8045 31.9061 57.9409 29.0784 48.0885 26.1937L44.0091 24.9994L42.7658 29.2665Z"
        fill="#EFEFEF"
      />
      <path
        d="M295.892 -137.789L88.8805 71.0929L48.3779 32.4036L14.209 68.1779L56.6103 108.68L17.9222 149.182L48.815 178.691L89.3176 136.29L129.82 174.978L154.671 148.964L118.378 114.297L336.5 -99L295.892 -137.789Z"
        fill="#EFEFEF"
      />
      <path
        d="M112.268 108.461L152.813 67.9166L129.753 44.8564L89.208 85.4015L48.6631 44.8556L25.604 67.9166L66.1489 108.461L25.604 149.007L48.6631 172.066L89.208 131.521L129.753 172.066L152.814 149.007L112.268 108.461Z"
        fill="#F51F1F"
      />
    </svg>
  ),
  addCircle: ({ ...props }) => (
    <svg
      width="25"
      height="25"
      viewBox="0 0 25 25"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12.1738 20.5342C16.5921 20.5342 20.1738 16.9525 20.1738 12.5342C20.1738 8.1159 16.5921 4.53418 12.1738 4.53418C7.75555 4.53418 4.17383 8.1159 4.17383 12.5342C4.17383 16.9525 7.75555 20.5342 12.1738 20.5342ZM12.1738 22.5342C17.6967 22.5342 22.1738 18.057 22.1738 12.5342C22.1738 7.01133 17.6967 2.53418 12.1738 2.53418C6.65098 2.53418 2.17383 7.01133 2.17383 12.5342C2.17383 18.057 6.65098 22.5342 12.1738 22.5342Z"
        fill="#6F767E"
      />
      <path
        d="M8.17383 12.5342H12.1738M12.1738 12.5342H16.1738M12.1738 12.5342V8.53418M12.1738 12.5342V16.5342"
        stroke="#6F767E"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  ),
  filter: ({ ...props }) => (
    <svg
      width="21"
      height="21"
      viewBox="0 0 21 21"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M15.1738 8.86768H5.17383"
        stroke="#1A1D1F"
        strokeWidth="1.66667"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M17.6738 5.53418H2.67383"
        stroke="#1A1D1F"
        strokeWidth="1.66667"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M17.6738 12.2007H2.67383"
        stroke="#1A1D1F"
        strokeWidth="1.66667"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M15.1738 15.5342H5.17383"
        stroke="#1A1D1F"
        strokeWidth="1.66667"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  ),
  share: ({ ...props }) => (
    <svg
      width="18"
      height="21"
      viewBox="0 0 18 21"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M13.9491 0.40918C12.0851 0.40918 10.5741 1.92021 10.5741 3.78418C10.5741 3.98762 10.592 4.18685 10.6266 4.38038L5.71398 7.81921C5.68901 7.83667 5.66539 7.85534 5.64312 7.87508C5.07015 7.42655 4.34852 7.15918 3.56445 7.15918C1.70049 7.15918 0.189453 8.67025 0.189453 10.5342C0.189453 12.3981 1.70049 13.9092 3.56445 13.9092C4.34852 13.9092 5.07015 13.6418 5.64312 13.1933C5.66539 13.213 5.68901 13.2317 5.71398 13.2491L10.6266 16.688C10.592 16.8815 10.5741 17.0807 10.5741 17.2842C10.5741 19.1481 12.0851 20.6592 13.9491 20.6592C15.813 20.6592 17.3241 19.1481 17.3241 17.2842C17.3241 15.4202 15.813 13.9092 13.9491 13.9092C12.8558 13.9092 11.8839 14.429 11.2671 15.235L6.61552 11.9788C6.82324 11.5409 6.93945 11.0511 6.93945 10.5342C6.93945 10.0172 6.82324 9.5275 6.61552 9.08958L11.2671 5.83338C11.8839 6.63935 12.8558 7.15918 13.9491 7.15918C15.813 7.15918 17.3241 5.64815 17.3241 3.78418C17.3241 1.92021 15.813 0.40918 13.9491 0.40918ZM12.1318 3.78418C12.1318 2.78051 12.9454 1.96687 13.9491 1.96687C14.9527 1.96687 15.7664 2.78051 15.7664 3.78418C15.7664 4.78785 14.9527 5.60149 13.9491 5.60149C12.9454 5.60149 12.1318 4.78785 12.1318 3.78418ZM3.56445 8.71687C2.56078 8.71687 1.74715 9.53051 1.74715 10.5342C1.74715 11.5379 2.56078 12.3515 3.56445 12.3515C4.56813 12.3515 5.38176 11.5379 5.38176 10.5342C5.38176 9.53051 4.56813 8.71687 3.56445 8.71687ZM13.9491 15.4669C12.9454 15.4669 12.1318 16.2805 12.1318 17.2842C12.1318 18.2879 12.9454 19.1015 13.9491 19.1015C14.9527 19.1015 15.7664 18.2879 15.7664 17.2842C15.7664 16.2805 14.9527 15.4669 13.9491 15.4669Z"
        fill="#101828"
      />
    </svg>
  ),
  edit: ({ ...props }) => (
    <svg
      width="19"
      height="19"
      viewBox="0 0 19 19"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M13.3398 2.03411C13.5587 1.81524 13.8186 1.64162 14.1045 1.52317C14.3905 1.40472 14.697 1.34375 15.0065 1.34375C15.316 1.34375 15.6225 1.40472 15.9085 1.52317C16.1945 1.64162 16.4543 1.81524 16.6732 2.03411C16.892 2.25298 17.0657 2.51281 17.1841 2.79878C17.3026 3.08475 17.3635 3.39124 17.3635 3.70077C17.3635 4.0103 17.3026 4.3168 17.1841 4.60277C17.0657 4.88873 16.892 5.14857 16.6732 5.36744L5.42318 16.6174L0.839844 17.8674L2.08984 13.2841L13.3398 2.03411Z"
        stroke="#667085"
        strokeWidth="1.66667"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  ),
  btc: ({ ...props }) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={12}
      height={12}
      fill="none"
      {...props}
    >
      <g clipPath="url(#a)">
        <path
          fill="#F7931A"
          d="M11.82 7.451A5.998 5.998 0 1 1 .18 4.55 5.998 5.998 0 0 1 11.82 7.45Z"
        />
        <path
          fill="#fff"
          d="M8.646 5.145c.12-.798-.488-1.228-1.32-1.514l.27-1.082-.658-.164-.262 1.054c-.174-.044-.351-.084-.528-.125l.264-1.06-.658-.164-.27 1.081a21.747 21.747 0 0 1-.42-.098l.001-.004-.908-.226-.175.703s.488.112.478.119c.267.066.315.243.307.383L4.46 5.28a.536.536 0 0 1 .068.022l-.07-.018-.43 1.727c-.033.08-.115.202-.302.156.007.01-.478-.12-.478-.12l-.327.754.857.214c.16.04.315.082.47.12L3.974 9.23l.657.164.27-1.082c.18.048.354.093.525.136l-.27 1.077.66.164.272-1.092c1.122.213 1.967.127 2.322-.888.286-.818-.014-1.29-.605-1.597.43-.1.754-.382.84-.967Zm-1.504 2.11c-.203.817-1.58.375-2.026.264l.361-1.45c.447.112 1.878.333 1.665 1.185Zm.204-2.122c-.186.744-1.332.366-1.703.273l.328-1.314c.371.093 1.568.265 1.375 1.041Z"
        />
      </g>
      <defs>
        <clipPath id="a">
          <path fill="#fff" d="M.001 0h12v12H0z" />
        </clipPath>
      </defs>
    </svg>
  ),
  eth: ({ ...props }) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={12}
      height={12}
      fill="none"
      {...props}
    >
      <g clipPath="url(#a)">
        <path fill="#627EEA" d="M5.998 12a6 6 0 1 0 0-12 6 6 0 0 0 0 12Z" />
        <path
          fill="#fff"
          fillOpacity={0.602}
          d="M6.185 1.5v3.326l2.811 1.256L6.185 1.5Z"
        />
        <path fill="#fff" d="M6.185 1.5 3.373 6.083l2.812-1.257V1.5Z" />
        <path
          fill="#fff"
          fillOpacity={0.602}
          d="M6.185 8.238v2.26l2.813-3.892-2.813 1.632Z"
        />
        <path fill="#fff" d="M6.185 10.498v-2.26L3.373 6.605l2.812 3.892Z" />
        <path
          fill="#fff"
          fillOpacity={0.2}
          d="m6.185 7.715 2.811-1.633-2.811-1.255v2.888Z"
        />
        <path
          fill="#fff"
          fillOpacity={0.602}
          d="m3.373 6.082 2.812 1.633V4.827L3.373 6.082Z"
        />
      </g>
      <defs>
        <clipPath id="a">
          <path fill="#fff" d="M0 0h12v12H0z" />
        </clipPath>
      </defs>
    </svg>
  ),
  tron: ({ ...props }) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      data-name="Calque 1"
      width={12}
      height={12}
      viewBox="0 0 64 64"
      {...props}
    >
      <title>{'tron'}</title>
      <path
        d="M61.55 19.28c-3-2.77-7.15-7-10.53-10l-.2-.14a3.82 3.82 0 0 0-1.11-.62C41.56 7 3.63-.09 2.89 0a1.4 1.4 0 0 0-.58.22l-.19.15a2.23 2.23 0 0 0-.52.84l-.05.13v.82C5.82 14.05 22.68 53 26 62.14c.2.62.58 1.8 1.29 1.86h.16c.38 0 2-2.14 2-2.14S58.41 26.74 61.34 23a9.46 9.46 0 0 0 1-1.48 2.41 2.41 0 0 0-.79-2.24Zm-24.67 4.09 12.36-10.25 7.25 6.68Zm-4.8-.67L10.8 5.26l34.43 6.35ZM34 27.27l21.78-3.51-24.9 30ZM7.91 7 30.3 26l-3.24 27.78Z"
        style={{
          fill: '#ff060a',
        }}
      />
    </svg>
  ),
  usdt: ({ ...props }) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={12}
      height={12}
      fill="none"
      {...props}
    >
      <g clipPath="url(#a)">
        <path fill="#26A17B" d="M6 12A6 6 0 1 0 6 0a6 6 0 0 0 0 12Z" />
        <path
          fill="#fff"
          fillRule="evenodd"
          d="M6.72 6.519v-.001c-.04.003-.253.016-.728.016-.378 0-.645-.012-.739-.016v.001c-1.458-.064-2.546-.318-2.546-.622 0-.303 1.088-.557 2.546-.622v.991c.095.007.368.023.746.023.452 0 .68-.019.722-.022v-.992c1.455.065 2.54.32 2.54.622 0 .304-1.085.557-2.54.622Zm0-1.347v-.887h2.03V2.932H3.224v1.353h2.03v.887c-1.65.076-2.89.403-2.89.794 0 .392 1.24.718 2.89.795v2.843h1.468V6.76c1.647-.076 2.885-.403 2.885-.794 0-.39-1.238-.718-2.885-.794Z"
          clipRule="evenodd"
        />
      </g>
      <defs>
        <clipPath id="a">
          <path fill="#fff" d="M0 0h12v12H0z" />
        </clipPath>
      </defs>
    </svg>
  ),
  copy: ({ ...props }) => (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M5 9.16664C5 6.80962 5 5.63111 5.73223 4.89887C6.46447 4.16664 7.64297 4.16664 10 4.16664H12.5C14.857 4.16664 16.0355 4.16664 16.7677 4.89887C17.5 5.63111 17.5 6.80962 17.5 9.16664V13.3333C17.5 15.6903 17.5 16.8688 16.7677 17.6011C16.0355 18.3333 14.857 18.3333 12.5 18.3333H10C7.64297 18.3333 6.46447 18.3333 5.73223 17.6011C5 16.8688 5 15.6903 5 13.3333V9.16664Z"
        stroke="#1C274C"
        strokeWidth="1.25"
      />
      <path
        opacity="0.5"
        d="M5 15.8333C3.61929 15.8333 2.5 14.7141 2.5 13.3333V8.33331C2.5 5.19061 2.5 3.61927 3.47631 2.64295C4.45262 1.66664 6.02397 1.66664 9.16667 1.66664H12.5C13.8807 1.66664 15 2.78593 15 4.16664"
        stroke="#1C274C"
        strokeWidth="1.25"
      />
    </svg>
  ),
  shareLink: ({ ...props }) => (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M11.666 10C11.666 12.3012 9.80052 14.1667 7.49935 14.1667H5.83268C3.5315 14.1667 1.66602 12.3012 1.66602 10C1.66602 7.69886 3.5315 5.83337 5.83268 5.83337H6.24935M8.33268 10C8.33268 7.69886 10.1982 5.83337 12.4993 5.83337H14.166C16.4672 5.83337 18.3327 7.69886 18.3327 10C18.3327 12.3012 16.4672 14.1667 14.166 14.1667H13.7493"
        stroke="#667085"
        strokeWidth="1.66667"
        strokeLinecap="round"
      />
    </svg>
  ),
  logo: ({ ...props }) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      width={46}
      height={48}
      fill="none"
      {...props}
    >
      <path fill="url(#a)" d="M0 0h46v48H0z" />
      <defs>
        <pattern
          id="a"
          width={1}
          height={1}
          patternContentUnits="objectBoundingBox"
        >
          <use
            xlinkHref="#b"
            transform="matrix(.01154 0 0 .01106 -.125 -.125)"
          />
        </pattern>
        <image
          xlinkHref="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAYAAAABxCAMAAADroISFAAADAFBMVEVHcEz///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////8hisj///////////8op+v///////////////8hiscnoOP///////////8ijMv///////////////8jktMijc0ii8n///////////////////////////8ijMv///////////////////////8hicYijcsijcsijs0kmNohiscij84jltf///////////////////////////////////8mouj////////////////////////////l//8ikdEjkdIhi8gkl9kjk9Qmn+QlneIhjcshicUqtfX///////////////////////////////////////////8hi8kkmNww0/////////////////////////8jkdIjltghicUij80jlNUhjMohisgikM8hjMkikdH///847f////////////////////////////////////////////////////////////8jkNAhi8n///////////////8iisgikNEhisgijcwjkM8jk9QhicYhiccijs4hi8kjldj///////////8nqO8hh8Ukmdv///8ij87///////////////////////8hi8ghh8Qijcwijcskltf///8hicYjkM0ghb////8gh8P///8gg70ij84kmNoijcwijcsii8n///8hh8MhiMQWgsEhiMUhicUahMIYg8Fhq9UchcIhh8T////3+/0ehsJFnM0hh8IghsMtj8dap9P5+/14t9tSo9Hm8fg2lMoUgcCOw+Go0OiGv9/D3++DvN1xs9ogh8NNn8/U6PS82u3H4vE/mMzv9vpssNfo8vjd7fbq9Pr0+fwpjcbi7/ex1Omv1OmcyeSayeR/u93n8fhortaDu93l8PfocXfCAAAAynRSTlMAsllyY55OYIq0ptYClArMCdSdhxRQYZjnXAO3mwviIvLu6boeUQv4D/r97A40G7jJQozgoD2Y3cNFMmvZSxPQwKuQ9ebS8KqciiH3gUiu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"
          id="b"
          width={384}
          height={113}
        />
      </defs>
    </svg>
  ),
  logo2: ({ ...props }) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      width={47}
      height={53}
      fill="none"
      {...props}
    >
      <path fill="url(#a)" d="M.133.711h46.16v51.59H.133z" />
      <defs>
        <pattern
          id="a"
          width={1}
          height={1}
          patternContentUnits="objectBoundingBox"
        >
          <use
            xlinkHref="#b"
            transform="matrix(.01256 0 0 .01153 -.177 -.15)"
          />
        </pattern>
        <image
          xlinkHref="data:image/png;base64,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"
          id="b"
          width={384}
          height={114}
        />
      </defs>
    </svg>
  ),
  lock: ({ ...props }) => (
    <svg
      width="14"
      height="14"
      viewBox="0 0 14 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M2.78125 5.78412V4.5C2.78125 2.17005 4.67005 0.28125 7 0.28125C9.32994 0.28125 11.2188 2.17005 11.2188 4.5V5.78412C11.9155 5.83619 12.3692 5.9675 12.7008 6.29919C13.25 6.84838 13.25 7.73225 13.25 9.5C13.25 11.2677 13.25 12.1516 12.7008 12.7008C12.1516 13.25 11.2677 13.25 9.5 13.25H4.5C2.73223 13.25 1.84835 13.25 1.29918 12.7008C0.75 12.1516 0.75 11.2677 0.75 9.5C0.75 7.73225 0.75 6.84838 1.29918 6.29919C1.63082 5.9675 2.08453 5.83619 2.78125 5.78412ZM3.71875 4.5C3.71875 2.68782 5.18782 1.21875 7 1.21875C8.81219 1.21875 10.2812 2.68782 10.2812 4.5V5.75225C10.0419 5.75 9.78219 5.75 9.5 5.75H4.5C4.21781 5.75 3.95813 5.75 3.71875 5.75225V4.5Z"
        fill="#667085"
      />
    </svg>
  ),
  wallet: ({ ...props }) => (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M6 8H10"
        stroke="#2A85FF"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M20.8333 9H18.2308C16.4465 9 15 10.3431 15 12C15 13.6569 16.4465 15 18.2308 15H20.8333C20.9167 15 20.9583 15 20.9935 14.9979C21.5328 14.965 21.9623 14.5662 21.9977 14.0654C22 14.0327 22 13.994 22 13.9167V10.0833C22 10.006 22 9.96726 21.9977 9.9346C21.9623 9.43384 21.5328 9.03496 20.9935 9.00214C20.9583 9 20.9167 9 20.8333 9Z"
        stroke="#2A85FF"
        strokeWidth="1.5"
      />
      <path
        d="M20.965 9C20.8873 7.1277 20.6366 5.97975 19.8284 5.17157C18.6569 4 16.7712 4 13 4H10C6.22876 4 4.34315 4 3.17157 5.17157C2 6.34315 2 8.22876 2 12C2 15.7712 2 17.6569 3.17157 18.8284C4.34315 20 6.22876 20 10 20H13C16.7712 20 18.6569 20 19.8284 18.8284C20.6366 18.0203 20.8873 16.8723 20.965 15"
        stroke="#2A85FF"
        strokeWidth="1.5"
      />
      <path
        d="M17.9902 12H17.9992"
        stroke="#2A85FF"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  ),
  send: ({ ...props }) => (
    <svg
      width="20"
      height="18"
      viewBox="0 0 20 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M9.5003 9H3.41872M3.24634 9.7972L2.24158 12.7986C1.69128 14.4424 1.41613 15.2643 1.61359 15.7704C1.78506 16.21 2.15335 16.5432 2.6078 16.6701C3.13111 16.8161 3.92151 16.4604 5.50231 15.7491L15.6367 11.1886C17.1797 10.4942 17.9512 10.1471 18.1896 9.6648C18.3968 9.2458 18.3968 8.7541 18.1896 8.3351C17.9512 7.8529 17.1797 7.5057 15.6367 6.81135L5.48483 2.24303C3.90879 1.53382 3.12078 1.17921 2.59799 1.32468C2.14397 1.45101 1.77572 1.78336 1.60365 2.22209C1.40551 2.72728 1.67772 3.54741 2.22215 5.18767L3.24829 8.2793C3.34179 8.561 3.38855 8.7019 3.407 8.8459C3.42338 8.9738 3.42321 9.1032 3.40651 9.231C3.38768 9.375 3.34057 9.5157 3.24634 9.7972Z"
        stroke="#2A85FF"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  ),
  eyeOff: ({ ...props }) => (
    <svg
      height="16"
      strokeLinejoin="round"
      viewBox="0 0 16 16"
      width="16"
      {...props}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M0.191137 2.06228L0.751694 2.56055L14.2517 14.5605L14.8122 15.0588L15.8088 13.9377L15.2482 13.4394L13.4399 11.832L16.3183 8.48938V7.51059L13.1149 3.79053C10.6442 0.921301 6.36413 0.684726 3.59378 3.07992L1.74824 1.43943L1.18768 0.941162L0.191137 2.06228ZM14.7602 7.99998L12.3187 10.8354L10.6699 9.36978C11.249 8.24171 11.0661 6.82347 10.1213 5.87865C9.08954 4.8469 7.49326 4.72376 6.32676 5.50923L4.72751 4.08767C6.88288 2.36327 10.1023 2.59076 11.9783 4.76931L14.7602 7.99998ZM7.52702 6.57613L9.46929 8.30259C9.56713 7.82531 9.43091 7.30959 9.06063 6.93931C8.64578 6.52446 8.0484 6.4034 7.52702 6.57613ZM-0.318359 7.51059L1.40386 5.5106L2.54051 6.48938L1.23971 7.99998L4.02168 11.2307C5.52853 12.9805 7.90301 13.4734 9.89972 12.7017L10.4405 14.1008C7.88008 15.0904 4.82516 14.4625 2.88503 12.2094L-0.318359 8.48938V7.51059Z"
        fill="currentColor"
      ></path>
    </svg>
  ),
  eye: ({ ...props }) => (
    <svg
      height="16"
      strokeLinejoin="round"
      viewBox="0 0 16 16"
      width="16"
      {...props}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M4.02168 4.76932C6.11619 2.33698 9.88374 2.33698 11.9783 4.76932L14.7602 7.99999L11.9783 11.2307C9.88374 13.663 6.1162 13.663 4.02168 11.2307L1.23971 7.99999L4.02168 4.76932ZM13.1149 3.79054C10.422 0.663244 5.57797 0.663247 2.88503 3.79054L-0.318359 7.5106V8.48938L2.88503 12.2094C5.57797 15.3367 10.422 15.3367 13.1149 12.2094L16.3183 8.48938V7.5106L13.1149 3.79054ZM6.49997 7.99999C6.49997 7.17157 7.17154 6.49999 7.99997 6.49999C8.82839 6.49999 9.49997 7.17157 9.49997 7.99999C9.49997 8.82842 8.82839 9.49999 7.99997 9.49999C7.17154 9.49999 6.49997 8.82842 6.49997 7.99999ZM7.99997 4.99999C6.34311 4.99999 4.99997 6.34314 4.99997 7.99999C4.99997 9.65685 6.34311 11 7.99997 11C9.65682 11 11 9.65685 11 7.99999C11 6.34314 9.65682 4.99999 7.99997 4.99999Z"
        fill="currentColor"
      ></path>
    </svg>
  ),
  admin: ({ ...props }) => (
    <svg
      height="16"
      strokeLinejoin="round"
      viewBox="0 0 16 16"
      width="16"
      {...props}
    >
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M0 1C0 0.447716 0.447715 0 1 0H15C15.5523 0 16 0.447716 16 1V10C16 10.5523 15.5523 11 15 11H12.5V9.5H14.5V1.5H1.5V9.5H3.5V11H1C0.447715 11 0 10.5523 0 10V1ZM8 14C6.84509 14 5.76659 14.5772 5.12596 15.5381L5 15.7271V16H3.5V15.5V15.2729L3.62596 15.084L3.87789 14.7061C4.79671 13.3278 6.34356 12.5 8 12.5C9.65644 12.5 11.2033 13.3278 12.1221 14.7061L12.374 15.084L12.5 15.2729V15.5V16H11V15.7271L10.874 15.5381C10.2334 14.5772 9.15491 14 8 14ZM7.75 6C6.50736 6 5.5 7.00736 5.5 8.25V8.75C5.5 9.99264 6.50736 11 7.75 11H8.25C9.49264 11 10.5 9.99264 10.5 8.75V8.25C10.5 7.00736 9.49264 6 8.25 6H7.75ZM7 8.25C7 7.83579 7.33579 7.5 7.75 7.5H8.25C8.66421 7.5 9 7.83579 9 8.25V8.75C9 9.16421 8.66421 9.5 8.25 9.5H7.75C7.33579 9.5 7 9.16421 7 8.75V8.25Z"
        fill="currentColor"
      ></path>
    </svg>
  ),
};

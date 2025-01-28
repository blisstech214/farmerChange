// routes
// import { PATH_DASHBOARD } from "../../../routes/paths";
// components
// import Label from "../../../Components/label";
// import Iconify from "../../../muiComponents/iconify";
import SvgColor from "../../../muiComponents/svg-color";
import { MdDashboard, MdOutlineDeleteOutline } from "react-icons/md";
import {
  FaBriefcase,
  FaDotCircle,
  FaEnvelopeOpenText,
  FaStarOfLife,
  FaThList,
  FaUser,
  FaUserCheck,
  FaUserCog,
} from "react-icons/fa";
import { FaClipboardList } from "react-icons/fa";
import { ImProfile } from "react-icons/im";
import { FaGoogleDrive } from "react-icons/fa";

import { IoMdSettings } from "react-icons/io";
import {
  BsEnvelopePaperFill,
  BsFillBellFill,
  BsFillPersonVcardFill,
  BsQuestionCircle,
} from "react-icons/bs";
import { BiFileFind, BiSolidContact, BiSupport } from "react-icons/bi";
import {
  AiFillStar,
  AiOutlineFileText,
  AiTwotoneFileText,
} from "react-icons/ai";
// ----------------------------------------------------------------------

const icon = (name) => (
  <SvgColor
    src={`/assets/icons/navbar/${name}.svg`}
    sx={{ width: 1, height: 1 }}
  />
);

const ICONS = {
  blog: icon("ic_blog"),
  cart: icon("ic_cart"),
  chat: icon("ic_chat"),
  mail: icon("ic_mail"),
  user: icon("ic_user"),
  file: icon("ic_file"),
  lock: icon("ic_lock"),
  label: icon("ic_label"),
  blank: icon("ic_blank"),
  kanban: icon("ic_kanban"),
  folder: icon("ic_folder"),
  banking: icon("ic_banking"),
  booking: icon("ic_booking"),
  invoice: icon("ic_invoice"),
  calendar: icon("ic_calendar"),
  disabled: icon("ic_disabled"),
  external: icon("ic_external"),
  menuItem: icon("ic_menu_item"),
  ecommerce: icon("ic_ecommerce"),
  analytics: icon("ic_analytics"),
  dashboard: icon("ic_dashboard"),
};

const navConfig = [
  // MANAGEMENT
  // ----------------------------------------------------------------------
  {
    subheader: "Dashboard",
    permission: "dashboard-subheader-root",
    items: [
      // DASHBOARD
      {
        permission: "dashboard-root",
        title: "Dashboard",
        path: "/master/dashboard",
        icon: <MdDashboard size={16} />,
      },
    ],
  },

  // APP
  // ----------------------------------------------------------------------
  {
    subheader: "Management",
    permission: "management-subheader-root",
    items: [
      {
        permission: "driver-root",
        title: "User Management",
        icon: <FaUserCog size={16} />,
        path: "/master/User",
        children: [
          {
            permission: "driver-drivers",
            title: "Customer's",
            path: "/master/User/Customers",
            icon: <FaDotCircle size={16} />,
          },
          {
            permission: "driver-drivers",
            title: "Collection Center's",
            path: "/master/User/collection",
            icon: <FaDotCircle size={16} />,
          },
          {
            permission: "driver-drivers",
            title: "Farmer's",
            path: "/master/User/farmer",
            icon: <FaDotCircle size={16} />,
          },
        ],
      },
      {
        permission: "customer-root",
        title: "Order Management",
        icon: <FaClipboardList size={16} />,
        path: "/master/customer/Order",
        // children: [
        //   {
        //     permission: "customer-company",
        //     title: "Companies",
        //     path: "/master/customer/users",
        //     icon: <FaDotCircle size={16} />,
        //   },
        //   {
        //     permission: "customers-customers",
        //     title: "Customers",
        //     path: "/master/customer/customers",
        //     icon: <FaDotCircle size={16} />,
        //   },
        // ],
      },
      {
        permission: "job-root",
        title: "ProfileManagement",
        icon: <ImProfile size={16} />,
        path: "/farmer/cc/",
        children: [
          {
            permission: "job-jobs",
            title: "Farmer's",
            path: "/farmer/cc/FarmerManagement",
            icon: <FaDotCircle size={16} />,
          },
          {
            permission: "job-job-deleted",
            title: "Connection Center's",
            path: "/farmer/cc/CcManagement",
            icon: <FaDotCircle size={18} />,
          },
        ],
      },

      {
        permission: "page-setting-root",
        title: "Driver Management",
        icon: <FaGoogleDrive size={16} />,
        path: "/Drive/Manage",
        // children: [
        //   {
        //     permission: "page-setting-about",
        //     title: "About Us ",
        //     path: "/master/setting/aboutus/add",
        //     icon: <BsFillPersonVcardFill size={16} />,
        //   },
        //   {
        //     permission: "page-setting-privacy-policy",
        //     title: "Privacy Policy",
        //     path: "/master/setting/privacy-policy/add",
        //     icon: <AiTwotoneFileText size={16} />,
        //   },
        //   {
        //     permission: "page-setting-faq",
        //     title: "FAQ",
        //     path: "/master/setting/faq/add",
        //     icon: <BsQuestionCircle size={16} />,
        //   },
        //   {
        //     permission: "page-setting-contact",
        //     title: "Contact Us",
        //     path: "/master/setting/contactus/add",
        //     icon: <BiSolidContact size={16} />,
        //   },
        //   {
        //     permission: "page-setting-term-condition",
        //     title: "Terms & Conditions",
        //     path: "/master/setting/term-and-conditions/add",
        //     icon: <FaStarOfLife size={16} />,
        //   },
        // ],
      },
      // {
      //   permission: "sub-admin-root",
      //   title: "Commission Management",
      //   icon: <FaUserCheck size={16} />,
      //   path: "/master/sub-admin",
      //    // children: [
      //   //   {
      //   //     permission: "sub-admin-sub-admin",
      //   //     title: "Sub Admin",
      //   //     path: "/master/sub-admin/list",
      //   //     icon: <FaDotCircle size={16} />,
      //   //   },
      //   // ],
      // },
      // {
      //   permission: "job-root",
      //   title: "Analytics and Reporting",
      //   icon: <FaBriefcase size={16} />,
      //   path: "/master/subscription",
      //   children: [
      //     {
      //       permission: "job-jobs",
      //       title: "Analytics",
      //       path:"/master/subscription/subscriptions",
      //       icon: <BsFillPersonVcardFill size={16} />,
      //     },
      //     {
      //       permission: "job-job-deleted",
      //       title: "Report",
      //       path:"/master/subscription/subscriptions",
      //       icon: <MdOutlineDeleteOutline size={18} />,
      //     },
      //   ],
      // },
      // {
      //   permission: "blog-root",
      //   title: "Notifications & Communication",
      //   icon: <FaThList size={16} />,
      //   path: "/master/blog/blogs",
      // },
      // {
      //   permission: "testimonial-root",
      //   title: "License Fee Management",
      //   icon: <AiFillStar size={16} />,
      //   path: "/master/review/review-ratings",
      // },
      // {
      //   permission: "news-letter-root",
      //   title: "Settings and Configuration",
      //   icon: <FaEnvelopeOpenText size={16} />,
      //   path: "/master/newsletter/newsletters",
      // },
      // {
      //   permission: "notification-management-root",
      //   title: "Security and Access Control",
      //   icon: <BsFillBellFill size={16} />,
      //   path: "/master/notificationmanagement/notificationmanagements",
      // },
      // {
      //   permission: "notification-management-root",
      //   title: "Feedback and Support",
      //   icon: <BiSupport size={16} />,
      //   path: "/master/notificationmanagement/notificationmanagements",
      // },
      // {
      //   permission: "notification-management-root",
      //   title: "Integration and Scalability",
      //   icon: <BsEnvelopePaperFill size={16} />,
      //   path: "/master/notificationmanagement/notificationmanagements",
      // },
    ],
  },
];

export default navConfig;

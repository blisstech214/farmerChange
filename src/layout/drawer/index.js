import * as React from "react";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import ExpandMore from "@mui/icons-material/ExpandMore";
import { AppBar, Drawer, DrawerHeader } from "../styledLayout";
import faceImg from "../../Assets/images/faces/face28.jpg";
import { BiSolidBriefcase, BiSolidContact, BiSupport } from "react-icons/bi";
import { Link, useLocation, useNavigate } from "react-router-dom";import { IoMdContact } from "react-icons/io";


import {
  FaUserAlt,
  FaUserCog,
  FaBuilding,
  FaIdCard,
  FaFileInvoice,
  FaRegQuestionCircle,
  FaUserCheck,
  FaThList,
  FaStar,
  FaEnvelopeOpenText,
  FaBell,
} from "react-icons/fa";
import { IoMdSettings } from "react-icons/io";
import { MdDashboard } from "react-icons/md";
import { LiaStarOfLifeSolid } from "react-icons/lia";
import { Avatar, Collapse, Menu, MenuItem, Stack } from "@mui/material";
import { BsDot } from "react-icons/bs";
import Logo from "../../Assets/images/admin/CS-LOGO-HORIZONTAL.png";
import { Logout, PowerSettingsNew } from "@mui/icons-material";
import { useAuthContext } from "../../auth/useAuthContext";
import { includes } from "lodash";
import { NavSectionVertical } from "../../muiComponents/nav-section";
import useMenu from "../../hooks/useMenu";
// import navConfig from "./nav/config-navigation";

const MuiDrawer = ({ children }) => {
  const theme = useTheme();
  const navigate = useNavigate();
  const [open, setOpen] = React.useState(true);
  const [hover, setHover] = React.useState(null);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [activeParent, setActiveParent] = React.useState(false);
  const { navConfigMenu } = useMenu();
  const openDropDown = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const { logout } = useAuthContext();
  const handleLogOut = () => {
    logout();
    setAnchorEl(null);
    navigate("/");
  };

  const handleHover = (hoverId, key = "parent") => {
    sideNavData.map((elem, index) => {
      if (key === "parent") {
        if (elem.id == hoverId) {
          setHover(elem.id);
        }
      } else {
        elem?.children &&
          elem?.children.length > 0 &&
          elem?.children.map((childElem) => {
            if (childElem.id == hoverId) {
              setHover(childElem.id);
            }
          });
      }
    });
  };

  const handleDrawerOpen = () => {
    setOpen(!open);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  let sideNavData = [
    {
      id: "1",
      title: "Dashboard",
      icon: <MdDashboard size={16} />,
      link: "/master/dashboard",
      type: "dashboard",
      faIcon: "fas fa-th-large",
    },
    {
      id: "2",
      title: "Drivers",
      icon: <FaUserCog size={16} />,
      type: "driver",
      faIcon: "fas fa-user-cog",
      link: "/master/driver",
      children: [
        {
          id: 17,
          title: "Drivers",
          icon: <BsDot size={16} />,
          link: "/master/driver",
        },
      ],
    },

    {
      id: "4",
      title: "Customers",
      icon: <FaUserAlt size={16} />,
      type: "customer",
      faIcon: "fas fa-user",
      link: "/master/customer",
      children: [
        {
          id: 18,
          title: "Companies",
          icon: <BsDot size={16} />,
          link: "/master/user",
        },
        {
          id: 19,
          title: "Customers",
          icon: <BsDot size={16} />,
          link: "/master/customer",
        },
      ],
    },
    {
      id: "6",
      title: "Jobs",
      icon: <BiSolidBriefcase size={16} />,
      type: "ride",
      faIcon: "fas fa-briefcase",
      link: "/master/ride",
    },
    {
      id: "5",
      title: "Page Settings",
      icon: <IoMdSettings size={16} />,
      type: "ride",
      faIcon: "fas fa-briefcase",
      link: "/master/about",
      children: [
        {
          id: "7",
          title: "About Us",
          icon: <FaIdCard size={16} />,
          link: "/master/about/add",
          type: "ride",
          faIcon: "fas fa-address-card",
        },
        {
          id: "8",
          title: "Privacy Policy",
          icon: <FaFileInvoice size={16} />,
          link: "/master/privacy/add",
          type: "privacy",
          faIcon: "fas fa-file-invoice",
        },
        {
          id: "9",
          title: "FAQ",
          icon: <FaRegQuestionCircle size={16} />,
          link: "/master/faq/add",
          type: "faq",
          faIcon: "fas fa-question-circle",
        },
        {
          id: "10",
          title: "Contact Us",
          icon: <BiSolidContact size={16} />,
          link: "/master/contactlist/add",
          type: "contact",
          faIcon: "fas fa-address-book",
        },
        {
          id: "20",
          title: "Terms & Conditions",
          icon: <LiaStarOfLifeSolid size={16} />,
          link: "/master/terms/add",
          type: "terms",
          faIcon: "fas fa-address-book",
        },
      ],
    },

    {
      id: "11",
      title: "Sub Admin",
      icon: <FaUserCheck size={16} />,
      type: "subadmin",
      faIcon: "fas fa-user-check",
      link: "/master/subadmin",
      children: [
        {
          id: 20,
          title: "Sub Admin",
          icon: <BsDot size={16} />,
          link: "/master/subadmin",
        },
      ],
    },
    {
      id: "12",
      title: "Blogs",
      icon: <FaThList size={16} />,
      link: "/master/blog",
      type: "blog",
      faIcon: "fas fa-th-list",
    },
    {
      id: "13",
      title: "Supports",
      icon: <BiSupport size={16} />,
      link: "/master/support",
      type: "support",
      faIcon: "fas fa-headset",
    },
    {
      id: "14",
      title: "Reviews & Ratings",
      icon: <FaStar size={16} />,
      link: "/master/review-rating",
      type: "review",
      faIcon: "fas fa-star",
    },
    {
      id: "15",
      title: "News Letter",
      icon: <FaEnvelopeOpenText size={16} />,
      link: "/master/newsletter",
      type: "newsletter",
      faIcon: "fas fa-envelope-open-text",
    },
    {
      id: "16",
      title: "Notification Management",
      icon: <FaBell size={16} />,
      link: "/master/notificationmanagement",
      type: "notification",
      faIcon: "fas fa-bell",
    },
  ];
  const navRoute = useLocation();
  const [accordianOpen, setAcordianOpen] = React.useState(false);

  const handleCollapse = (panel) => (event, isExpanded) => {
    if (accordianOpen !== panel) {
      setAcordianOpen(panel);
    } else {
      setAcordianOpen(false);
    }
  };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar position="fixed" open={open} color="inherit">
        <Toolbar sx={{ justifyContent: "space-between" }}>
          <Stack direction="row" spacing={3} alignItems="center">
            {/* <Box component="div">
              <img src={Logo}  style={{
                    width: "110px",
                    height: "36px",
                    objectFit: "contain",
                  }} alt="Logistic" />
            </Box> */}
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              edge="start"
              sx={{

                marginRight: 5,
                // ...(open && { display: "none" }),
                flexGrow: 1,
              }}
            >
              <MenuIcon />
            </IconButton>
          </Stack>
          <Stack direction="row" spacing={2} alignItems="center">
            <div className="navar-bell-section">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                className="bell-icon"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0"
                />
              </svg>

              <span className="bell-count">2</span>
            </div>

            <IconButton
  size="small"
  sx={{ ml: 2 }}
  onClick={handleClick}
  aria-controls={openDropDown ? "account-menu" : undefined}
  aria-haspopup="true"
  aria-expanded={openDropDown ? "true" : undefined}
>
  <IoMdContact size={50} alt="profile" />
</IconButton>

            <Menu
              anchorEl={anchorEl}
              id="account-menu"
              open={openDropDown}
              onClose={handleClose}
              onClick={handleClose}
              PaperProps={{
                elevation: 0,
                sx: {
                  overflow: "visible",
                  filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                  mt: 1.5,
                  "& .MuiAvatar-root": {
                    width: 32,
                    height: 32,
                    ml: -0.5,
                    mr: 1,
                  },
                  "&:before": {
                    content: '""',
                    display: "block",
                    position: "absolute",
                    top: 0,
                    right: 14,
                    width: 10,
                    height: 10,
                    bgcolor: "background.paper",
                    transform: "translateY(-50%) rotate(45deg)",
                    zIndex: 0,
                  },
                },
              }}
              transformOrigin={{ horizontal: "right", vertical: "top" }}
              anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
            >
              <MenuItem onClick={handleLogOut}>
                <ListItemIcon>
                  <PowerSettingsNew
                    fontSize="small"
                    sx={{ color: "#ff7534" }}
                  />
                </ListItemIcon>
                Logout
              </MenuItem>
            </Menu>
          </Stack>
        </Toolbar>
      </AppBar>
      <Drawer variant="permanent" open={open}>
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "rtl" ? (
              <ChevronRightIcon />
            ) : (
              <ChevronLeftIcon />
            )}
          </IconButton>
        </DrawerHeader>
        <Divider />
        {/* <List sx={{ padding: "0.5em 0.5em !important" }}> */}
        <NavSectionVertical data={navConfigMenu} />
        {/* {sideNavData.map((text, index) => {
            let activeRoute = false;
            if (text?.children && text?.children?.length > 0) {
              if (includes(text?.children, navRoute?.pathname)) {
                activeRoute = true;
              }

              return (
                <React.Fragment key={`parent-${index}`}>
                  <ListItemButton
                    onMouseOver={() => handleHover(text.id)}
                    onMouseLeave={() => setHover(false)}
                    onClick={handleCollapse(index + 1)}
                    sx={{
                      "&.MuiListItemText-root .MuiTypography-root ": {
                        color:
                          hover == text.id ||
                          navRoute.pathname == text.link ||
                          activeRoute === text.link
                            ? "#fff!important"
                            : null,
                        fontSize: "14px",
                      },
                      backgroundColor:
                        navRoute.pathname == text.link ||
                        activeRoute === text.link
                          ? "#ff7534"
                          : null,
                      "&:hover": {
                        backgroundColor: "#ff7534",
                      },
                      color:
                        hover == text.id ||
                        navRoute.pathname == text.link ||
                        activeRoute === text.link
                          ? "#fff!important"
                          : null,
                      "&.MuiListItemButton-root": {
                        padding: open ? "8px 20px" : "8px 5px",
                        paddingLeft: !open ? "14px !important" : "20px",
                      },
                      borderRadius:
                        navRoute.pathname == text.link ||
                        activeRoute === text.link
                          ? "0.5em 0.5em 0 0"
                          : "0.5em",
                    }}
                  >
                    <ListItemIcon
                      sx={{
                        "&.MuiListItemIcon-root": {
                          marginRight: open ? "20px" : "30px",
                          minWidth: "auto",
                        },
                        color:
                          hover == text.id ||
                          navRoute.pathname == text.link ||
                          activeRoute === text.link
                            ? "#fff"
                            : null,
                      }}
                    >
                      {text?.icon}
                    </ListItemIcon>
                    <ListItemText
                      sx={{
                        "&.MuiListItemText-root .MuiTypography-root": {
                          color:
                            hover == text.id ||
                            navRoute.pathname == text.link ||
                            activeRoute === text.link
                              ? "#fff"
                              : null,
                          fontSize: "14px",
                        },
                      }}
                      primary={text?.title}
                    />
                    {accordianOpen === index + 1 ? (
                      <ExpandMore
                        sx={{
                          color:
                            hover == text.id || navRoute.pathname == text.link
                              ? "#fff"
                              : null,
                          fontSize: "14px",
                        }}
                      />
                    ) : (
                      <NavigateNextIcon sx={{ fontSize: "14px" }} />
                    )}
                  </ListItemButton>

                  <Collapse
                    in={accordianOpen === index + 1}
                    timeout="auto"
                    unmountOnExit
                  >
                    <List component="div" disablePadding>
                      {text?.children &&
                        text?.children.map((child, childIndex) => {
                          return (
                            <ListItemButton
                              onMouseOver={() => handleHover(child.id, "child")}
                              onMouseLeave={() => setHover(false)}
                              LinkComponent={Link}
                              to={child?.link}
                              sx={{
                                justifyContent: open ? "initial" : "center",
                                backgroundColor:
                                  navRoute.pathname == child.link
                                    ? "#ff7534"
                                    : null,
                                "&:hover": {
                                  backgroundColor: "#ff7534",
                                  color: "#fff",
                                },

                                pl: open ? 4 : 2,
                              }}
                              key={`subChild-${childIndex}`}
                            >
                              <ListItemIcon
                                sx={{
                                  "&.MuiListItemIcon-root": {
                                    marginRight: open ? "20px" : "50px",
                                    minWidth: "auto",
                                  },
                                  color:
                                    hover == child.id ||
                                    navRoute.pathname == child.link
                                      ? "#fff"
                                      : null,
                                }}
                              >
                                {child?.icon}
                              </ListItemIcon>
                              <ListItemText
                                primary={child?.title}
                                sx={{
                                  "&.MuiListItemText-root .MuiTypography-root":
                                    {
                                      color:
                                        hover == child.id ||
                                        navRoute.pathname == child.link
                                          ? "#fff"
                                          : null,
                                      fontSize: "14px",
                                    },
                                }}
                              />
                            </ListItemButton>
                          );
                        })}
                    </List>
                  </Collapse>
                </React.Fragment>
              );
            } else {
              return (
                <ListItem
                  key={`parent-${index}`}
                  disablePadding
                  sx={{
                    display: "block",
                    color: "#fff",
                    borderRadius: "0.5em",
                    marginBottom: "0.2em",

                    backgroundColor:
                      navRoute.pathname == text.link ? "#ff7534" : null,
                  }}
                >
                  <ListItemButton
                    onMouseOver={() => handleHover(text.id)}
                    onMouseOut={() => setHover(false)}
                    sx={{
                      minHeight: 48,
                      borderRadius: "0.5em",
                      justifyContent: open ? "initial" : "center",
                      "&.MuiListItemButton-root": {
                        paddingRight: !open && "0px !important",
                      },
                      px: 2.5,
                      "&:hover": {
                        backgroundColor: "#ff7534",
                        color: "#fff !important",
                      },
                    }}
                    LinkComponent={Link}
                    to={text?.link}
                  >
                    <ListItemIcon
                      sx={{
                        "&.MuiListItemIcon-root": {
                          marginRight: "20px",
                        },
                        minWidth: 0,
                        color:
                          hover == text.id || navRoute.pathname == text.link
                            ? "#fff"
                            : null,
                        mr: open ? 3 : "auto",
                        justifyContent: "center",
                      }}
                    >
                      {text?.icon}
                    </ListItemIcon>
                    <ListItemText
                      primary={text?.title}
                      sx={{
                        "&.MuiListItemText-root .MuiTypography-root": {
                          color:
                            hover == text.id || navRoute.pathname == text.link
                              ? "#fff"
                              : null,
                        },

                        opacity: open ? 1 : 0,
                      }}
                    />
                  </ListItemButton>
                </ListItem>
              );
            }
          })} */}
        {/* </List> */}
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3, background: "#F5F7FF" }}>
        <Box
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            bottom: 0,
            right: 0,
            background: "#F5F7FF",
            zIndex: -1,
          }}
        />
        <DrawerHeader />
        {children}
      </Box>
    </Box>
  );
};

export default MuiDrawer;

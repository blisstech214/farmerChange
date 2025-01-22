import React from "react";
import navConfig from "../layout/drawer/nav/config-navigation";
import { apiAdminConfig } from "../utils/api";
import { useAuthContext } from "../auth/useAuthContext";
import { includes } from "lodash";

const useMenu = () => {
  const { user } = useAuthContext();
  const [navConfigMenu, setNavConfigMenu] = React.useState([]);
  const [permissions, setPermissions] = React.useState([]);

  const getMenus = async () => {
    await apiAdminConfig
      .get(`api/auth/master/admin/menus/${user?.id}`)
      .then((response) => {
        if (response.status === 200) {
          setPermissions(response?.data?.view_data);
        }
      })
      .catch((error) => {
        console.log("Menus Error", error);
      });
  };
  React.useEffect(() => {
    if (user && user?.user_type !== "superadmin") {
      getMenus();
    }
  }, [user]);
  const getData = async () => {
    let menus = [];

    navConfig.forEach((subHeader, subHeaderIndex) => {
      if (includes(permissions, subHeader?.permission)) {
        menus.push({
          subheader: subHeader?.subheader,
          permission: subHeader?.permission,
          items: [],
        });
        if (subHeader?.items && subHeader?.items?.length > 0) {
          subHeader?.items.forEach((Items, ItemIndex) => {
            if (includes(permissions, Items?.permission)) {
              if (Items?.children && Items?.children?.length > 0) {
                menus[subHeaderIndex]?.items.push({
                  title: Items?.title,
                  path: Items?.path,
                  icon: Items?.icon,
                  permission: Items?.permission,
                  children: Items?.children.map((children) => {
                    if (includes(permissions, children?.permission)) {
                      return {
                        title: children?.title,
                        path: children?.path,
                        permission: children?.permission,
                        icon: children?.icon,
                      };
                    }
                  }),
                });
              } else {
                menus[subHeaderIndex]?.items.push({
                  title: Items?.title,
                  path: Items?.path,
                  icon: Items?.icon,
                  permission: Items?.permission,
                  children: null,
                });
              }
            }
          });
        }
      }
    });

    await setNavConfigMenu(menus);
  };

  React.useEffect(() => {
    if (
      navConfig?.length > 0 &&
      user &&
      user?.user_type &&
      permissions?.length > 0
    ) {
      getData();
    } else {
      if (user?.user_type === "superadmin") {
        setNavConfigMenu(navConfig);
      }
    }
  }, [navConfig, user, permissions]);

  console.log("navConfigMenu", navConfigMenu);

  return {
    navConfigMenu,
    permissions,
  };
};

export default useMenu;

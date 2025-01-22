import * as React from "react";
import Box from "@mui/material/Box";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import { filter, forEach, indexOf } from "lodash";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import TreeView from "@mui/lab/TreeView";
import TreeItem from "@mui/lab/TreeItem";
const RolePermission = ({ permissions = [], formik }) => {
  const [checked, setChecked] = React.useState(formik.values.menus || []);
  const [expanded, setExpanded] = React.useState([]);
  const [selectAll, setSelectAll] = React.useState(false);

  const handleCheckedChange = (event, newValue, menuItem) => {
    let checkedAllParent = [];
    if (event.target.checked) {
      checkedAllParent.push(newValue);
      if (menuItem?.children && menuItem?.children?.length > 0) {
        forEach(menuItem?.children, (childItem) => {
          checkedAllParent.push(childItem?.permission);

          if (childItem?.children && childItem?.children?.length > 0) {
            forEach(childItem?.children, (subChild) => {
              checkedAllParent.push(subChild?.permission);
            });
          }
        });
      }
      setChecked([...checked, ...checkedAllParent]);
      formik.setFieldValue("menus", [...checked, ...checkedAllParent]);
    } else {
      checkedAllParent.push(newValue);
      if (menuItem?.children && menuItem?.children?.length > 0) {
        forEach(menuItem?.children, (childItem) => {
          checkedAllParent.push(childItem?.permission);

          if (childItem?.children && childItem?.children?.length > 0) {
            forEach(childItem?.children, (subChild) => {
              checkedAllParent.push(subChild?.permission);
            });
          }
        });
      }
      let filterValue = filter(
        checked,
        (unchecked) => indexOf(checkedAllParent, unchecked) == -1
      );
      setChecked(filterValue);
      formik.setFieldValue("menus", filterValue);
    }
  };

  const handleSelectAll = (e) => {
    if (e.target.checked) {
      let checkedValue = [];
      forEach(permissions, (subheader) => {
        let setSubheaderChecked = subheader?.permission;
        checkedValue.push(setSubheaderChecked);
        forEach(subheader?.items, (parentItem) => {
          let setParentChecked = parentItem?.permission;
          checkedValue.push(setParentChecked);

          if (parentItem?.children?.length) {
            forEach(parentItem?.children, (childItem) => {
              let setChildChecked = childItem?.permission;
              checkedValue.push(setChildChecked);

              if (childItem?.children && childItem?.children !== null) {
                forEach(childItem?.children, (subChildItem) => {
                  let setSubChildChecked = subChildItem?.permission;
                  checkedValue.push(setSubChildChecked);
                });
              }
            });
          }
        });
      });
      setChecked(checkedValue);
      formik.setFieldValue("menus", checkedValue);
      setSelectAll(true);
    } else {
      setChecked(["dashboard-subheader-root", "management-subheader-root"]);
      setSelectAll(false);
      formik.setFieldValue("menus", []);
    }
  };

  const handleToggle = (event, nodeIds) => {
    setExpanded(nodeIds);
  };

  console.log("permissionspermissions", formik.values.menus);
  return (
    <div style={{ textAlign: "left" }}>
      <FormControlLabel
        sx={{ textTransform: "capitalize" }}
        label="Select All"
        control={
          <Checkbox
            // checked={checked.includes(parentItem?.permission)}
            onChange={(e) => {
              setChecked([]);
              handleSelectAll(e);
            }}
          />
        }
        onClick={(e) => e.stopPropagation()}
        disabled={false}
      />
      <TreeView
        aria-label="controlled"
        defaultCollapseIcon={<ExpandMoreIcon />}
        defaultExpandIcon={<ChevronRightIcon />}
        defaultEndIcon={false}
        expanded={expanded}
        onNodeToggle={handleToggle}
        multiSelect
      >
        {permissions &&
          permissions?.length > 0 &&
          permissions.map((subheaderItem, subHeaderIndex) => {
            return (
              <TreeItem
                key={`sub-Header-Item-${subHeaderIndex}`}
                nodeId={subheaderItem?.permission}
                label={subheaderItem?.subheader}
              >
                {subheaderItem &&
                  subheaderItem?.items?.length > 0 &&
                  subheaderItem?.items.map((parentItem, parentIndex) => {
                    if (parentItem && parentItem?.children) {
                      return (
                        <TreeItem
                          key={`parent-item-${parentIndex}`}
                          nodeId={parentItem?.permission}
                          label={
                            <FormControlLabel
                              sx={{ textTransform: "capitalize" }}
                              label={parentItem?.title}
                              control={
                                <Checkbox
                                  checked={checked.includes(
                                    parentItem?.permission
                                  )}
                                  onChange={(e) =>
                                    handleCheckedChange(
                                      e,
                                      parentItem?.permission,
                                      parentItem
                                    )
                                  }
                                />
                              }
                              onClick={(e) => e.stopPropagation()}
                              disabled={false}
                            />
                          }
                        >
                          <Box
                            sx={{
                              display: "flex",
                              flexDirection: "column",
                              ml: 3,
                            }}
                          >
                            {parentItem &&
                              parentItem?.children &&
                              parentItem?.children !== null &&
                              parentItem?.children?.length &&
                              parentItem?.children?.map((child, childIndex) => (
                                <TreeItem
                                  key={`parent-${childIndex}`}
                                  nodeId={child?.permission}
                                  label={
                                    <FormControlLabel
                                      sx={{ textTransform: "capitalize" }}
                                      label={child?.title}
                                      control={
                                        <Checkbox
                                          checked={checked.includes(
                                            child?.permission
                                          )}
                                          onChange={(e) => {
                                            handleCheckedChange(
                                              e,
                                              child?.permission,
                                              child
                                            );
                                          }}
                                        />
                                      }
                                      onClick={(e) => e.stopPropagation()}
                                      disabled={
                                        !checked.includes(
                                          parentItem?.permission
                                        )
                                      }
                                    />
                                  }
                                >
                                  {child &&
                                    child?.children &&
                                    child?.children?.length &&
                                    child?.children?.map(
                                      (subChild, subIndex) => (
                                        <TreeItem
                                          key={`parent-${subIndex}`}
                                          nodeId={subChild?.permission}
                                          label={
                                            <FormControlLabel
                                              sx={{
                                                textTransform: "capitalize",
                                              }}
                                              label={subChild?.title}
                                              control={
                                                <Checkbox
                                                  checked={checked.includes(
                                                    subChild?.permission
                                                  )}
                                                  onChange={(e) =>
                                                    handleCheckedChange(
                                                      e,
                                                      subChild?.permission,
                                                      subChild
                                                    )
                                                  }
                                                />
                                              }
                                              disabled={
                                                !checked.includes(
                                                  child?.permission
                                                )
                                              }
                                            />
                                          }
                                          onClick={(e) => e.stopPropagation()}
                                        />
                                      )
                                    )}
                                </TreeItem>
                              ))}
                          </Box>
                        </TreeItem>
                      );
                    } else {
                      return (
                        <TreeItem
                          key={`parent-${parentIndex}`}
                          nodeId={parentItem?.permission}
                          label={
                            <FormControlLabel
                              sx={{ textTransform: "capitalize" }}
                              label={parentItem?.title}
                              control={
                                <Checkbox
                                  checked={checked.includes(
                                    parentItem?.permission
                                  )}
                                  onChange={(e) =>
                                    handleCheckedChange(
                                      e,
                                      parentItem?.permission,
                                      parentItem
                                    )
                                  }
                                />
                              }
                              disabled={false}
                            />
                          }
                          //   onClick={(e) => e.stopPropagation()}
                        />
                      );
                    }
                  })}
              </TreeItem>
            );
          })}
      </TreeView>
    </div>
  );
};
export default RolePermission;

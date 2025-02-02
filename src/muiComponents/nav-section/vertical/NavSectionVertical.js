import PropTypes from "prop-types";
// @mui
import { List, Stack, Typography, Box } from "@mui/material";
// locales
// import { useLocales } from '../../../locales';
//
import { StyledSubheader } from "./styles";
import NavList from "./NavList";

// ----------------------------------------------------------------------

NavSectionVertical.propTypes = {
  sx: PropTypes.object,
  data: PropTypes.array,
};

export default function NavSectionVertical({ data, sx, ...other }) {
  // const { translate } = useLocales();

  return (
    <Box>
      {/* Header section */}
      <Box sx={{ textAlign: "center", mb: 3 }}>
        <Typography
          variant="h4"
          sx={{ fontWeight: 600, fontSize: { xs: "1.5rem", sm: "2rem" } }}
        >
          Admin
        </Typography>
      </Box>

      {/* Nav section */}
      <Stack sx={sx} {...other}>
        {data.map((group) => {
          const key = group.subheader || group.items[0].title;

          return (
            <List key={key} disablePadding sx={{ px: 2 }}>
              {group.subheader && (
                <StyledSubheader disableSticky>
                  {group.subheader}
                </StyledSubheader>
              )}

              {group.items.map((list) => (
                <NavList
                  key={list.title + list.path}
                  data={list}
                  depth={1}
                  hasChild={!!list.children}
                />
              ))}
            </List>
          );
        })}
      </Stack>
    </Box>
  );
}

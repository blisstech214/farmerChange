import { Button } from "@mui/material";
import MuiCircularProgress from "@mui/material/CircularProgress";
import { styled } from "@mui/material/styles";
import PropTypes from "prop-types";

const CircularProgress = styled(MuiCircularProgress)(() => ({
  marginLeft: 10
}));

const SubmitButton = ({ title, loading, variant, disabled = false }) =>
  <Button fullWidth  disabled={disabled} variant={variant} type="submit">
    {title}
    {loading && <CircularProgress color="inherit" size={20} />}
  </Button>;

SubmitButton.propTypes = {
  title: PropTypes.string,
  loading: PropTypes.bool,
  variant: PropTypes.string
};

export default SubmitButton;

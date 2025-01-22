import "./App.css";
import "../node_modules/slick-carousel/slick/slick.css";
import "../node_modules/slick-carousel/slick/slick-theme.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Navigationbar from "./Components/Navigationbar/navigationbar";
import Footer from "./Components/Footer/footer";
import Routing from "./Config/routes";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

function App() {
  // if (
  //   window.location.pathname.split("/")[1] !== "master" &&
  //   window.location.pathname.split("/")[1] !== "admin-signin"
  // ) {
  //   return (
  //     <div className="App">
  //       <Navigationbar />
  //       <Routing />
  //       <Footer />
  //     </div>
  //   );
  // } else {
  //   return (
  //     <div className="App">
  //       <Routing />
  //     </div>
  //   );
  // }

  return (
    <div className="App">
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Routing />
      </LocalizationProvider>
    </div>
  );
}

export default App;

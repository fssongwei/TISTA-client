import { Router, Route } from "react-router-dom";
import history from "./utils/history";
import Header from "./Components/Header";
import Footer from "./Components/Footer";
import PatientDatabase from "./Pages/PatientDatabase";
import PatientRecord from "./Pages/PatientRecord";
import Upload from "./Pages/Upload";
import Report from "./Pages/Report";

export default function App() {
  return (
    <Router history={history}>
      <div style={AppLayoutStyle}>
        <Header />
        <div style={{ flex: 1 }}>
          <Route path="/" exact component={PatientDatabase} />
          <Route path="/upload" exact component={Upload} />
          <Route path="/patient/:id" exact component={PatientRecord} />
          <Route path="/report/:id" exact component={Report} />
        </div>
      </div>
    </Router>
  );
}

const AppLayoutStyle = {
  display: "flex",
  alignItems: "stretch",
  height: "100%",
};

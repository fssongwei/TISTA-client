import { Router, Route } from "react-router-dom";
import history from "./utils/history";
import Header from "./Components/Header";
import Footer from "./Components/Footer";
import PatientDatabase from "./Pages/PatientDatabase";
import PatientRecord from "./Pages/PatientRecord";
import Report from "./Pages/Report";

export default function App() {
  return (
    <Router history={history}>
      <Header title="Patient Database" />
      <Route path="/" exact component={PatientDatabase} />
      <Route path="/patient/:id" exact component={PatientRecord} />
      <Route path="/report/:id" exact component={Report} />
      <Footer company="TISTA" link="https://tistatech.com" />
    </Router>
  );
}

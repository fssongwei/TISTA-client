import { Router, Route } from "react-router-dom";
import history from "./utils/history";
import Header from "./Components/Header";
import Footer from "./Components/Footer";
import PatientDatabase from "./Pages/PatientDatabase";
import PatientRecord from "./Pages/PatientRecord";

export default function Album() {
  return (
    <Router history={history}>
      <Header title="Patient Database" />
      <Route path="/" exact component={PatientDatabase} />
      <Route path="/patient/:id" exact component={PatientRecord} />
      <Footer company="TISTA" link="https://tistatech.com" />
    </Router>
  );
}

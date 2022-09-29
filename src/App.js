import RegisterUser from "./components/RegisterComponent/RegisterUser";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import LoginComponent from "./components/LoginComponent/LoginComponent";
import TrashComponent from "./components/NotesComponent/TrashComponent";
import ArchievedComponent from "./components/NotesComponent/ArchievedComponent";
import NotesPage from "./components/NotesComponent/NotesPage";
import ForgotPassword from "./components/ForgotPassword";
import ResetPassword from "./components/ResetPassword";
import HomeComponent from "./HomePage/HomeComponent";

function App() {


  return (
    <div>
      <>
        <BrowserRouter>
          <Switch>
            <Route exact path="/" component={RegisterUser} />
            <Route exact path="/login" component={LoginComponent} />
            <Route exact path="/notes" component={NotesPage} />
            <Route exact path="/trash" component={TrashComponent} />
            <Route exact path="/archieve" component={ArchievedComponent} />
            <Route exact path="/forgot-password" component={ForgotPassword} />
            <Route exact path="/reset-password" component={ResetPassword} />
            <Route exact path="/home" component={HomeComponent} />
          </Switch>
        </BrowserRouter>
      </>
    </div>
  );
}

export default App;

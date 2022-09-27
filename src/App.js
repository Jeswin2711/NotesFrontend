import RegisterUser from "./components/RegisterComponent/RegisterUser";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import LoginComponent from "./components/LoginComponent/LoginComponent";
import TrashComponent from "./components/NotesComponent/TrashComponent";
import ArchievedComponent from "./components/NotesComponent/ArchievedComponent";
import NotesPage from "./components/NotesComponent/NotesPage";

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
          </Switch>
        </BrowserRouter>
      </>
    </div>
  );
}

export default App;

import {Route, Switch} from "react-router-dom";
import {Upload} from "./pages/Upload.js";
import {User} from "./pages/User.js";

const RouterList = () => {

    return (
        <>
            <Switch>
                <Route exact
                       path={"/"}
                       component={Upload}
                />
                <Route exact
                       path={"/user"}
                       component={User}/>
            </Switch>
        </>
    );
};

export default RouterList;

import {createBrowserRouter} from 'react-router-dom'
import {Upload} from "./pages/Upload.tsx";
import {User} from "./pages/User.tsx";
import {Result} from "./pages/Result.tsx";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Upload/>,
    },
    {
        path: "user",
        element: <User/>,
    },
    {
        path: "result",
        element: <Result/>,
    }
]);

export {
    router
};

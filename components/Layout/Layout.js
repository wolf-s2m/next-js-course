import { Fragment } from "react/cjs/react.production.min";

import MainHeader from './MainHeader';

function Layout (props) {
    return (
        <Fragment>
            <MainHeader />
            <main>
                {props.children}
            </main>
        </Fragment>
    )
}

export default Layout;
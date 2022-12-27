import { useContext } from "react";

import MainHeader from "./main-header";
import Notification from "../notification/notification";
import NotificationContext from "../../store/notification-context"

function Layout(props) {
    const { children } = props
    
    const ctx =  useContext(NotificationContext);
    const activeNotificationData = ctx.notification;

    return (
        <>
            <MainHeader />
            <main>{children}</main>
            {activeNotificationData && 
                <Notification 
                    title={activeNotificationData.title}
                    message={activeNotificationData.message}
                    status={activeNotificationData.status}
                />
            }
        </>
    )
}
export default Layout;
import {createContext, useState, useEffect} from 'react'

const NotificationContext = createContext({ //initial state
    notification: null, // { title, messagem status } 
    showNotification: function (notificationData) {},
    hideNotification: function () {},
});

export function NotificationContextProvider(props) {
    const [ activeNotification, setActiveNotification ] = useState(null);

    useEffect(() => {
        if ( activeNotification && 
            (activeNotification.status === 'success' || activeNotification.status === 'error'))
            {
                const timer = setTimeout( () => {
                    setActiveNotification(null)
                }, 3000);

                return () => { //return that cleanup function which useEffect accepts to clear that timer
                    clearTimeout(timer); // if useEffect reruns before the timer went off, so we dont have multiple ongoing timers
                }
            }
    }, [activeNotification])

    function showNotificationHandler (notificationData) {
        setActiveNotification(notificationData);
    }

    function hideNotificationHandler () {
        setActiveNotification(null);
    }

    const context = {
        notification: activeNotification,
        showNotification: showNotificationHandler,
        hideNotification: hideNotificationHandler
    }

    return (
        <NotificationContext.Provider value={context}>
            {props.children}
        </NotificationContext.Provider>
    )
}

export default NotificationContext;
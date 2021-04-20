import React from 'react'

import { useHistory } from 'react-router-dom'
import { getCookieByName } from './cookie'

export const useTracking = (
    trackingId = process.env.REACT_APP_GA_MEASUREMENT_ID
) => {
    const { listen } = useHistory()
    const isAcceptCookie = getCookieByName(process.env.REACT_APP_GDPR_COOKIE_NAME)
    function initializeGA(measurementId) {
        let script1 = document.createElement('script');
        script1.src = 'https://www.googletagmanager.com/gtag/js?id=' + measurementId;
        script1.async = true;
        document.head.appendChild(script1);

        let script2 = document.createElement('script');
        // プレーンテキスト、グローバルな window.gtag 関数を定義するため
        script2.text = `window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${measurementId}');`;
        document.head.appendChild(script2);
    }
    React.useEffect(() => {
        if (isAcceptCookie === 'true') {
            window[`ga-disable-${trackingId}`] = false;
            initializeGA(trackingId)
        } else {
            window[`ga-disable-${trackingId}`] = true;
        }
    }, [isAcceptCookie])

    React.useEffect(() => {
        const unlisten = listen((location) => {
            if (!window.gtag) return
            if (!trackingId) {
                console.log(
                    'Tracking not enabled, as `trackingId` was not given and there is no `GA_MEASUREMENT_ID`.'
                )
                return
            }

            if (getCookieByName(process.env.REACT_APP_GDPR_COOKIE_NAME) === 'true') {
                window.gtag('config', trackingId, { page_path: location.pathname })
            }
        })

        return unlisten
    }, [trackingId, listen])
}

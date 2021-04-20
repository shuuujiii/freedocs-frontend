import cookie from 'cookie';

export function getCookieByName(name) {
    const cookies = cookie.parse(document.cookie)
    return cookies[name]
}

export function isExistCookie(name) {
    const cookies = cookie.parse(document.cookie)
    return cookies[name] ? true : false
}

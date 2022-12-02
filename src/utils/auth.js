import Cookies from 'js-cookie'

const TokenKey = 'System'
const timeKey = 'Token-TimeOut'
export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  return Cookies.set(TokenKey, token)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}

export function setTime() {
  return Cookies.set(timeKey,Date.now())
}

export function getTime() {
  return Cookies.get(timeKey)
}

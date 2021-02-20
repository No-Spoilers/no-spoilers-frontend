function allCookies() {
  return document.cookie
    .split('; ')
    .reduce((acc, str) => {
      if (str === '') return null;
      if (!acc) acc = {};
      const [key, value] = str.split('=');
      acc[key] = value;
      return acc;
    }, null)
}

export function get(cookieName) {
  if (cookieName) {
    return allCookies()[cookieName];
  } else {
    return allCookies();
  }
}

export function set(cookieName, value) {
  if (typeof cookieName === 'string') {
    document.cookie = `${cookieName}=${value}`;
  } else if (typeof cookieName === 'object') {
    Object.keys(cookieName).forEach(name => document.cookie = `${name}=${cookieName[name]}`);
  }
}

const cookies = {get, set};

export default cookies;
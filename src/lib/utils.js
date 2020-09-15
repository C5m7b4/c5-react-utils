import CryptoJS from "crypto-js";

const isValid = (val) => {
  if (typeof val === "undefined" || val === null) {
    return false;
  } else {
    if (typeof val === "string" && val.length === 0) {
      return false;
    }

    // check to see if we are looking at an array
    if (Object.prototype.toString.call(val) === "[object Array]") {
      return true;
    }

    // check to see if a date was passed in
    if (Object.prototype.toString.call(val) === "[object Date]") {
      return true;
    }

    if (typeof val === "object") {
      if (Object.keys(val).length === 0) {
        return false;
      }
    }

    return true;
  }
};

const formatDate = (date, format = "long") => {
  // this function can return a long or short date
  if (typeof date === "undefined" || date === null) return;

  if (typeof date === "string") {
    if (date.length === 0) {
      return;
    }
    date = new Date(date);
  }

  // eslint-disable-next-line
  if (date == "Invalid Date") return;

  const month = date.getMonth() + 1;
  const day = date.getDate();
  const year = date.getFullYear();

  if (format === "long") {
    return month + "/" + day + "/" + year;
  } else if (format === "short") {
    return month + "/" + day;
  }
};

const formatTime = (date, format = "long") => {
  if (typeof date === "undefined" || date === null) return;

  if (typeof date === "string") {
    date = new Date(date);
  }

  // eslint-disable-next-line
  if (date == "Invalid Date") return;

  if (format === "short") {
    let hours = date.getHours();
    let minutes = date.getMinutes();
    const ampm = hours >= 12 ? "pm" : "am";
    hours = hours % 12;
    // eslint-disable-next-line
    hours = hours ? hours : 12;
    minutes = minutes < 10 ? "0" + minutes : minutes;
    var strTime = hours + ":" + minutes + " " + ampm;
    return strTime;
  }
  return date.toTimeString();
};

const addDays = (date, days) => {
  if (typeof date === "undefined" || date === null) {
    date = new Date();
  }

  var result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
};

const encrypt = (input, secret) => {
  const key = CryptoJS.enc.Utf8.parse(secret);
  const iv1 = CryptoJS.enc.Utf8.parse(secret);
  const encrypted = CryptoJS.AES.encrypt(input, key, {
    keySize: 16,
    iv: iv1,
    mode: CryptoJS.mode.ECB,
    padding: CryptoJS.pad.Pkcs7,
  });

  return encrypted + "";
};

const decrypt = (input, secret) => {
  const key = CryptoJS.enc.Utf8.parse(secret);
  const iv1 = CryptoJS.enc.Utf8.parse(secret);
  const plainText = CryptoJS.AES.decrypt(input, key, {
    keySize: 16,
    iv: iv1,
    mode: CryptoJS.mode.ECB,
    padding: CryptoJS.pad.Pkcs7,
  });

  return plainText.toString(CryptoJS.enc.Utf8);
};

const truncateString = (input, length) => {
  if (typeof input === "string") {
    if (input.length > length) {
      return input.substring(0, length);
    } else {
      return input;
    }
  } else {
    return input;
  }
};

export {
  isValid,
  formatDate,
  formatTime,
  addDays,
  encrypt,
  decrypt,
  truncateString,
};

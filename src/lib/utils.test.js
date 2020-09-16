import {
  isValid,
  formatDate,
  formatTime,
  addDays,
  encrypt,
  truncateString,
  getDayOfWeek,
  formatMoney,
  pad,
} from "./utils";

describe("utils.js - isValid", () => {
  it("should return false if a string has no length", () => {
    const testObj = "";
    expect(isValid(testObj)).toBe(false);
  });
  it("should return false if input is undefined", () => {
    const testObj = undefined;
    expect(isValid(testObj)).toBe(false);
  });
  it("should return false if an object has no keys", () => {
    const testObj = {};
    expect(isValid(testObj)).toBe(false);
  });
  it("should return true if a valid string is present", () => {
    const validString = "Hello MikTo";
    expect(isValid(validString)).toBe(true);
  });
  it("should return true if an Object with keys is present", () => {
    const validObject = { name: "MikTo", job: "Make cool shit" };
    expect(isValid(validObject)).toBe(true);
  });
  it("should return true if a date was passed in", () => {
    const validDate = new Date();
    expect(isValid(validDate)).toBe(true);
  });
  it("should return true if an empty array is passed in", () => {
    const emptyArray = [];
    expect(isValid(emptyArray)).toBe(true);
  });
  it("should return true is an array is passed in that has data in it", () => {
    const fullArray = [1, 2, 3, 4, 5];
    expect(isValid(fullArray)).toBe(true);
  });
});

describe("utils.js formatDate", () => {
  it("should return undefined if the input is undefined", () => {
    const fakeData = undefined;
    expect(formatDate(fakeData)).toBe(undefined);
  });
  it("should return undefined if the input is null", () => {
    const fakeData = null;
    expect(formatDate(fakeData)).toBe(undefined);
  });
  it("should return undefined is an empty string is passed as input", () => {
    const fakeData = "";
    expect(formatDate(fakeData)).toBe(undefined);
  });
  it("should return undefined if a string is passed in", () => {
    const fakeData = "Hello";
    expect(formatDate(fakeData)).toBe(undefined);
  });
  it("should return a short date when given the 'short' parameter", () => {
    const testDate = new Date("1/1/2020");
    expect(formatDate(testDate, "short")).toEqual("1/1");
  });
  it("should return a long date if ran be default", () => {
    const date = new Date("1/1/2020");
    expect(formatDate(date)).toBe("1/1/2020");
  });
  it("should return a long date if the long parameter is specified", () => {
    const date = new Date("1/1/2020");
    expect(formatDate(date, "long")).toBe("1/1/2020");
  });
});

describe("utils.js formatTime", () => {
  it("should return undefined if passed an undefined value", () => {
    const undef = undefined;
    expect(formatTime(undef)).toBe(undefined);
  });
  it("should return undefined if pass in null data", () => {
    const nullData = null;
    expect(formatTime(nullData)).toBe(undefined);
  });
  it("should return undefined if a string that is not a date is passed in", () => {
    const fakeDate = "Hello";
    expect(formatTime(fakeDate)).toBe(undefined);
  });
  it("should return a long time string if passed a valid date/time", () => {
    const timeData = new Date("1/1/2020 3:00 pm");
    expect(formatTime(timeData)).toBe(
      "15:00:00 GMT-0600 (Central Standard Time)"
    );
  });
  it("should return a short time string when passed the short parameter", () => {
    const timeData = new Date("1/1/2020 11:00 am");
    expect(formatTime(timeData, "short")).toBe("11:00 am");
  });
  it("should return a short time string when passed the short paramter and after noon", () => {
    const timeData = new Date("1/1/2020 5:00 pm");
    expect(formatTime(timeData, "short")).toBe("5:00 pm");
  });
});

describe("utils.js addDays", () => {
  it("should return a valid date when passed in a date", () => {
    const dateData = new Date("1/1/2020");
    const expectedDate = new Date("2020-01-04T06:00:00.000Z");
    expect(addDays(dateData, 3)).toStrictEqual(expectedDate);
  });
});

describe("utils.js encrypt", () => {
  it("should return yZ3xZyXYbsQNHNcIrbVEXQ== when sent C5m7b4", () => {
    const key = "12121212121212";
    expect(encrypt("C5m7b4", key)).toBe("yZ3xZyXYbsQNHNcIrbVEXQ==");
  });
  it("should return AjZM5YZKH3jAR26pPJ9zWQ== when sent in an empty string", () => {
    const key = "12121212121212";
    expect(encrypt("", key)).toBe("AjZM5YZKH3jAR26pPJ9zWQ==");
  });
});

describe("utils.js truncateString", () => {
  it("should return 'test' when passed testing with length of 4", () => {
    expect(truncateString("testing", 4)).toBe("test");
  });
  it("should return 'test' when passed 'test' with a length of 4", () => {
    expect(truncateString("test", 4)).toBe("test");
  });
});

describe("utils.js dayOfWeek", () => {
  it("should return Wednesday when passed a value of 1/1/2020", () => {
    expect(getDayOfWeek(new Date("1/1/2020"))).toBe("Wednesday");
  });
});

describe("utils.js formatMoney", () => {
  it("should return 1.45 when recieving multiple decimal places using the defaults", () => {
    expect(formatMoney("1.45182903")).toBe("1.45");
  });
  it("should return 1.45 when passed multiple decimal places", () => {
    expect(formatMoney("1.4519465", 2)).toBe("1.45");
  });
});

describe("utils.js pad", () => {
  it("should return the input if not given a string", () => {
    expect(pad(5, 1, "0")).toBe(5);
  });
  it("should return the input if given an object", () => {
    const obj = { name: "Mikto", job: "Make cool shit" };
    expect(pad(obj)).toBe(obj);
  });
  it("should return the input if the desired length is not a number", () => {
    expect(pad("somestring", "5")).toBe("somestring");
  });
  it("should return the input if the padChar is not a string", () => {
    expect(pad("somestring", 10, 5)).toBe("somestring");
  });
  it("should return the input with the correct left padding", () => {
    expect(pad("1", 3, "0", "left")).toBe("001");
  });
  it("should return the input with the correct right padding", () => {
    expect(pad("1", 3, "0", "right")).toBe("100");
  });
});

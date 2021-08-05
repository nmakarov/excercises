const expect = require('chai').expect;

describe("Basic", () => {
    it("UTC functions:", () => {
        const iso8601 = new Date();
        // 2021-02-13T21:43:58.484Z
        console.info(">> date:", iso8601);
        console.info(iso8601.toISOString());

        const utcMillis = iso8601.getTime();
        // 1613252638484
        console.info(">> utcMillis:", utcMillis);
    });

    it("Construct a date", () => {
        const dateStr = "2021-02-01T15:00:00Z";
        const dateInt = 1612191600000;
        const dateFromStr = new Date(dateStr);
        const dateFromInt = new Date(dateInt);
        
        console.info(">> dateFromStr:", dateFromStr);
        console.info(">> dateFromInt:", dateFromInt);
        console.info(">> ", dateFromInt.getHours());
    });

    it("Some string representations", () => {
        const date = new Date("2021-02-03T12:00:00Z");
        const dateString = date.toDateString();
        const GMTString = date.toDateString();
        const ISOString = date.toDateString();
        const localeDateString = date.toLocaleDateString();
        const localeString = date.toLocaleString();
        const localeTimeString = date.toLocaleTimeString();
        const string = date.toString();
        const timeString = date.toTimeString();
        const UTCString = date.toUTCString();
        const o = { dateString, GMTString, ISOString, localeDateString, localeString, localeTimeString, string, timeString, UTCString };
        // console.info(o);
        // {
        //     dateString: 'Wed Feb 03 2021',
        //     GMTString: 'Wed Feb 03 2021',
        //     ISOString: 'Wed Feb 03 2021',
        //     localeDateString: '2021-02-03',
        //     localeString: '2021-02-03, 4:00:00 a.m.',
        //     localeTimeString: '4:00:00 a.m.',
        //     string: 'Wed Feb 03 2021 04:00:00 GMT-0800 (Pacific Standard Time)',
        //     timeString: '04:00:00 GMT-0800 (Pacific Standard Time)',
        //     UTCString: 'Wed, 03 Feb 2021 12:00:00 GMT'
        //   }
    });

    it("Some date parts", () => {
        const date = new Date("2021-02-03T12:00:00Z");
        const getDate = date.getDate();
        const getDay = date.getDay();
        const getFullYear = date.getFullYear();
        const getHours = date.getHours();
        const getMilliseconds = date.getMilliseconds();
        const getMinutes = date.getMinutes();
        const getMonth = date.getMonth();
        const getSeconds = date.getSeconds();
        const getTime = date.getTime();
        const getTimezoneOffset = date.getTimezoneOffset();
        const getUTCDate = date.getUTCDate();
        const getUTCDay = date.getUTCDay();
        const getUTCFullYear = date.getUTCFullYear();
        const getUTCHours = date.getUTCHours();
        const getUTCMilliseconds = date.getUTCMilliseconds();
        const getUTCMinutes = date.getUTCMinutes();
        const getUTCMonth = date.getUTCMonth();
        const getUTCSeconds = date.getUTCSeconds();
        const getYear = date.getYear();

        const o = { getDate, getDay, getFullYear, getHours, getMilliseconds, getMinutes, getMonth, getSeconds, getTime, getTimezoneOffset, getUTCDate, getUTCDay, getUTCFullYear, getUTCHours, getUTCMilliseconds, getUTCMinutes, getUTCMonth, getUTCSeconds, getYear };
        // console.info(o);
        // {
        //     getDate: 3,
        //     getDay: 3,
        //     getFullYear: 2021,
        //     getHours: 4,
        //     getMilliseconds: 0,
        //     getMinutes: 0,
        //     getMonth: 1,
        //     getSeconds: 0,
        //     getTime: 1612353600000,
        //     getTimezoneOffset: 480,
        //     getUTCDate: 3,
        //     getUTCDay: 3,
        //     getUTCFullYear: 2021,
        //     getUTCHours: 12,
        //     getUTCMilliseconds: 0,
        //     getUTCMinutes: 0,
        //     getUTCMonth: 1,
        //     getUTCSeconds: 0,
        //     getYear: 121
        // }
    });

    it("Local time", () => {
        const year = 2021;
        const month = 1; // February, because months start with 0
        // I'm using string here for easy concatenation into the UTC string
        const day = "03";
        const hour = 12; // high noon
        const minute = 20;
        // construct date from LOCAL parts:
        const date = new Date(year, month, day, hour, minute);

        const utcDate = `${year}-${("" + (month+1)).padStart(2,"0")}-${day}T${hour}:${minute}:00.000Z`;
        // expect(date.toString()).to.eq(utcDate);
        console.info(">> utcDate:", utcDate);
        console.info(">> date:", date);
    });

    it("if a weekday", () => {
        const isWeekend = date => date.getDay % 6 === 0;
    });

    // move these out:
    it("toFixed", () => {
        const toFixed = (n, f) => ~~(Math.pow(10, f) * n) / Math.pow(10, f);
        const num = 123.456789;
        expect(toFixed(num, 1)).eq(123.4);
        expect(toFixed(num, 2)).eq(123.45);
        expect(toFixed(num, 3)).eq(123.456);
        // todo: figure out why the following doesn't work and how to fix it:
        // expect(toFixed(num, 8)).eq(123.456);
        const irr = 22/7;
        expect(toFixed(irr,10)).eq(0.1363800356);
    });


});

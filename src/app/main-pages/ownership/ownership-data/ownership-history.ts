import { OwnershipHistoryItem } from "./ownership-history-item.interface";


/**
 *  
 *  As of Q2 2025, GameStop for the first time provided language in the 10-Q form which provides information that distinguishes DRS versus DSPP shares
 * 
 */


/**
    Insiders:

    ROBINSON MARK HAYMOND  -  105,155 
    MOORE DANIEL WILLIAM - 108,224 
    GRUBE JAMES - 29,439 
    ATTAL ALAIN - 596,464
    COHEN RYAN - 42,082,626
    CHENG LAWRENCE - 88,000 

    Total non-RC:  927,282
    Total:  43,009,908
 */



/**

Ryan Cohen:
https://www.reddit.com/r/Superstonk/comments/1qcp3j7/ryan_cohen_13d/

37.4m shares with 10% (3.7m) warrants taking him to 41m

 */



/**
 *  To do an update on the data, copy the most recent data object and add it to the top and make changes, it must be the first item in the array
 */
export const ownershipHistory: OwnershipHistoryItem[] = [
    {
        dateYYYYMMDD: '2026-03-18',
        registeredText: "... approximately 66.2 million shares (15%) were held by registered holders with our transfer agent, Computershare Limited (“Computershare”) ",
        filingLink: "https://www.sec.gov/Archives/edgar/data/1326380/000132638026000013/gme-20260131.htm",
        filingType: '10K',
        filingDateYYYYMMDD: '2026-03-24',
        tso: 448400000,
        heldByCede: 382400000,
        heldByRegistered: 66200000,
        dspp: 3300000,
        insidersRyanCohen: 42082626,
        insidersRemainder: 927282,
        keithGill: 9001000,
        instVanguard: 38195010,
        instBlackrock: 35280269,
        instStateStreet: 12469631,
        instTotal: 160207712,
    },
    {
        dateYYYYMMDD: '2025-12-05',
        registeredText: "... approximately 67.0 million shares (or approximately 15% of our outstanding shares) were held by registered holders with our transfer agent, Computershare Limited (“Computershare”) ",
        filingLink: "https://www.sec.gov/ix?doc=/Archives/edgar/data/1326380/000132638025000098/gme-20251101.htm",
        filingType: '10Q',
        filingDateYYYYMMDD: '2025-12-09',
        tso: 448000000,
        heldByCede: 381000000,
        heldByRegistered: 67000000,
        insidersRyanCohen: 37347842,
        insidersRemainder: 909825,
        keithGill: 9001000,
        instVanguard: 38504483,
        instBlackrock: 35373798,
        instStateStreet: 12372829,
        instTotal: 174168288,
    },
    {
        dateYYYYMMDD: '2025-09-09',
        registeredText: "... approximately 66.7 million shares (or approximately 15% of our outstanding shares) were held by registered holders with our transfer agent, Computershare Limited ",
        filingLink: "https://www.sec.gov/ix?doc=/Archives/edgar/data/1326380/000132638025000075/gme-20250802.htm",
        filingType: '10Q',
        filingDateYYYYMMDD: '2025-09-05',
        tso: 447700000,
        heldByCede: 381000000,
        heldByRegistered: 66700000,
        insidersRyanCohen: 37347842,
        insidersRemainder: 850553,
        keithGill: 9001000,
        instVanguard: 38920865,
        instBlackrock: 35297475,
        instStateStreet: 12475894,
        instTotal: 177556770,
    },
    {
        dateYYYYMMDD: '2025-08-14',
        registeredText: "... approximately 68.1 million shares of our Class A common stock were held by registered holders with our transfer agent (or approximately 15% of our outstanding shares)",
        filingLink: "https://www.sec.gov/ix?doc=/Archives/edgar/data/0001326380/000132638025000035/gme-20250503.htm",
        filingType: '10Q',
        filingDateYYYYMMDD: '2025-06-05',
        tso: 447336306,
        heldByCede: 379236306,
        heldByRegistered: 68100000,
        insidersRyanCohen: 37347842,
        insidersRemainder: 850553,
        keithGill: 9001000,
        instVanguard: 38920865,
        instBlackrock: 35297475,
        instStateStreet: 12475894,
        instTotal: 177556770,
    },
    {
        dateYYYYMMDD: '2025-08-07',
        registeredText: "... approximately 68.1 million shares of our Class A common stock were held by registered holders with our transfer agent (or approximately 15% of our outstanding shares)",
        filingLink: "https://www.sec.gov/ix?doc=/Archives/edgar/data/0001326380/000132638025000035/gme-20250503.htm",
        filingType: '10Q',
        filingDateYYYYMMDD: '2025-06-05',
        tso: 447336306,
        heldByCede: 379236306,
        heldByRegistered: 68100000,
        insidersRyanCohen: 37347842,
        insidersRemainder: 850553,
        keithGill: 9001000,
        instVanguard: 39237789,
        instBlackrock: 34842991,
        instStateStreet: 12475894,
        instTotal: 153873478,
    },
    {
        dateYYYYMMDD: '2025-06-05',
        registeredText: "... approximately 68.1 million shares of our Class A common stock were held by registered holders with our transfer agent (or approximately 15% of our outstanding shares)",
        filingLink: "https://www.sec.gov/ix?doc=/Archives/edgar/data/0001326380/000132638025000035/gme-20250503.htm",
        filingType: '10Q',
        filingDateYYYYMMDD: '2025-06-05',
        tso: 447336306,
        heldByCede: 379236306,
        heldByRegistered: 68100000,
        insidersRyanCohen: 37347842,
        insidersRemainder: 800000,
        keithGill: 9001000,
        instVanguard: 39237789,
        instBlackrock: 34842991,
        instStateStreet: 12475894,
        instTotal: 151691811,
    },
    {
        dateYYYYMMDD: '2025-05-19',
        registeredText: "... approximately 69.5 million shares of our Class A Common Stock were held by registered holders with our transfer agent (or approximately 16% of our outstanding shares)",
        filingLink: "https://www.sec.gov/Archives/edgar/data/1326380/000162828025014731/gme-20250201.htm",
        filingType: '10K',
        filingDateYYYYMMDD: '',
        tso: 447083981,
        heldByCede: 377583981,
        heldByRegistered: 69500000,
        insidersRyanCohen: 37347842,
        insidersRemainder: 800000,
        keithGill: 9001000,
        instVanguard: 39237789,
        instBlackrock: 34842991,
        instStateStreet: 12475894,
        instTotal: 151691811,
    },
    {
        dateYYYYMMDD: '2025-04-03',
        registeredText: "... approximately 69.5 million shares of our Class A Common Stock were held by registered holders with our transfer agent (or approximately 16% of our outstanding shares)",
        filingLink: "https://www.sec.gov/Archives/edgar/data/1326380/000162828025014731/gme-20250201.htm",
        filingType: '10K',
        filingDateYYYYMMDD: '',
        tso: 447083981,
        heldByCede: 377600000,
        heldByRegistered: 69500000,
        insidersRyanCohen: 37347842,
        insidersRemainder: 800000,
        keithGill: 9001000,
        instVanguard: 39144063,
        instBlackrock: 34821144,
        instStateStreet: 12315631,
        instTotal: 143657159,
    },

    {
        dateYYYYMMDD: '2025-03-19',
        registeredText: "... approximately 69.5 million shares of our Class A Common Stock were held by registered holders with our transfer agent (or approximately 16% of our outstanding shares)",
        filingLink: "https://www.sec.gov/Archives/edgar/data/1326380/000162828025014731/gme-20250201.htm",
        filingType: '10K',
        filingDateYYYYMMDD: '',
        tso: 447083981,
        heldByCede: 377600000,
        heldByRegistered: 69500000,
        insidersRyanCohen: 36847842,
        insidersRemainder: 800000,
        keithGill: 9001000,
        instVanguard: 39144063,
        instBlackrock: 34821144,
        instStateStreet: 12315631,
        instTotal: 143657159,
    },

    {
        dateYYYYMMDD: '2025-02-15',
        registeredText: "... approximately 71.0 million shares of our Class A common stock were held by registered holders with our transfer agent (or approximately 16% of our outstanding shares) as of December 4, 2024.",
        filingLink: "https://www.sec.gov/ix?doc=/Archives/edgar/data/0001326380/000132638024000170/gme-20241102.htm",
        filingType: '10Q',
        filingDateYYYYMMDD: '',
        tso: 446800365,
        heldByCede: 375800365,
        heldByRegistered: 71000000,
        insidersRyanCohen: 36847842,
        insidersRemainder: 800000,
        keithGill: 9001000,
        instVanguard: 39144063,
        instBlackrock: 34821144,
        instStateStreet: 12315631,
        instTotal: 143657159,
    },
    {
        dateYYYYMMDD: '2024-12-04',
        registeredText: "... approximately 71.0 million shares of our Class A common stock were held by registered holders with our transfer agent (or approximately 16% of our outstanding shares) as of December 4, 2024.",
        filingLink: "https://www.sec.gov/ix?doc=/Archives/edgar/data/0001326380/000132638024000170/gme-20241102.htm",
        filingType: '10Q',
        filingDateYYYYMMDD: '',
        tso: 446800365,
        heldByCede: 375800365,
        heldByRegistered: 71000000,
        insidersRyanCohen: 36847842,
        insidersRemainder: 800000,
        keithGill: 9001000,
        instVanguard: 37108031,
        instBlackrock: 32241728,
        instStateStreet: 11143759,
        instTotal: 125513066,
    },
    {
        dateYYYYMMDD: '2024-09-04',
        registeredText: "",
        filingLink: "",
        filingType: '10Q',
        filingDateYYYYMMDD: '',
        tso: 426509592,
        heldByCede: 353700000,
        heldByRegistered: 72800000,
        insidersRyanCohen: 36847842,
        insidersRemainder: 800000,
        keithGill: 9001000,
        instVanguard: 29698579,
        instBlackrock: 22599419,
        instStateStreet: 8073188,
        instTotal: 37244635 + 29698579 + 22599419 + 8073188,
    },
    {
        dateYYYYMMDD: '2024-06-30',
        registeredText: "",
        filingLink: "",
        filingType: '10Q',
        filingDateYYYYMMDD: '',
        tso: 426200000,
        heldByCede: 351600000,
        heldByRegistered: 74600000,
        insidersRyanCohen: 36847842,
        insidersRemainder: 800000,
        keithGill: 9001000,
        instVanguard: 29698579,
        instBlackrock: 22599419,
        instStateStreet: 8073188,
        instTotal: 37244635 + 29698579 + 22599419 + 8073188,
    },
];
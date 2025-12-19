export interface OwnershipHistoryItem {
    dateYYYYMMDD: string;
    registeredText: string;
    filingLink: string;
    filingType: '10Q' | '10K';
    filingDateYYYYMMDD: string;
    tso: number;
    heldByCede: number;
    heldByRegistered: number;
    insidersRyanCohen: number;
    insidersRemainder: number;  /** all non-RC insiders */
    keithGill: number;
    instVanguard: number;
    instBlackrock: number;
    instStateStreet: number;
    instTotal: number;  /** total value, e.g. from Nasdaq */
}



/**
 * 
 * Old interface (pre 2025-12-18):
 */
export interface OwnershipHistoryItemOld{
    dateYYYYMMDD: string;
    registeredText: string;
    filingLink: string;
    filingType: '10Q' | '10K';
    filingDateYYYYMMDD: string;
    tso: number;
    heldByCede: number;
    heldByRegistered: number;
    registeredDRS: number;
    registeredDSPP: number;
    totalInsiders: number;
    insidersRyanCohen: number;
    insidersRemainder: number;
    keithGill: number;
    instVanguard: number;
    instBlackrock: number;
    instStateStreet: number;
    instAllOther: number;
    instTotal: number;
    remainder: number;
}

 

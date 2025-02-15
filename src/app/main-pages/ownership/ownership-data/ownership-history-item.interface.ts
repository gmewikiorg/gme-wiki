export interface OwnershipHistoryItem{
    dateYYYYMMDD: string;
    registeredText: string;
    filingLink: string;
    filingType: '10Q' | '10K';
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

 
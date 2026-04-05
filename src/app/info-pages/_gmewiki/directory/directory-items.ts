export interface DirectoryItem {
    title: string,
    description: string,
    url: string,
}

export const mainPageItems: DirectoryItem[] = [
    {
        title: 'Start Page',
        description: 'gmewiki.org Start Page',
        url: '/start'
    },
    {
        title: 'Financial Statements',
        description: 'Earnings results and related company financial information',
        url: '/financials'
    },

    {
        title: 'GME Timeline',
        description: 'Explore the history of GameStop and see noteworthy events in their relationship to the changes of GME stock',
        url: '/timeline'
    },
    {
        title: 'GME Ownership',
        description: 'Who owns GameStop?',
        url: '/ownership'
    },
    {
        title: 'Social Media for GME shareholders',
        description: 'Connect with GME shareholders across various social media platforms',
        url: '/social-media'
    },
    {
        title: 'About',
        description: 'About gmewiki.org',
        url: '/about'
    },
]

export const gamestopPageItems: DirectoryItem[] = [
    {
        title: 'ATMs',
        description: 'In 2024, GameStop raised nearly $3.5 billion from 3 at-the-market equity offering programs ("ATMs"). In 2021 GameStop also raised cash with 2 ATMs.',
        url: '/atms'
    },
    {
        title: 'GameStop Investment Policy',
        description: "As legacy retail contracts, GameStop evolves into a capital allocator with a growing focus on strategic investments",
        url: '/investment-policy'
    },
    {
        title: 'NFT Marketplace',
        description: "From 2022 to 2024, GameStop operated a beta NFT marketplace which never left beta stage",
        url: '/nft-marketplace'
    },

    {
        title: 'GameStop Stores',
        description: "GameStop continues to close stores as part of ongoing efforts to improve the financial health of the company",
        url: '/stores'
    },

    {
        title: 'Trading Cards',
        description: "Starting in 2024, GameStop has made efforts to expand into the market of graded trading cards",
        url: '/trading-cards'
    },
    {
        title: 'GameStop Company Turnaround and Transformation',
        description: "Since 2021, GameStop has been undergoing a transformation: fewer stores, higher value, renewed profitability",
        url: '/turnaround'
    },
]

export const eventPageItems: DirectoryItem[] = [
    {
        title: 'May 2024 GME Burp',
        description: 'In 2024, the market price of GME suddenly soared high. Some have referred to this event as "The Burp." Why did this happen?',
        url: '/burp'
    },
    {
        title: 'Downfall Era',
        description: 'From approximately 2016 through 2020, GameStop was heading downwards',
        url: '/downfall'
    },

    {
        title: 'Fiscal Year 2023 Earnings Results',
        description: "GameStop reported full-year profitability for the first time in 6 years, contradicting the prevailing media sentiment that GameStop is a terrible company destined for bankruptcy",
        url: '/fy23'
    },
    {
        title: 'Fiscal Year 2024 Earnings Results',
        description: "Despite store closures and reduced revenue, GameStop shows improved profitability and the highest equity valuation in its history",
        url: '/fy24'
    },
    {
        title: 'Fiscal Year 2025 Earnings Results',
        description: "Operationally profitable, profit margin efficiency, climbing equity; a successful turnaround",
        url: '/fy25'
    },

    {
        title: 'The Ryan Cohen Interview with Joe Fonicello of GMEdd.com',
        description: "On November 20, 2022, an interview with Ryan Cohen and Joe Fonicello of GMEdd.com is published",
        url: '/rc-interview'
    },
    {
        title: 'January 2021 GME Sneeze, also known as the "GME Short Squeeze"',
        description: "Something unprecendented happened. Wall Street responded drastically",
        url: '/sneeze'
    },
]

export const peoplePageItems: DirectoryItem[] = [
    {
        title: 'Keith Gill',
        description: "Keith Gill, AKA Roaring Kitty, AKA DeepFuckingValue",
        url: '/keith-gill'
    },
    {
        title: 'Michael Burry',
        description: "Famed Investor Michael Burry's Relationship to GME",
        url: '/michael-burry'
    },
    {
        title: 'Ryan Cohen',
        description: "CEO and Chairman of the GameStop Board of Directors",
        url: '/ryan-cohen'
    },
]


export const conceptPageItems: DirectoryItem[] = [
    {
        title: 'Bear Case',
        description: 'General viewpoint held by those market participants betting against GME stock',
        url: '/bear-case'
    },
    {
        title: 'Bear Faction',
        description: 'The faction of market participants that are bearish on GME and have a financial interest in the price of the stock going down',
        url: '/bear-faction'
    },
    {
        title: 'Bull Case',
        description: 'General viewpoint held by GME bulls',
        url: '/bull-case'
    },
    {
        title: 'Bull Faction',
        description: 'The faction of market participants that are bullish on GME and have a financial interest in the price of the stock going up',
        url: '/bull-faction'
    },
    {
        title: 'GME Financial Conflict',
        description: 'Factions with opposing interests continue to compete over the outcome of GME',
        url: '/conflict'
    },
    {
        title: 'DRS - Direct Registration System',
        description: 'The only way that a shareholder is able to have both ownership and possession of their shares',
        url: '/drs'
    },
    {
        title: 'GME DRS Timeline',
        description: 'Timeline of relevant events pertaining to the relationship between GME shareholders and DRS',
        url: '/drs-timeline'
    },
    {
        title: 'DSPP - Direct Stock Purchase Plan',
        description: "A form of owning registered shares that are held by GameStop's transfer agent Computershare",
        url: '/dspp'
    },
    {
        title: 'Omission of DRS by Financial Media',
        description: "Financial media is incentivized to not ever bring attention to DRS",
        url: '/media-omits-drs'
    },
    {
        title: 'FTD - Failure to Deliver',
        description: "Failure to deliver / fails-to-deliver: a structural loophole that enables market participants to exploit the financial system for profit",
        url: '/ftd'
    },
    {
        title: 'FUD - Fear, Uncertainty, Doubt',
        description: "A manipulative propaganda tactic that is used to induce fear, uncertainty, or doubt to influence perception and behavior",
        url: '/fud'
    },
    {
        title: 'Market Tactics and Manipulation',
        description: "Sophisticated market participants can use a variety of tools, tactics, and advantages to profit by achieving short-term or long-term market outcomes",
        url: '/market-tactics'
    },
    {
        title: 'Financial Media Narratives on GME',
        description: "Financial media is often demonstrably biased, cynical, and dishonest when reporting about GME and GameStop",
        url: '/media-vs-gme'
    },

    {
        title: 'Meme Stock',
        description: "A term used to refer to GME and some other stocks",
        url: '/meme-stock'
    },
    {
        title: 'MOASS - Mother of All Short Squeezes',
        description: "A term used to refer to a theoretical future GME short squeeze event of incredible magnitude",
        url: '/moass'
    },

    {
        title: 'Naked Short Selling',
        description: "A form of fraud where the perpetrator profits while lowering the price of a target stock",
        url: '/naked-short-selling'
    },

    {
        title: 'CNBC on Naked Short Selling of GME',
        description: "CNBC awkwardly discusses naked short selling of GME",
        url: '/cnbc-naked-shorts'
    },

    {
        title: 'Reddit',
        description: "A social media network that has played a not-insignificant role in the GME saga",
        url: '/reddit'
    },
    {
        title: 'Short Interest (SI)',
        description: "A metric that measures the (reported) number of shares sold short, indicating bearish sentiment of a stock",
        url: '/short-interest'
    },
    {
        title: '"Shorts Never Closed"',
        description: "Amidst an ongoing conflict over GME, a commonly held sentiment among some GME shareholders is that there remains significant obligations by GME short sellers that must eventually be resolved",
        url: '/shorts-never-closed'
    },

    {
        title: '"Sneeze" versus "Squeeze"',
        description: "Pertaining to the events of January 2021, Which label is more accurate?",
        url: '/sneeze-vs-squeeze'
    },
    {
        title: 'T+35 Settlement Cycle',
        description: "An observed market cycle related to FTDs (fails-to-deliver) that can influence the price of a stock",
        url: '/t-plus-35'
    },
]
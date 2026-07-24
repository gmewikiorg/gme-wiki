import { faCircleInfo, faInfoCircle, faTableList } from "@fortawesome/free-solid-svg-icons";
import { MobileMenuItem } from "./mobile-menu-item.class";

export const mobileMenuItems: MobileMenuItem[] = [
    new MobileMenuItem(
        'IMAGE',
        null,
        '/start',
        'assets/nav-icons/start.png',
        'Start'
    ),

    new MobileMenuItem(
        'IMAGE',
        null,
        '/financials',
        'assets/nav-icons/bar-chart-3.png',
        'GameStop Financials'
    ),
    new MobileMenuItem(
        'IMAGE',
        null,
        '/ownership',
        'assets/nav-icons/ownership.png',
        'Company Ownership'
    ),
    new MobileMenuItem(
        'IMAGE',
        null,
        '/timeline',
        'assets/nav-icons/timeline-icon.png',
        'GME Timeline'
    ),
    new MobileMenuItem(
        'IMAGE',
        null,
        '/social-media',
        'assets/nav-icons/social-media.png',
        'GME Social Media'
    ),
    new MobileMenuItem(
        'ICON',
        faCircleInfo,
        '/about',
        '',
        'About gmewiki.org'
    ),
];
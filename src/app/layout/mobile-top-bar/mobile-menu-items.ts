import { faCircleInfo, faInfoCircle, faTableList } from "@fortawesome/free-solid-svg-icons";
import { MobileMenuItem } from "./mobile-menu-item.class";

export const mobileMenuItems: MobileMenuItem[] = [
    //     new MobileMenuItem(
    //     'IMAGE',
    //     null,
    //     '/research',
    //     'assets/flaticon/search-1.png',
    //     'Research'
    // ),
    // new MobileMenuItem(
    //     'IMAGE',
    //     null,
    //     '/calendar',
    //     'assets/flaticon/calendar.png',
    //     'Calendar'
    // ),
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
        '/timeline',
        'assets/nav-icons/timeline-icon.png',
        'Timeline'
    ),
    new MobileMenuItem(
        'IMAGE',
        null,
        '/earnings',
        'assets/nav-icons/bar-chart-3.png',
        'Earnings'
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
        '/social-media',
        'assets/nav-icons/social-media.png',
        'Social Media'
    ),
    new MobileMenuItem(
        'ICON',
        faCircleInfo,
        '/about',
        '',
        'About'
    ),
];
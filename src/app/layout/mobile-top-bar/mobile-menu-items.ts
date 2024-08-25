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
    new MobileMenuItem(
        'IMAGE',
        null,
        '/calendar',
        'assets/flaticon/calendar.png',
        'Calendar'
    ),
    new MobileMenuItem(
        'IMAGE',
        null,
        '/timeline',
        'assets/icons/timeline-icon.png',
        'Timeline'
    ),
    new MobileMenuItem(
        'IMAGE',
        null,
        '/earnings',
        'assets/flaticon/bar-chart-3.png',
        'Earnings'
    ),
    new MobileMenuItem(
        'IMAGE',
        null,
        '/ownership',
        'assets/icons/ownership-2024-06-13.png',
        'Company Ownership'
    ),
    new MobileMenuItem(
        'IMAGE',
        null,
        '/social-media',
        'assets/flaticon/social-media.png',
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
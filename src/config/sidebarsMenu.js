import * as root from "../lib/root";
import * as partners from "./partners"

export const menus = [
    {
        root: root.all,
        title: 'All Transaction',
        icon: 'bx-calendar',
        partner: partners.ADMINISTRATOR
    },
    {
        root: root.alterra,
        title: 'Alterra',
        icon: 'bx-calendar',
        partner: partners.ALTERRA
    },
    {
        root: root.dana,
        title: 'Dana',
        icon: 'bx-calendar',
        partner: partners.DANA
    },
    {
        root: root.gopayGoTagihan,
        title: 'Gopay Go-Tagihan',
        icon: 'bx-calendar',
        partner: partners.GOPAY_GO_TAGIHAN
    },
    {
        root: root.midtrans,
        title: 'Midtrans',
        icon: 'bx-calendar',
        partner: partners.MIDTRANS
    },
]
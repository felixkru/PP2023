import Link from "next/link";

export default function Footer() {
    return (
        <footer className="container">
            <hr className="w-40" />
            <span><Link href="/impressum">Impressum</Link></span>
            <span><Link href="/help">Help</Link></span>
            <p id="copyright-el">© 2023 LL</p>
        </footer>
    )
}
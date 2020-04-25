import Link from 'next/link';

export default function Index() {
  return (
    <div>
      <p>Welcome to Drake University Official Apparel!</p>
      <ul>
        <li>
          <Link href="/items">
            <a>start shopping </a>
          </Link>
        </li>
        <li>
          <Link href="/cart">
            <a>view cart</a>
          </Link>
        </li>
      </ul>
    </div>
  );
}

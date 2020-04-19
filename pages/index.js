import Link from 'next/link';

export default function Index() {
  return (
    <div>
      <Link href="/items">
          <a>start shopping </a>
        </Link>
      <p>Welcome to Drake University Official Apparel!</p>
    </div>
  );
}

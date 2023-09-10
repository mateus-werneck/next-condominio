import HomeIcon from '@mui/icons-material/Home';
import Link from 'next/link';
import { CSSProperties } from 'react';

interface IHomeButton {
  styles?: CSSProperties;
}

export default function HomeButton({ styles }: IHomeButton) {
  return (
    <Link
      key="home"
      href="/"
      className="flex gap-2 items-center justify-center self-center mb-1"
      style={styles}
    >
      <HomeIcon
        fontSize="medium"
        className="text-white hover:text-[var(--orange)]"
      />
    </Link>
  );
}

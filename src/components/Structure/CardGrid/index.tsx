'use client';
import Image from 'next/image';
import Link from 'next/link';
import { StyledCard, StyledGrid } from './style';

interface ICardGrid {
  cards: ICard[];
}

interface ICard {
  title: string;
  description: string | JSX.Element;
  href: string;
  subTitle?: string;
  image?: string;
}

export default function CardGrid({ cards }: ICardGrid) {
  return (
    <StyledGrid container rowGap={6} columnGap={6}>
      {cards.map((card) => (
        <Link key={card.title} href={card.href}>
          <StyledCard variant="outlined">
            {card.image !== undefined && (
              <Image
                src={card.image}
                alt={card.title}
                width={320}
                height={80}
              />
            )}

            <span className="flex flex-col items-center justify-center self-center mt-4 text-lg font-bold">
              {card.title}
              {card.subTitle !== undefined && <span>{card.subTitle}</span>}
            </span>
            <span className="flex p-4 max-w-xs text-sm">
              {card.description}
            </span>
          </StyledCard>
        </Link>
      ))}
    </StyledGrid>
  );
}

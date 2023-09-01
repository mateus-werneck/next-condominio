import CurrencyExchangeIcon from '@mui/icons-material/CurrencyExchange';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import SummarizeIcon from '@mui/icons-material/Summarize';
import HomeIcon from '@mui/icons-material/Home';
import Link from 'next/link';

interface IMenuDefault {
  name: string;
  children: IMenuChildren[];
}

interface IMenuChildren {
  name: string;
  href: string;
  icon?: JSX.Element;
}

export function getMenuDefault(): IMenuDefault[] {
  return [
    {
      name: 'Controle',
      children: [
        {
          name: 'Despesas',
          href: '/expenses',
          icon: <CurrencyExchangeIcon />
        },
        {
          name: 'Moradores',
          href: '/residents',
          icon: <PeopleAltIcon />
        }
      ]
    },
    {
      name: 'Relatórios',
      children: [
        {
          name: 'Relatório de Gastos',
          href: '/general-expenses-report',
          icon: <SummarizeIcon />
        }
      ]
    }
  ];
}

export function getHomeButton(): JSX.Element {
  return (
    <Link
      key="home"
      href="/"
      className="flex gap-2 items-center justify-center self-center md:hover:text-[var(--orange)] mb-1"
    >
      <HomeIcon style={{ color: 'white' }} fontSize="medium" />
    </Link>
  );
}

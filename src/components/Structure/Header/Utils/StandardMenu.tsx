import CurrencyExchangeIcon from '@mui/icons-material/CurrencyExchange';
import HomeIcon from '@mui/icons-material/Home';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import SummarizeIcon from '@mui/icons-material/Summarize';
import Link from 'next/link';

interface IMenuDefault {
  name: string;
  children: IMenuChildren[];
}

interface IMenuChildren {
  name: string;
  href: string;
  desc?: string;
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
          desc: 'Exibir despesas do condomínio',
          icon: <CurrencyExchangeIcon />
        },
        {
          name: 'Moradores',
          href: '/residents',
          desc: 'Exibir moradores do condomínio',
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
          desc: 'Exibir relatório mensal de gastos',
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
      className="flex gap-2 items-center justify-center self-center mb-1"
    >
      <HomeIcon
        fontSize="medium"
        className="text-white hover:text-[var(--orange)]"
      />
    </Link>
  );
}

import CurrencyExchangeIcon from '@mui/icons-material/CurrencyExchange';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import SummarizeIcon from '@mui/icons-material/Summarize';

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
          href: '/despesas',
          icon: <CurrencyExchangeIcon />
        },
        {
          name: 'Moradores',
          href: '/moradores',
          icon: <PeopleAltIcon />
        }
      ]
    },
    {
      name: 'Relatórios',
      children: [
        {
          name: 'Relatório de Gastos',
          href: '/relatorio-de-gastos',
          icon: <SummarizeIcon />
        }
      ]
    }
  ];
}

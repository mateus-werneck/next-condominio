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

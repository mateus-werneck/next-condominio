import CurrencyExchangeIcon from '@mui/icons-material/CurrencyExchange';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import SummarizeIcon from '@mui/icons-material/Summarize';

export interface IMenuDefault {
  name: string;
  children: IMenuChildren[];
}

export interface IMenuChildren {
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

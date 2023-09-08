import DefaultButton from '@Components/Structure/Button';
import AddIcon from '@mui/icons-material/Add';

export default function getAddButton(route: string): JSX.Element[] {
  return [
    <DefaultButton route={route} variant="text" key={route}>
      <AddIcon fontSize="small" />
      Adicionar
    </DefaultButton>
  ];
}

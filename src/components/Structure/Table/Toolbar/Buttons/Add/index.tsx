import DefaultButton from '@Components/Structure/Button';
import AddIcon from '@mui/icons-material/Add';

export default function Add(route: string): JSX.Element[] {
  return [
    <DefaultButton
      route={route}
      variant="text"
      key={route}
      styles={{ marginLeft: '-8px' }}
    >
      <AddIcon fontSize="small" />
      Adicionar
    </DefaultButton>
  ];
}

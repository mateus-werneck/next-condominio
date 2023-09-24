'use client';
import FormData from '@Components/Structure/FormData';
import { IFormInput, ISubmitForm } from '@Components/Structure/FormData/types';
import { alertEditFailed, alertEditSuccess } from '@Lib/Alerts/customActions';
import { clientConn } from '@Lib/Client/api';
import Masks from '@Lib/Masks/Masks';
import { ZodValidator } from '@Lib/Validators/Zod';
import { Resident } from '@prisma/client';
import { z } from 'zod';

interface IResidentForm {
  resident: Resident;
  formSubmitCallback?: (value: Resident) => void;
  alignment?: 'start' | 'center' | 'end';
}

interface IResidentSubmit {
  name: string;
  apartment: number;
  email?: string;
  phone?: string;
}

export default function ResidentForm(props: IResidentForm) {
  const { inputs, validationSchema } = useFormData(props);

  const onFormSubmit: ISubmitForm = async (
    submitData: IResidentSubmit,
    { reset }
  ) => {
    try {
      const response = props.resident.id
        ? await clientConn.put('residents', {
            id: props.resident.id,
            ...submitData
          })
        : await clientConn.post('residents', submitData);
      alertEditSuccess(props.resident.id ? undefined : reset);
      props.formSubmitCallback && props.formSubmitCallback(response.data);
    } catch (error) {
      alertEditFailed();
      Promise.resolve();
    }
  };

  return (
    <>
      <FormData
        inputs={inputs}
        validationSchema={validationSchema}
        alignment={props.alignment ?? 'start'}
        onSubmit={onFormSubmit}
        submitButtonText="Salvar"
      />
    </>
  );
}

function useFormData({ resident }: IResidentForm) {
  const inputs: IFormInput[] = [
    {
      name: 'name',
      label: 'Nome',
      initialValue: resident.name
    },
    {
      name: 'apartment',
      label: 'Apartamento',
      mask: Masks.APARTMENT,
      initialValue: String(resident.apartment)
    },
    {
      name: 'email',
      label: 'Email',
      type: 'email',
      required: false,
      initialValue: resident.email
    },
    {
      name: 'phone',
      label: 'Telefone',
      mask: Masks.PHONE,
      required: false,
      initialValue: resident.phone
    }
  ];

  const validationSchema = z.object({
    name: ZodValidator.string(),
    apartment: ZodValidator.number(),
    email: ZodValidator.email(),
    phone: ZodValidator.phone()
  });
  return { inputs, validationSchema };
}

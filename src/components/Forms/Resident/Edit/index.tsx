'use client';
import StandardForm from '@Components/Structure/Form';
import { IStandardInput } from '@Components/Structure/Form/Input/utils/types';
import { ISubmitForm } from '@Components/Structure/Form/utils/types';
import { alertEditFailed, alertEditSuccess } from '@Lib/Alerts/customActions';
import { publicAPI } from '@Lib/Client/api';
import { Masks } from '@Lib/Input/masks';
import { ZodValidator } from '@Lib/Validators/Zod';
import { Resident } from '@prisma/client';
import { z } from 'zod';

interface IResidentForm {
  resident: Resident;
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
      props.resident.id
        ? await publicAPI.put('residents', {
            id: props.resident.id,
            ...submitData
          })
        : await publicAPI.post('residents', submitData);
      alertEditSuccess(props.resident.id ? undefined : reset);
    } catch (error) {
      alertEditFailed();
      Promise.resolve();
    }
  };

  return (
    <>
      <StandardForm
        inputs={inputs}
        validationSchema={validationSchema}
        onSubmit={onFormSubmit}
        submitButtonText="Salvar"
      />
    </>
  );
}

function useFormData({ resident }: IResidentForm) {
  const inputs: IStandardInput[] = [
    {
      name: 'name',
      label: 'Nome',
      initialValue: resident.name
    },
    {
      name: 'apartment',
      label: 'Apartamento',
      type: 'number',
      mask: Masks.APARTMENT
    },
    {
      name: 'email',
      label: 'Email',
      type: 'email',
      required: false
    },
    {
      name: 'phone',
      label: 'Telefone',
      mask: Masks.PHONE,
      required: false
    }
  ];

  /* eslint-disable camelcase */
  const validationSchema = z.object({
    name: ZodValidator.string(),
    apartment: ZodValidator.number(),
    email: z
      .union([z.string().email(), z.string().length(0)])
      .optional()
      .transform((e) => (e === '' ? undefined : e)),
    phone: z
      .union([z.string().min(15), z.string().length(0)])
      .optional()
      .transform((e) => (e === '' ? undefined : e))
  });
  return { inputs, validationSchema };
}

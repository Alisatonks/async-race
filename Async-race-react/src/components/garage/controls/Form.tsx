import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { CreatingCar } from '../../../types';
import {
  useAddCarMutation,
  useUpdateCarMutation,
} from '../../../redux/slices/carsSlice';
import { RootState } from '../../../redux/store';

type Props = {
  action: string;
};

export default function Form(props: Props) {
  const { action } = props;
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    setValue,
  } = useForm<CreatingCar>();
  const [addCar] = useAddCarMutation();
  const [updateCar] = useUpdateCarMutation();
  const selectedCar = useSelector(
    (state: RootState) => state.selectedCar.selectedCar
  );

  useEffect(() => {
    if (action === 'update' && selectedCar) {
      setValue('name', selectedCar.name);
      setValue('color', selectedCar.color);
    }
  }, [action, selectedCar, setValue]);

  const onSubmit = async (data: CreatingCar) => {
    if (action === 'create') {
      await addCar(data);
      reset();
    }
    if (action === 'update' && selectedCar) {
      const { name, color } = data;
      if (name !== selectedCar.name || color !== selectedCar.color) {
        await updateCar({ id: selectedCar.id, ...data });
      }
    }
  };

  return (
    <form className="controls__group" onSubmit={handleSubmit(onSubmit)}>
      <div className="input-wrapper">
        <input
          className="brand-input"
          type="text"
          placeholder="Car brand"
          {...register('name', { required: true })}
        />
        {errors.name && <div className="error">This field is required</div>}
      </div>
      <input type="color" {...register('color')} />
      <button className="commonBtn" type="submit">
        {action === 'create' ? 'Create' : 'Update'}
      </button>
    </form>
  );
}

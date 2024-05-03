import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { CreatingCar } from '../../../types';
import {
  useAddCarMutation,
  useUpdateCarMutation,
} from '../../../redux/slices/requestsApi';
import { RootState } from '../../../redux/store';
import {
  setInputCreate,
  setInputUpdate,
} from '../../../redux/slices/persistentStateReducer';

type Props = {
  action: string;
};

export default function Form(props: Props) {
  const { action } = props;

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<CreatingCar>();
  const [addCar] = useAddCarMutation();
  const [updateCar] = useUpdateCarMutation();
  const selectedCar = useSelector(
    (state: RootState) => state.selectedCar.selectedCar
  );
  const inputColor = useSelector((state: RootState) =>
    action === 'create'
      ? state.persistentState.inputCreate?.color
      : state.persistentState.inputUpdate?.color
  );
  const inputName = useSelector((state: RootState) =>
    action === 'create'
      ? state.persistentState.inputCreate?.brand
      : state.persistentState.inputUpdate?.brand
  );

  const dispatch = useDispatch();

  useEffect(() => {
    setValue('color', inputColor || '#000000');
    setValue('name', inputName || '');
  }, [inputColor, inputName, setValue]);

  const onSubmit = async (data: CreatingCar) => {
    if (action === 'create') {
      await addCar(data);
    }
    if (action === 'update' && selectedCar) {
      await updateCar({ id: selectedCar.id, ...data });
    }
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    if (action === 'create') {
      if (name === 'color') {
        dispatch(setInputCreate({ color: value }));
      } else if (name === 'name') {
        dispatch(setInputCreate({ brand: value }));
      }
    } else if (action === 'update') {
      if (name === 'color') {
        dispatch(setInputUpdate({ color: value }));
      } else if (name === 'name') {
        dispatch(setInputUpdate({ brand: value }));
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
          onChange={handleInputChange}
        />
        {errors.name && <div className="error">This field is required</div>}
      </div>
      <input type="color" {...register('color')} onChange={handleInputChange} />
      <button className="commonBtn" type="submit">
        {action === 'create' ? 'Create' : 'Update'}
      </button>
    </form>
  );
}

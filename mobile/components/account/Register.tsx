import React, { useEffect } from 'react'
import { Keyboard, Text, View } from 'react-native';
import { useForm, Controller } from "react-hook-form";
import useRegisterMutation from '../../hooks/useRegisterMutation';
import CustomInput from '../shared/CustomInput';
import { AxiosError } from 'axios';
import CustomButton from '../shared/CustomButton';

type RegisterProps = {
  onComplete: () => void
}

function Register(props: RegisterProps) {
    const { control, handleSubmit, formState: { errors } } = useForm({defaultValues: {username: '', email: '', password: ''}});
    const registerMutation = useRegisterMutation();

    const onSubmit = (data: {username: string, email: string, password: string}) => {
      Keyboard.dismiss();
      registerMutation.mutate(data)
    };

    useEffect(() => {
      if (registerMutation.isSuccess) {
        props.onComplete();
      }
    }, [registerMutation])

    const error = (registerMutation.error as AxiosError<{message: string}>)?.response?.data?.message;

    return (
        <View className='w-3/4'>
          <Controller
            control={control}
            rules={{
             required: true,
            }}
            render={({ field: { onChange, value } }) => (
              <CustomInput 
                placeholder="Username"
                onChangeText={onChange}
                value={value}
                isError={!!errors.username}
                extraStyles='bg-secondary'
              />
            )}
            name="username"
          />
                
          <Controller
            control={control}
            rules={{
             required: true,
            }}
            render={({ field: { onChange, value } }) => (
              <CustomInput 
                placeholder="Email"
                onChangeText={onChange}
                value={value}
                isError={!!errors.email}
                extraStyles='bg-secondary'
              />
            )}
            name="email"
          />

          <Controller
            control={control}
            rules={{
                required: true,
            }}
            render={({ field: { onChange, value } }) => (
              <CustomInput
                placeholder="Password"
                onChangeText={onChange}
                value={value}
                secureTextEntry={true}
                isError={!!errors.password}
                extraStyles='bg-secondary'
              />
            )}
            name="password"
          />

          {error && <Text className='text-center text-red-500'>{error}</Text>}
          
          <CustomButton
            onPress={handleSubmit(onSubmit)}
            text='Submit'
            isLoading={registerMutation.isLoading}
          />
        </View>
      );
}

export default Register
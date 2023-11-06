import React, { useEffect } from 'react'
import { Keyboard, Text, View } from 'react-native';
import { useForm, Controller } from "react-hook-form";
import useRegisterMutation from '../../hooks/useRegisterMutation';
import CustomInput from '../CustomInput';
import { AxiosError } from 'axios';
import CustomButton from '../CustomButton';

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
        <View className='w-full'>
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
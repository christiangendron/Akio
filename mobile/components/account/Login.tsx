import React from 'react'
import { Keyboard, Text, View } from 'react-native';
import { useForm, Controller } from "react-hook-form";
import useLoginMutation from '../../hooks/useLoginMutation';
import CustomInput from '../shared/CustomInput';
import { AxiosError } from 'axios';
import CustomButton from '../shared/CustomButton';

function Login() {
    const { control, handleSubmit, formState: { errors } } = useForm({defaultValues: {email: '', password: ''}});
    const loginMutation = useLoginMutation();

    const onSubmit = (data: {email: string, password: string}) => {
      Keyboard.dismiss();
      loginMutation.mutate(data)
    };

    const error = (loginMutation.error as AxiosError<{message: string}>)?.response?.data?.message;
    
    return (
        <View className='w-full'>
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
                isError={!!errors.password}
                secureTextEntry={true}
              />
            )}
            name="password"
          />

          {error && <Text className='text-center text-red-500'>{error}</Text>}

          <CustomButton
            onPress={handleSubmit(onSubmit)}
            text='Submit'
            isLoading={loginMutation.isLoading}
          />
        </View>
      );
}

export default Login
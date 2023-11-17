import React from 'react'
import { Keyboard, Text, View } from 'react-native';
import { useForm, Controller } from "react-hook-form";
import useRegisterMutation from '../../hooks/useRegisterMutation';
import CustomInput from '../shared/CustomInput';
import { AxiosError } from 'axios';
import CustomButton from '../shared/CustomButton';

function Register() {
	const { control, handleSubmit, formState: { errors } } = useForm({defaultValues: {username: '', email: '', password: ''}});
	const registerMutation = useRegisterMutation();

	const onSubmit = (data: {username: string, email: string, password: string}) => {
		Keyboard.dismiss();
		registerMutation.mutate(data)
	};

	const error = (registerMutation.error as AxiosError<{message: string}>)?.response?.data?.message;

	return (
		<View className='mx-2 mt-1'>
			<Controller
				name="username"
				control={control}
				rules={{required: true}}
				render={({ field: { onChange, value } }) => (<CustomInput placeholder="Username"onChangeText={onChange}value={value}isError={!!errors.username} />)}
			/>
			<Controller
				name="email"
				control={control}
				rules={{required: true}}
				render={({ field: { onChange, value } }) => (<CustomInput placeholder="Email" onChangeText={onChange} value={value} isError={!!errors.email} />)}
			/>
			<Controller
				name="password"
				control={control}
				rules={{required: true}}
				render={({ field: { onChange, value } }) => (<CustomInput placeholder="Password" onChangeText={onChange} value={value} secureTextEntry={true} isError={!!errors.password} />)}
			/>
			{error && <Text className='text-center text-red-500'>{error}</Text>}
			<CustomButton
				handler={handleSubmit(onSubmit)}
				label='Submit'
				isLoading={registerMutation.isLoading}
			/>
		</View>
	);
}

export default Register
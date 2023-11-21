import {TouchableOpacity} from 'react-native';
import CustomActivityIndicator from './CustomActivityIndicator';

type IconProps = {
    icon: JSX.Element,
    handler: () => void,
    isLoading?: boolean,
    extraStyles?: string,
}

/**
 * Icon : Custom icon component.
 * @param props IconProps
 * @returns JSX.Element
 */
export default function Icon(props: IconProps) {
    return (
        <TouchableOpacity onPress={props.handler} className={'' + props.extraStyles}>
            {props.isLoading ? <CustomActivityIndicator /> : props.icon}
        </TouchableOpacity>
    );
}
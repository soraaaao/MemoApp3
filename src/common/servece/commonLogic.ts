import { NavigationPath } from "../type/commmonType";
import { useNavigation } from '@react-navigation/native';

export const navigationReset = (navigation: any, rootName: NavigationPath, index: number = 0): void => {
    navigation.reset({
        index: index,
        routes: [{ name: rootName }],
    })    
}
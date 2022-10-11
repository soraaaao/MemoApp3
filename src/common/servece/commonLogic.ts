import { NavigationPath } from "../type/commmonType";
import { useNavigation } from '@react-navigation/native';
import { format } from "date-fns";

export const navigationReset = (navigation: any, rootName: NavigationPath, index: number = 0): void => {
    navigation.reset({
        index: index,
        routes: [{ name: rootName }],
    })    
}

export const  dateToString = (date: Date) => {
    if (!date) return "";
    return format(date, "yyyy年M月d日 HH時mm分")
}
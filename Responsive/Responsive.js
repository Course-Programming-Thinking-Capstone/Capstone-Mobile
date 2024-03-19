import { Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

const isSmallPhone = width < 375;
const isMediumPhone = width >= 375 && width < 414;
const isLargePhone = width >= 414 && width < 600;

const isSmallTablet = width >= 600 && width < 768;
const isMediumTablet = width >= 768 && width < 1024;
const isLargeTablet = width >= 1024 && width < 1280;
const isExtraLargeTablet = width >= 1280;

export {
    isSmallPhone,
    isMediumPhone,
    isLargePhone,
    isSmallTablet,
    isMediumTablet,
    isLargeTablet,
    isExtraLargeTablet,
};
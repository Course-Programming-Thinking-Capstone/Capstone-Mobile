import { Dialog, ALERT_TYPE } from 'react-native-alert-notification';

export const showAlert = (title, message) => {
    Dialog.show({
        type: ALERT_TYPE.WARNING,
        title: title,
        textBody: message,
        button: 'OK',
    });
};

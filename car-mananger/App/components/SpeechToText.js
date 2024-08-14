import React, { useEffect, useState } from 'react';
import { View, Text, Button, PermissionsAndroid, Platform, Alert } from 'react-native';
import Voice from '@react-native-voice/voice';

const SpeechToTextComponent = () => {
    const [result, setResult] = useState('');
    const [isRecording, setIsRecording] = useState(false);

    useEffect(() => {
        Voice.onSpeechStart = onSpeechStartHandler;
        Voice.onSpeechEnd = onSpeechEndHandler;
        Voice.onSpeechResults = onSpeechResultsHandler;

        return () => {
            Voice.destroy().then(Voice.removeAllListeners);
        };
    }, []);

    const onSpeechStartHandler = (e) => {
        console.log('Speech started:', e);
    };

    const onSpeechEndHandler = (e) => {
        console.log('Speech ended:', e);
        setIsRecording(false);
    };

    const onSpeechResultsHandler = (e) => {
        console.log('Speech results:', e);
        setResult(e.value[0]);
    };

    const startRecording = async () => {
        if (Platform.OS === 'android') {
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
                {
                    title: 'Microphone Permission',
                    message: 'App needs access to your microphone to recognize speech.',
                    buttonNeutral: 'Ask Me Later',
                    buttonNegative: 'Cancel',
                    buttonPositive: 'OK',
                }
            );
            if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
                Alert.alert('Permission denied', 'Cannot access microphone.');
                return;
            }
        }

        try {
            await Voice.start('vi-VN'); // Set language to Vietnamese
            setIsRecording(true);
            setResult('');
        } catch (error) {
            console.error('Error starting Voice recognition:', error);
        }
    };

    const stopRecording = async () => {
        try {
            await Voice.stop();
            setIsRecording(false);
        } catch (error) {
            console.error('Error stopping Voice recognition:', error);
        }
    };

    return (
        <View style={{ padding: 20, justifyContent: 'center', alignItems: 'center' }}>
            <Button
                title={isRecording ? 'Dừng ghi âm' : 'Bắt đầu nói'}
                onPress={isRecording ? stopRecording : startRecording}
            />
            {result ? <Text style={{ marginTop: 20 }}>Bạn đã nói: {result}</Text> : null}
        </View>
    );
};

export default SpeechToTextComponent;

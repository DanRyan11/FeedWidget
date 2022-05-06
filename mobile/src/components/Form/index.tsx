import React, { useEffect, useState } from 'react';
import {
  View,
  TextInput,
  Image,
  TouchableOpacity,
  Text
} from 'react-native';
import { ArrowLeft } from 'phosphor-react-native';
import { captureScreen } from 'react-native-view-shot'
import * as FileSystem from 'expo-file-system';

import { FeedbackType } from '../../components/Widget';
import { api } from '../../libs/api';

import { styles } from './styles';
import { theme } from '../../theme';
import { feedbackTypes } from '../../utils/feedbackTypes';
import { ScreenshotButton } from '../ScreenshotButton';
import { Button } from '../../Button';

interface Props {
  feedbackType: FeedbackType;
  onFeedbackCanceled: () => void;
  onFeedbackSent: () => void;
}

export function Form({
  feedbackType,
  onFeedbackCanceled,
  onFeedbackSent,
}: Props) {
  const [isSendingFeedback, setIsSendingFeedback] = useState(false);
  const [screenshot, setScreenshot] = useState<string | null>(null);
  const [comment, setComment] = useState('');

  const feedbackTypeInfo = feedbackTypes[feedbackType];

  function handleRemoveScreenshot() {
    setScreenshot(null);
  }

  async function handleFeedbackSubmit() {

    if (isSendingFeedback) return

    setIsSendingFeedback(true);

    let data = {
      type: feedbackType,
      screenshot,
      comment,
    }

    if (screenshot) {
      const screenshotBase64 = await FileSystem.readAsStringAsync(screenshot, { encoding: 'base64' });
      const base64URI = `data:image/png;base64,${screenshotBase64}`

      data.screenshot = base64URI;
    }

    try {

      await api.post('/feedbacks', data)
        .catch(err => {
          console.log(err);
        })

      onFeedbackSent();

    } catch (error) {
      console.log(error);
      setIsSendingFeedback(false);
    }
  }

  function handleScreenshot() {
    captureScreen({
      format: 'jpg',
      quality: 0.8
    })
      .then(uri => setScreenshot(uri))
      .catch(err => console.log(err));
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>

        <TouchableOpacity onPress={onFeedbackCanceled}>
          <ArrowLeft
            size={24}
            weight='bold'
            color={theme.colors.text_secondary}
          />
        </TouchableOpacity>

        <View style={styles.titleContainer}>
          <Image
            source={feedbackTypeInfo.image}
            style={styles.image}
          />

          <Text style={styles.titleText} >
            {feedbackTypeInfo.title}
          </Text>
        </View>
      </View>

      <TextInput
        multiline
        style={styles.feedbackInput}
        placeholder="Conte com detalhes o que está acontecendo..."
        placeholderTextColor={theme.colors.text_secondary}
        onChangeText={setComment}
      />

      <View style={styles.footer}>
        <ScreenshotButton
          onTakeShot={handleScreenshot}
          onRemoveShot={handleRemoveScreenshot}
          screenshot={screenshot}
        />
        <Button
          isLoading={isSendingFeedback}
          onPress={handleFeedbackSubmit}
        />
      </View>
    </View>
  );
}
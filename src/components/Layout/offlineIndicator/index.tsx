import { Text, View,  } from 'react-native';
import { useNetworkStatus } from '@/hooks/UI/useNetworkStatus';
import useStyles from './style';

export const OfflineIndicator = () => {
  const isOffline = useNetworkStatus();
    const styles = useStyles()
  if (!isOffline) return null;

  return (
    <View style={styles.container}>
      <Text style={styles.text}>⚠️ You're offline</Text>
    </View>
  );
};

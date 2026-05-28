import { useMemo } from 'react';
import { StyleSheet, View } from 'react-native';
import { WebView } from 'react-native-webview';

type ChartWebViewProps = {
  labels: string[];
  data: number[];
  title: string;
};

export const ChartWebView = ({ labels, data, title }: ChartWebViewProps) => {
  const html = useMemo(
    () => `
      <!DOCTYPE html>
      <html>
        <head>
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <style>
            body { margin: 0; padding: 0; }
            #chart { width: 100%; height: 100%; }
          </style>
        </head>
        <body>
          <canvas id="chart"></canvas>
          <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
          <script>
            const ctx = document.getElementById('chart').getContext('2d');
            new Chart(ctx, {
              type: 'line',
              data: {
                labels: ${JSON.stringify(labels)},
                datasets: [{
                  label: ${JSON.stringify(title)},
                  data: ${JSON.stringify(data)},
                  borderColor: '#2563EB',
                  backgroundColor: 'rgba(37, 99, 235, 0.2)',
                  tension: 0.4,
                  fill: true
                }]
              },
              options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                  x: { ticks: { color: '#111827' } },
                  y: { ticks: { color: '#111827' } }
                }
              }
            });
          </script>
        </body>
      </html>
    `,
    [labels, data, title],
  );

  return (
    <View style={styles.container}>
      <WebView originWhitelist={['*']} source={{ html }} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 220,
    borderRadius: 12,
    overflow: 'hidden',
  },
});

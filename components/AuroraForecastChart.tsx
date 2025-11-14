import { Text, View } from "@/components/Themed";
import { useColorScheme } from "@/components/useColorScheme";
import Colors from "@/constants/Colors";
import { KpIndex } from "@/types/aurora";
import { Dimensions, StyleSheet } from "react-native";
import Svg, { Circle, Line, Path, Text as SvgText } from "react-native-svg";

interface AuroraForecastChartProps {
  forecast: KpIndex[];
}

export default function AuroraForecastChart({
  forecast,
}: AuroraForecastChartProps) {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? "light"];
  const screenWidth = Dimensions.get("window").width;
  const chartWidth = screenWidth - 64;
  const chartHeight = 180;
  const padding = { top: 20, right: 10, bottom: 40, left: 40 };

  const getKpColor = (kp: number) => {
    if (kp >= 7) return "#FF3B30";
    if (kp >= 5) return "#FF9500";
    if (kp >= 3) return "#FFCC00";
    return "#34C759";
  };

  const formatTime = (timeTag: string) => {
    try {
      const date = new Date(timeTag);
      if (isNaN(date.getTime())) {
        return "";
      }
      const hours = date.getHours();
      const period = hours >= 12 ? "PM" : "AM";
      const displayHours = hours % 12 || 12;
      return `${displayHours}${period}`;
    } catch {
      return "";
    }
  };

  if (!forecast || !Array.isArray(forecast) || forecast.length === 0) {
    return (
      <View
        style={[
          styles.container,
          {
            backgroundColor: colors.cardBackground,
            borderColor: colors.border,
          },
        ]}
      >
        <Text style={styles.title}>24-Hour History</Text>
        <Text style={[styles.noData, { color: colors.secondaryText }]}>
          No forecast data available
        </Text>
      </View>
    );
  }

  const displayData = forecast.slice(-24);

  if (displayData.length === 0) {
    return (
      <View
        style={[
          styles.container,
          {
            backgroundColor: colors.cardBackground,
            borderColor: colors.border,
          },
        ]}
      >
        <Text style={styles.title}>24-Hour History</Text>
        <Text style={[styles.noData, { color: colors.secondaryText }]}>
          No forecast data available
        </Text>
      </View>
    );
  }

  const maxKp = 9;
  const minKp = 0;
  const kpRange = maxKp - minKp;

  const chartInnerWidth = chartWidth - padding.left - padding.right;
  const chartInnerHeight = chartHeight - padding.top - padding.bottom;

  const points = displayData.map((item, index) => {
    const x =
      padding.left + (index / (displayData.length - 1)) * chartInnerWidth;
    const y =
      padding.top +
      chartInnerHeight -
      ((item.kp - minKp) / kpRange) * chartInnerHeight;
    return { x, y, kp: item.kp, time: item.time_tag };
  });

  const pathData = points.reduce((acc, point, index) => {
    if (index === 0) {
      return `M ${point.x} ${point.y}`;
    }
    const prevPoint = points[index - 1];
    const controlX1 = prevPoint.x + (point.x - prevPoint.x) / 3;
    const controlY1 = prevPoint.y;
    const controlX2 = prevPoint.x + (2 * (point.x - prevPoint.x)) / 3;
    const controlY2 = point.y;
    return `${acc} C ${controlX1} ${controlY1}, ${controlX2} ${controlY2}, ${point.x} ${point.y}`;
  }, "");

  const gradientPathData = `${pathData} L ${points[points.length - 1].x} ${
    chartHeight - padding.bottom
  } L ${padding.left} ${chartHeight - padding.bottom} Z`;

  const yAxisLabels = [0, 3, 5, 7, 9];
  const xAxisLabels = displayData
    .filter((_, index) => index % 6 === 0)
    .map((item, index) => ({
      time: formatTime(item.time_tag),
      x:
        padding.left +
        ((index * 6) / (displayData.length - 1)) * chartInnerWidth,
    }));

  const currentKp = displayData[displayData.length - 1].kp;
  const lineColor = getKpColor(currentKp);

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: colors.cardBackground, borderColor: colors.border },
      ]}
    >
      <Text style={styles.title}>24-Hour History</Text>
      <View
        style={[
          styles.chartContainer,
          { backgroundColor: colors.cardBackground },
        ]}
      >
        <Svg width={chartWidth} height={chartHeight}>
          {yAxisLabels.map((label) => {
            const y =
              padding.top +
              chartInnerHeight -
              ((label - minKp) / kpRange) * chartInnerHeight;
            return (
              <Line
                key={label}
                x1={padding.left}
                y1={y}
                x2={chartWidth - padding.right}
                y2={y}
                stroke={colors.border}
                strokeWidth="1"
                opacity={0.3}
              />
            );
          })}

          {yAxisLabels.map((label) => {
            const y =
              padding.top +
              chartInnerHeight -
              ((label - minKp) / kpRange) * chartInnerHeight;
            return (
              <SvgText
                key={`label-${label}`}
                x={padding.left - 10}
                y={y + 4}
                fontSize="12"
                fill={colors.secondaryText}
                textAnchor="end"
              >
                {label}
              </SvgText>
            );
          })}

          <Path d={gradientPathData} fill={lineColor} opacity={0.1} />

          <Path
            d={pathData}
            stroke={lineColor}
            strokeWidth="3"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {points.map((point, index) => {
            if (index % 3 === 0) {
              return (
                <Circle
                  key={index}
                  cx={point.x}
                  cy={point.y}
                  r="4"
                  fill={lineColor}
                  stroke={colors.cardBackground}
                  strokeWidth="2"
                />
              );
            }
            return null;
          })}

          {xAxisLabels.map((label, index) => (
            <SvgText
              key={index}
              x={label.x}
              y={chartHeight - padding.bottom + 20}
              fontSize="10"
              fill={colors.secondaryText}
              textAnchor="middle"
            >
              {label.time}
            </SvgText>
          ))}
        </Svg>
      </View>
      <View style={[styles.legend, { backgroundColor: colors.cardBackground }]}>
        <View
          style={[
            styles.legendItem,
            { backgroundColor: colors.cardBackground },
          ]}
        >
          <View style={[styles.legendDot, { backgroundColor: lineColor }]} />
          <Text style={[styles.legendText, { color: colors.secondaryText }]}>
            Current: {currentKp.toFixed(1)} Kp
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 12,
    borderWidth: 1,
    padding: 16,
    marginBottom: 16,
  },
  title: {
    fontSize: 17,
    fontWeight: "600",
    marginBottom: 16,
  },
  noData: {
    fontSize: 14,
    textAlign: "center",
    paddingVertical: 20,
  },
  chartContainer: {
    alignItems: "center",
    marginVertical: 8,
  },
  legend: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 12,
  },
  legendItem: {
    flexDirection: "row",
    alignItems: "center",
  },
  legendDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 6,
  },
  legendText: {
    fontSize: 12,
  },
});

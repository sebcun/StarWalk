import { Text, View } from "@/components/Themed";
import { useColorScheme } from "@/components/useColorScheme";
import Colors from "@/constants/Colors";
import { useEffect, useRef, useState } from "react";
import { ScrollView, StyleSheet, useWindowDimensions } from "react-native";

export default function CalendarScreen() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? "light"];
  const today = new Date();
  const scrollViewRef = useRef<ScrollView>(null);
  const { height: windowHeight } = useWindowDimensions();
  const [monthLayouts, setMonthLayouts] = useState<{ [key: string]: number }>(
    {}
  );

  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const dayNames = ["S", "M", "T", "W", "T", "F", "S"];

  const generateMonths = () => {
    const months = [];
    const startDate = new Date(today.getFullYear() - 5, 0, 1);
    const endDate = new Date(today.getFullYear(), 11, 31);

    let current = new Date(startDate);
    while (current <= endDate) {
      months.push({
        month: current.getMonth(),
        year: current.getFullYear(),
      });
      current.setMonth(current.getMonth() + 1);
    }

    return months;
  };

  const getDaysInMonth = (month: number, year: number) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (month: number, year: number) => {
    return new Date(year, month, 1).getDay();
  };

  const generateCalendarDays = (month: number, year: number) => {
    const daysInMonth = getDaysInMonth(month, year);
    const firstDay = getFirstDayOfMonth(month, year);
    const days = [];

    for (let i = 0; i < firstDay; i++) {
      days.push(null);
    }

    for (let i = 1; i <= daysInMonth; i++) {
      days.push(i);
    }

    return days;
  };

  const isToday = (day: number | null, month: number, year: number) => {
    if (!day) return false;
    return (
      day === today.getDate() &&
      month === today.getMonth() &&
      year === today.getFullYear()
    );
  };

  const months = generateMonths();

  const handleMonthLayout = (
    key: string,
    event: { nativeEvent: { layout: { y: number; height: number } } }
  ) => {
    const { y, height } = event.nativeEvent.layout;
    setMonthLayouts((prev) => ({ ...prev, [key]: y }));
  };

  useEffect(() => {
    const currentMonthKey = `${today.getFullYear()}-${today.getMonth()}`;
    const yPosition = monthLayouts[currentMonthKey];

    if (yPosition !== undefined && scrollViewRef.current) {
      const tabBarHeight = 100;
      const effectiveHeight = windowHeight - tabBarHeight;
      const centeredPosition = yPosition - effectiveHeight / 2 + 200;

      scrollViewRef.current.scrollTo({
        y: Math.max(0, centeredPosition),
        animated: false,
      });
    }
  }, [monthLayouts, windowHeight]);

  return (
    <ScrollView
      ref={scrollViewRef}
      style={[styles.container, { backgroundColor: colors.background }]}
      contentContainerStyle={styles.contentContainer}
      showsVerticalScrollIndicator={false}
    >
      {months.map((monthData, index) => {
        const calendarDays = generateCalendarDays(
          monthData.month,
          monthData.year
        );
        const monthKey = `${monthData.year}-${monthData.month}`;

        return (
          <View
            key={monthKey}
            style={styles.monthContainer}
            onLayout={(event) => handleMonthLayout(monthKey, event)}
          >
            <Text style={[styles.monthHeader, { color: colors.text }]}>
              {monthNames[monthData.month]} {monthData.year}
            </Text>

            <View style={styles.dayNamesContainer}>
              {dayNames.map((day, i) => (
                <View key={i} style={styles.dayNameCell}>
                  <Text
                    style={[styles.dayName, { color: colors.secondaryText }]}
                  >
                    {day}
                  </Text>
                </View>
              ))}
            </View>

            <View style={styles.daysContainer}>
              {calendarDays.map((day, dayIndex) => (
                <View key={dayIndex} style={styles.dayCell}>
                  {day && (
                    <View
                      style={[
                        styles.dayNumber,
                        isToday(day, monthData.month, monthData.year) && {
                          backgroundColor: colors.tint,
                          borderRadius: 20,
                        },
                      ]}
                    >
                      <Text
                        style={[
                          styles.dayText,
                          {
                            color: isToday(day, monthData.month, monthData.year)
                              ? "#FFFFFF"
                              : colors.text,
                          },
                        ]}
                      >
                        {day}
                      </Text>
                    </View>
                  )}
                </View>
              ))}
            </View>

            {index < months.length - 1 && (
              <View
                style={[styles.separator, { backgroundColor: colors.border }]}
              />
            )}
          </View>
        );
      })}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    paddingVertical: 20,
  },
  monthContainer: {
    paddingHorizontal: 16,
    marginBottom: 30,
  },
  monthHeader: {
    fontSize: 22,
    fontWeight: "600",
    marginBottom: 16,
    marginLeft: 4,
  },
  dayNamesContainer: {
    flexDirection: "row",
    marginBottom: 8,
  },
  dayNameCell: {
    flex: 1,
    alignItems: "center",
    paddingVertical: 4,
  },
  dayName: {
    fontSize: 13,
    fontWeight: "600",
  },
  daysContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  dayCell: {
    width: "14.285%",
    aspectRatio: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 2,
  },
  dayNumber: {
    width: 40,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
  },
  dayText: {
    fontSize: 18,
    fontWeight: "400",
  },
  separator: {
    height: 1,
    marginTop: 30,
    marginHorizontal: -16,
  },
});

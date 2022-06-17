import { colors } from '@starter/themes/colors'
import { size } from '@starter/themes/size'
import { forwardRef, useState } from 'react'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { Pressable, View, StyleSheet } from 'react-native'
import { IDateTimePickerProps } from '.'
import { Text } from '../Text'

export default function Picker({ minimumDate, date, mode, onChange, editable }: IDateTimePickerProps) {
  const [startDate, setStartDate] = useState(new Date())

  const CustomInput = forwardRef<View, { value?: string; onClick?: () => void }>(({ value, onClick }, ref) => (
    <Pressable onPress={editable ? onClick : undefined} ref={ref}>
      <View style={[styles.textInputContainer, { backgroundColor: editable ? colors.white : colors.gray400 }]}>
        <Text>{value}</Text>
      </View>
    </Pressable>
  ))

  return (
    <DatePicker
      selected={startDate}
      onChange={(date: Date) => {
        setStartDate(date)
        onChange(undefined, date)
      }}
      showTwoColumnMonthYearPicker
      isClearable={false}
      showTimeSelect={mode === 'time'}
      customInput={<CustomInput />}
    />
  )
}

const styles = StyleSheet.create({
  textInputContainer: {
    flexDirection: 'row',
    backgroundColor: colors.white,
    borderWidth: 1,
    fontSize: size[4],
    paddingHorizontal: size[3],
    paddingVertical: size[2],
    marginTop: size[1],
    borderRadius: size[2],
    alignItems: 'center',
  },
})

import { CirclePicker, Color, ColorResult } from "react-color";

export type MyColorPickerComponentProps = {
  onChangeComplete: (ColorResult: ColorResult) => void;
  color: Color | undefined;
};

const MyColorPickerComponent = ({
  color = "#f44336",
  onChangeComplete,
}: MyColorPickerComponentProps) => {
  return <CirclePicker color={color} onChangeComplete={onChangeComplete} />;
};
export default MyColorPickerComponent;

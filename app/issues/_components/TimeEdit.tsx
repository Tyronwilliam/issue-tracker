
const TimeEdit = ({
  issueTime,
  handleTimeChange,
}: {
  issueTime: string | undefined | number;
  handleTimeChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) => {
  return (
    <input
      type="time"
      step="1"
      value={issueTime}
      onChange={(e) => handleTimeChange(e)}
    />
  );
};
export default TimeEdit;

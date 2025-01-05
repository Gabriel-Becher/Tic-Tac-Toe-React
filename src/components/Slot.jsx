import "./Slot.css";
import PropTypes from "prop-types";

export default function Slot({ value, onSlotClick }) {
  return (
    <div className="slot" onClick={onSlotClick}>
      {value}
    </div>
  );
}

Slot.propTypes = {
  value: PropTypes.string,
  onSlotClick: PropTypes.func.isRequired,
};

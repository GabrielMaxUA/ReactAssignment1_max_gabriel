import React from "react";

function Row({ item, toggle }) {
  const onToggle = (timeSlot) => {
    toggle(item, timeSlot); // Pass the destination and the clicked time slot to the parent
  };

  return (
    <tr>
      <td class="locationName">{item.locationName}</td>
      <td>
        {item.timeSlots.map((slot) => (
          <label key={slot.time} style={{ marginRight: "50px" }}>
            <input
              type="checkbox"
              checked={slot.booked}
              onChange={() => onToggle(slot.time)}
              disabled={slot.booked} // Disable the checkbox if already booked
            />
            {slot.time}
          </label>
        ))}
      </td>
    </tr>
  );
}

export default Row;

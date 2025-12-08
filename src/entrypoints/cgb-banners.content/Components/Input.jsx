export default function Input({ changeDate, dateValue, changeText, textValue, title }) {
  const handleDateChange = e => {
    const value = e.target.value;
    const isValid = /^\d{4}-\d{2}-\d{2}$/.test(value);
    if (isValid) {
      changeDate(value);
    } else {
      changeDate('');
    }
  };

  return (
    <div className="input">
      <h2 className="input__title">{title}</h2>
      <div className="input__container">
        <input className="input__actOrDeact" type="date" value={dateValue || ''} onChange={handleDateChange} />
        <span className="input__span">|</span>
        <input className="input__actOrDeact" type="text" value={textValue} readOnly />
      </div>
    </div>
  );
}

import Calendar from 'react-calendar'; // Importe o componente de calendário

const WidgetWithCalendar = ({ selectedDate, handleDateChange }) => {
    return (
      <div className="mb-4">
        <div className="shadow-lg rounded-2xl p-4 bg-white dark:bg-gray-700">
          <Calendar onChange={handleDateChange} value={selectedDate} />
        </div>
      </div>
    );
  };

  export default WidgetWithCalendar
'use client';

const ReservationFlow =  ( props: {questionnaire_status:any, booking_status:any, client_status:any, reminder_status:any} ) => {
    const getStatusIndicator = (status: any) => {
        return status
          ? <span className="text-green-500 font-semibold">COMPLETED</span>
          : <span className="text-gray-400 font-semibold">INCOMPLETE</span>;
      };
    return (
        <>
        <div className={"border-2 border-white flex flex-col md:flex-row justify-evenly items-center p-3" }>
          <p className={"my-4"}>
            Completed Questionnaire:{" "}
            {getStatusIndicator(props.questionnaire_status)}
          </p>
          <p className={"my-4"}>
            Completed Appointment Selection:{" "}
            {getStatusIndicator(props.booking_status)}
          </p>
          <p className={"my-4"}>
            Completed Client Details: {getStatusIndicator(props.client_status)}
          </p>
          <p className={"my-4"}>
            Completed Reminders Confirmation:{" "}
            {getStatusIndicator(props.reminder_status)}
          </p>
        </div>
        </>
    )
} 

export default ReservationFlow;
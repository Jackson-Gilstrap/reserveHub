'use client';

const ReservationFlow =  ( props: {questionnaire_status:any, booking_status:any, client_status:any, reminder_status:any} ) => {
    const getStatusIndicator = (status: any) => {
        return status
          ? <span className="text-green-500 font-semibold">COMPLETED</span>
          : <span className="text-gray-400 font-semibold">INCOMPLETE</span>;
      };
    return (
        <>
        <div className="flex flex-row justify-center items-center border-y-4  border-x-4 border-black mx-6 divide-x-2 divide-black h-36 w-19/20">
          <p className={"my-4 h- text-center"}>
            Completed Questionnaire:{" "}
            {getStatusIndicator(props.questionnaire_status)}
          </p>
          <p className={"my-4 h- text-center"}>
            Completed Appointment Selection:{" "}
            {getStatusIndicator(props.booking_status)}
          </p>
          <p className={"my-4 h- text-center"}>
            Completed Client Details: {getStatusIndicator(props.client_status)}
          </p>
          <p className={"my-4 h- text-center"}>
            Completed Reminders Confirmation:{" "}
            {getStatusIndicator(props.reminder_status)}
          </p>
        </div>
        </>
    )
} 

export default ReservationFlow;
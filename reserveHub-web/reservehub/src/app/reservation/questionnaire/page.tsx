"use client";
import Questionnaire from "@/components/questionnaire";
import Link from "next/link";
const QuestionnairePage = () => {
  return (
    <>
      <Link href={"/"}>
        <div
          className={
            "border-2 border-white rounded-md px-4 py-2 mx-5 my-4 max-w-48"
          }
        >
          <h3>Return Home &lt;--</h3>
        </div>
      </Link>
      <Questionnaire />
    </>
  );
};

export default QuestionnairePage;

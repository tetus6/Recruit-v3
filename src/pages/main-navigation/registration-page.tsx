import RegistrationForm from "~/components/RegistrationForm";
import { useState } from "react";
import router from "next/router";
import React from "react";
import type { RouterInputs } from "~/utils/api";
import { api } from "~/utils/api";

const RegistrationPage = () => {
  type RegistrationInput = RouterInputs["registration"]["create"];
  const [submitting, setSubmitting] = useState(false);
  const [registration, setRegistration] = useState<RegistrationInput>({
    creator: "",
    firstname: "",
    lastname: "",
    phone: "",
    birthdate: "",
    nationality: "",
    address: "",
    gender: "",
    desiredOccupation: "",
    desiredLocation: "",
    desiredSalary: "",
    jobID: "",
    file: "",
  });
  const mutation = api.registration.create.useMutation();

  const handlesubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      mutation.mutate(registration);
    } catch (error) {
      console.log(error);
    } finally {
      await router.push("/");
      setSubmitting(false);
    }
    //need to know how to receive response from prisma that the data
    //has been successfully pushed -> then setsubmitting to false and return to /
  };

  return (
    <div>
      <RegistrationForm
        registration={registration}
        setRegistration={setRegistration}
        submitting={submitting}
        handleSubmit={handlesubmit}
      />
    </div>
  );
};

export default RegistrationPage;

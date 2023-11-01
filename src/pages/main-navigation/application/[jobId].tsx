import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { api } from "~/utils/api";
import type { RouterOutputs, RouterInputs } from "~/utils/api";

export type applicationDetail = RouterInputs["application"]["create"];

const ApplicationForm = () => {
  const router = useRouter();
  const jobId = router.query; // obtain jobId from router for navigating directories and labeling applications
  const applicationMutation = api.application.create.useMutation();
  const fileMutation = api.file.createPresignedUrl.useMutation();
  const [submitting, setSubmitting] = useState(false);
  const [fieldsKey, setFieldsKey] = useState<string>();
  const [fieldsKeyIsAvailable, setFieldsKeyIsAvailable] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [application, setApplication] = useState<applicationDetail>({
    jobId: "",
    firstname: "",
    lastname: "",
    email: "",
    phone: "",
    birthdate: "",
    nationality: "",
    address: "",
    gender: "",
    fileUrl: "",
  });
  const fileQuery = api.file.createFileUrl.useQuery(fieldsKey, {
    enabled:fieldsKeyIsAvailable,
  });

  useEffect(() => {
    if (typeof fileQuery.data === 'string') {
      const fileUrl = fileQuery.data
      setApplication({ ...application, fileUrl: fileUrl });
    }
  }, [application, fileQuery.data]);

  // use react hood (useEffect?) to make state available through all component
  // (save the previous detail so that the user do not need to input the detail again)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      applicationMutation.mutate(application);
    } catch (error) {
      console.log(error);
    } finally {
      await router.push("/");
      setSubmitting(false);
      // setFieldsKeyIsAvailable(false);
    }
  };

  // const createFileUrl = (input: string) => {
  //   const fileQuery = api.file.createFileUrl.useQuery(input);
  //   try {
  //     if (typeof fileQuery.data === "string") {
  //       const fileUrl = fileQuery.data;
  //       console.log("Recieved fileUrl:", fileUrl);

  //       setApplication({
  //         ...application,
  //         fileUrl: fileUrl,
  //       });
  //     } else {
  //       console.error("fileUrl is not a string!!");
  //     }
  //   } catch (error) {
  //     console.error("Error creating fileUrl:", error);
  //   }
  // };

  const uploadImage = async (e) => {
    e.preventDefault();
    if (!file) return;
    const { url, fields } = await fileMutation.mutateAsync(file.type);
    // set complete(full) fileUrl to application state
    const fieldsKey = fields.key as string;
    setFieldsKey(fieldsKey);
    setFieldsKeyIsAvailable(true);

    // upload image to aws s3
    const formData = new FormData();

    Object.entries({ ...fields, "Content-Type": file.type, file }).forEach(
      ([key, value]) => {
        formData.append(key, value);
      }
    );

    const upload = await fetch(url, {
      method: "POST",
      body: formData,
    });

    if (upload.ok) {
      console.log("Uploaded successfully!");
    } else {
      console.error("Upload failed.");
    }

    setFile(null);
    //refetch image unnecessary in my case
  };

  return (
    <div className="px-12">
      <div className="h-12" />
      <div className="">
        <h3 className="text-5xl font-medium text-white ">Quick Start</h3>
        <div className="h-4" />
        <p className="text-lg font-normal text-white">Some description text</p>
      </div>
      <div className="h-12" />
      <form onSubmit={handleSubmit} className="">
        <div className="mb-3">
          <label
            htmlFor="firstName"
            className="mb-2 block text-base font-medium text-gray-900 dark:text-white"
          >
            First Name
          </label>
          <input
            type="firstName"
            id="firstName"
            className="dark:shadow-base-light shadow-base block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-base text-gray-900 focus:border-red-500 focus:ring-red-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-red-500 dark:focus:ring-red-500"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setApplication({...application, firstname: e.target.value})
            }}
            required
          ></input>
        </div>
        <div className="mb-3">
          <label
            htmlFor="lastName"
            className="mb-2 block text-base font-medium text-gray-900 dark:text-white"
          >
            Last Name
          </label>
          <input
            type="lastName"
            id="lastName"
            className="dark:shadow-base-light shadow-base block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-base text-gray-900 focus:border-red-500 focus:ring-red-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-red-500 dark:focus:ring-red-500"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setApplication({...application, lastname: e.target.value})
            }}
            required
          ></input>
        </div>
        <div className="mb-3">
          <label
            htmlFor="email"
            className="mb-2 block text-base font-medium text-gray-900 dark:text-white"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            className="dark:shadow-base-light shadow-base block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-base text-gray-900 focus:border-red-500 focus:ring-red-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-red-500 dark:focus:ring-red-500"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setApplication({...application, email: e.target.value})
            }}
            required
          ></input>
        </div>
        <div className="mb-3">
          <label
            htmlFor="phone"
            className="mb-2 block text-base font-medium text-gray-900 dark:text-white"
          >
            Phone
          </label>
          <input
            type="phone"
            id="phone"
            className="dark:shadow-base-light shadow-base block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-base text-gray-900 focus:border-red-500 focus:ring-red-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-red-500 dark:focus:ring-red-500"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setApplication({...application, phone: e.target.value})
            }}
            required
          ></input>
        </div>
        <div className="mb-3">
          <label
            htmlFor="birthdate"
            className="mb-2 block text-base font-medium text-gray-900 dark:text-white"
          >
            Birthdate
          </label>
          <input
            type="birthdate"
            id="birthdate"
            className="dark:shadow-base-light shadow-base block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-base text-gray-900 focus:border-red-500 focus:ring-red-500 dark:border-gray-300 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-red-500 dark:focus:ring-red-500"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setApplication({...application, birthdate: e.target.value})
            }}
            required
          ></input>
        </div>
        <div className="mb-3">
          <label
            htmlFor="nationality"
            className="mb-2 block text-base font-medium text-gray-900 dark:text-white"
          >
            Nationality
          </label>
          <input
            type="nationality"
            id="nationality"
            className="dark:shadow-base-light shadow-base block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-base text-gray-900 focus:border-red-500 focus:ring-red-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-red-500 dark:focus:ring-red-500"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setApplication({...application, nationality: e.target.value})
            }}
            required
          ></input>
        </div>
        <div className="mb-3">
          <label
            htmlFor="gender"
            className="mb-2 block text-base font-medium text-gray-900 dark:text-white"
          >
            Gender
          </label>
          <input
            type="gender"
            id="gender"
            className="dark:shadow-base-light shadow-base block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-base text-gray-900 focus:border-red-500 focus:ring-red-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-red-500 dark:focus:ring-red-500"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setApplication({...application, gender: e.target.value})
            }}
            required
          ></input>
        </div>
        <div className="mb-8">
          <label
            htmlFor="gender"
            className="mb-2 block text-base font-medium text-gray-900 dark:text-white"
          >
            File Upload
          </label>
          <div className="grid grid-cols-6">
            <input
              className="dark:shadow-base-light shadow-base col-span-5 mr-8 block rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-base text-gray-900 focus:border-red-500 focus:ring-red-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-red-500 dark:focus:ring-red-500"
              id="file_input"
              type="file"
              accept=".jpeg, .png, .jpg, .pdf"
              onChange={(e) => {
                setFile(e.target.files[0]);
              }}
              required
            />
            <button
              type="submit"
              className="col-span-1 rounded-lg bg-red-700 px-10 py-2.5 text-center text-base font-medium text-white hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
              onClick={uploadImage}
            >
              upload
            </button>
          </div>
        </div>
        <div className="grid grid-cols-6 gap-4">
          <Link
            href="/"
            className="rounded-full bg-red-700 px-10 py-2.5 text-center text-base font-medium text-white hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
          >
            Cancel
          </Link>
          <button
            type="submit"
            className="rounded-full bg-red-700 px-10 py-2.5 text-center text-base font-medium text-white hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
          >
            Apply
          </button>
        </div>
        <div className="h-20" />
      </form>
    </div>
  );
};

export default ApplicationForm;

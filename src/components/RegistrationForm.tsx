import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { api } from "~/utils/api";
import type { RouterInputs } from "~/utils/api";
import router from "next/router";
import React from "react";

// export interface RegistrationForm {
//   registration: Registration;
//   setRegistration: Dispatch<SetStateAction<Registration>>;
//   submitting: boolean;
//   handleSubmit: (e: React.FormEvent<HTMLFormElement>) => Promise<void>;
// }

export type RegistrationInput = RouterInputs["registration"]["create"];

// interface RegistrationFormProps {
//   registration: RegistrationInput;
//   setRegistration: React.Dispatch<React.SetStateAction<RegistrationInput>>;
//   submitting: boolean;
//   handleSubmit: (e: React.FormEvent<HTMLFormElement>) => Promise<void>;
// }

const RegistrationForm: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const fileMutation = api.file.createPresignedUrl.useMutation();
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

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
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

  //router for creating presigned url
  //router for refetching images

  const uploadImage = async (e) => {
    e.preventDefault();
    if (!file) return;
    const { url, fields } = await fileMutation.mutateAsync(file.type);
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

    // const fileQuery = api.file.getFileUrl.useQuery();
    // const fileUrl = fileQuery.data;

    // setRegistration({ ...registration, url: fileUrl })
    setFile(null);

    //refetch image unnecessary in my case
  };

  return (
    <section className="flex-start w-full max-w-full flex-col">
      <form onSubmit={handleSubmit} className="flex w-full flex-col">
        <label>
          <span className="text-base">First Name</span>
          <textarea
            value={registration.firstname}
            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
              setRegistration({ ...registration, firstname: e.target.value })
            }
            placeholder="Firstname"
            required
            className=""
          />
        </label>

        <label>
          <span className="text-base">Last Name</span>
          <textarea
            value={registration.lastname}
            onChange={(e) =>
              setRegistration({ ...registration, lastname: e.target.value })
            }
            placeholder="Lastname"
            required
            className=""
          />
        </label>

        <label>
          <span className="text-base">Phone number</span>
          <textarea
            value={registration.phone}
            onChange={(e) =>
              setRegistration({ ...registration, phone: e.target.value })
            }
            placeholder="0800000000"
            required
            className=" "
          />
        </label>

        <label>
          <span className="text-base">Nationality</span>
          <select
            onChange={(e) =>
              setRegistration({
                ...registration,
                nationality: e.target.value,
              })
            }
            className=""
          >
            <option value="thai">Thai</option>
            <option value="japan">Japan</option>
            <option value="other (asian)">Other (Asian)</option>
            <option value="other (non-asian)">Other (Non-Asian)</option>
          </select>
        </label>

        <label>
          <span className="text-base">Address</span>
          <textarea
            value={registration.address}
            onChange={(e) =>
              setRegistration({ ...registration, address: e.target.value })
            }
            placeholder=""
            required
            className=" "
          />
        </label>

        <label>
          <span className="text-base">Gender</span>
          <select
            onChange={(e) =>
              setRegistration({
                ...registration,
                gender: e.target.value,
              })
            }
            className=""
          >
            <option value="male">Male</option>
            <option value="famale">Female</option>
            <option value="other">Other</option>
          </select>
        </label>

        <label>
          <span className="text-base">Desired Occupation</span>
          <select
            onChange={(e) =>
              setRegistration({
                ...registration,
                desiredOccupation: e.target.value,
              })
            }
            className=""
          >
            <option value="male">Desired Occupation*</option>
            <optgroup label="Sales">
              <option value="Sales (Corporate)">Sales (Corporate)</option>
              <option value="IT Sales (Software & Network)">
                IT Sales (Software & Network)
              </option>
              <option value="Sales Engineer">Sales Engineer</option>
              <option value="Business Development/Business Planning">
                Business Development/Business Planning
              </option>
              <option value="Other (Sales)">Other (Sales)</option>
            </optgroup>

            <optgroup label="Marketing">
              <option value="Marketing, Advertising & Account Executive">
                Marketing, Advertising & Account Executive
              </option>
              <option value="Digital Marketing">Digital Marketing</option>
              <option value="PR">PR</option>
              <option value="Other (Marketing)">Other (Marketing)</option>
            </optgroup>

            <optgroup label="Office Management">
              <option value="Accounting & Finance">Accounting & Finance</option>
              <option value="HR & General Affair">HR & General Affair</option>
              <option value="Secretary">Secretary</option>
              <option value="Logistics & Material Procurement">
                Logistics & Material Procurement
              </option>
              <option value="Other (Office Management)">
                Other (Office Management)
              </option>
            </optgroup>

            <optgroup label="Technical (Software & Network)">
              <option value="IT Consulting">IT Consulting</option>
              <option value="Database Engineer">Database Engineer</option>
              <option value="System Analyst/Consultant">
                System Analyst/Consultant
              </option>
              <option value="Software Engineer">Software Engineer</option>
              <option value="Mobile Application Developer">
                Mobile Application Developer
              </option>
              <option value="Mobile & PC Game Developer">
                Mobile & PC Game Developer
              </option>
              <option value="Project Manager">Project Manager</option>
              <option value="Internal IT Administration">
                Internal IT Administration
              </option>
              <option value="Network Engineer (Design)">
                Network Engineer (Design)
              </option>
              <option value="Network Engineer (Development)">
                Network Engineer (Development)
              </option>
              <option value="Research & Development">
                Research & Development
              </option>
              <option value="Support, Maintainance & Other Services">
                Support, Maintainance & Other Services
              </option>
            </optgroup>

            <optgroup label="Technical (Electrical & Electronics)">
              <option value="Circuit Design & Implementation">
                Circuit Design & Implementation
              </option>
              <option value="Process and Production">
                Process and Production
              </option>
              <option value="QC & Product Management">
                QC & Product Management
              </option>
              <option value="Service Engineer">Service Engineer</option>
              <option value="Other (Electrical & Electronics)">
                Other (Electrical & Electronics)
              </option>
            </optgroup>

            <optgroup label="Technical (Machinery & Heavy Industry)">
              <option value="Mechanical Design">Mechanical Design</option>
              <option value="Mechatronic Control Design">
                Mechatronic Control Design
              </option>
              <option value="Process and Production">
                Process and Production
              </option>
              <option value="QC & Product Management">
                QC & Product Management
              </option>
              <option value="Service Engineer">Service Engineer</option>
              <option value="Automation Engineer">Automation Engineer</option>
              <option value="Other (Machinery & Heavy Industry)">
                Other (Machinery & Heavy Industry)
              </option>
            </optgroup>

            <optgroup label="Technical (Chemical, Food & Medicine)">
              <option value="Product Development">Product Development</option>
              <option value="Process and Production">
                Process and Production
              </option>
              <option value="QC & Product Management">
                QC & Product Management
              </option>
              <option value="Chemical Engineer">Chemical Engineer</option>
              <option value="Biomedical & Pharmaceutical Engineering">
                Biomedical & Pharmaceutical Engineering
              </option>
              <option value="Oil, Gas & Petrileum Engineer">
                Oil, Gas & Petrileum Engineer
              </option>
              <option value="Other (Chemical, Food & Medicine)">
                Other (Chemical, Food & Medicine)
              </option>
            </optgroup>

            <optgroup label="Technical (Construction & Civil Engineering)">
              <option value="Product Manager">Product Manager</option>
              <option value="Construction and Civil Engineer">
                Construction and Civil Engineer
              </option>
              <option value="Architecture">Architecture</option>
              <option value="Other (Construction & Civil Engineering)">
                Other (Construction & Civil Engineering)
              </option>
            </optgroup>

            <optgroup label="Consulting">
              <option value="Busineess">Busineess</option>
              <option value="Finance Consultant">Finance Consultant</option>
              <option value="Legal Consultant">Legal Consultant</option>
              <option value="HR & Organization Consultant">
                HR & Organization Consultant
              </option>
              <option value="Other (Consulting)">Other (Consulting)</option>
            </optgroup>

            <optgroup label="Creative, Media & Advertising">
              <option value="Mobile Game Designer">Mobile Game Designer</option>
              <option value="Fashion Designer">Fashion Designer</option>
              <option value="Interior Designer">Interior Designer</option>
              <option value="Media & Advertising">Media & Advertising</option>
              <option value="Illustrator">Illustrator</option>
              <option value="Other (Creative, Media & Advertising)">
                Other (Creative, Media & Advertising)
              </option>
            </optgroup>

            <optgroup label="Service">
              <option value="Store Manager">Store Manager</option>
              <option value="Sales Manager">Sales Manager</option>
              <option value="Customer Service">Customer Service</option>
              <option value="Call Center">Call Center</option>
              <option value="Interpreter/Translator">
                Interpreter/Translator
              </option>
              <option value="Other (Service)">Other (Service)</option>
            </optgroup>
          </select>
        </label>

        {/* need to add more dropdown options */}
        <label>
          <span className="text-base">Desired Location*</span>
          <select
            onChange={(e) =>
              setRegistration({
                ...registration,
                desiredLocation: e.target.value,
              })
            }
            className=""
          >
            <option value="male">Bangkok</option>
            <option value="famale">Remote</option>
            <option value="other">Other</option>
          </select>
        </label>

        <label>
          <span className="text-base">Desired Salary</span>
          <textarea
            value={registration.desiredSalary}
            onChange={(e) =>
              setRegistration({
                ...registration,
                desiredSalary: e.target.value,
              })
            }
            placeholder=""
            required
            className=" "
          />
        </label>

        <label>
          <span className="text-base">Job ID</span>
          <textarea
            value={registration.jobID}
            onChange={(e) =>
              setRegistration({ ...registration, jobID: e.target.value })
            }
            placeholder=""
            required
            className=" "
          />
        </label>
        <label>
          <span className="text-base">Resume Upload</span>
          <Image
            src={registration.file}
            width={500}
            height={500}
            alt="Picture of the author"
          />
          <input
            type="file"
            accept=".jpeg, .png, .jpg, .pdf"
            onChange={(e) => {
              setFile(e.target.files[0]);
            }}
            required
          />
          <button
            type="submit"
            className="rounded-full px-5 py-1.5 text-sm text-black"
            onClick={uploadImage}
          >
            upload
          </button>
        </label>

        <div className="flex-end mx-3 mb-5 gap-4">
          <Link href="/" className="text-sm text-gray-500">
            Cancel
          </Link>

          <button
            type="submit"
            disabled={submitting}
            className="rounded-full px-5 py-1.5 text-sm text-black"
          >
            {submitting ? "Creating" : "Create"}
          </button>
        </div>
      </form>
    </section>
  );
};

export default RegistrationForm;

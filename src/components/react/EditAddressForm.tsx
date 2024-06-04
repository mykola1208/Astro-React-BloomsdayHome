import React, { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { ReactSVG } from "react-svg";
import Breadcrumbs from "./Breadcrumbs";
import { GET_PROPERTY } from "../../apollo/queries/getProperty";
import { createApolloClient } from "../../apollo/client";
import { useCreateAddress } from "../../hooks/useCreateAddress";
import { useUpdateAddress } from "../../hooks/useUpdateAddress";

interface Inputs {
  street: string;
  city: string;
  state: string;
  zip_code: number;
}

interface Breadcrumb {
  title: string;
  url: string;
}
interface EditAdressFormProps {
  breadcrumbs: Breadcrumb[];
}

const initialValues = {
  street: "",
  city: "",
  state: "",
  zip_code: null,
  id: "",
};

const schema = yup.object().shape({
  street: yup.string().required("Street is required"),
  city: yup.string().required("City is required"),
  state: yup.string().required("State is required"),
  zip_code: yup.string().required("Zip Code is required"),
});

const EditAddressForm: React.FC<EditAdressFormProps> = ({ breadcrumbs }) => {
  const [open, setOpen] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const dropdownMenuRef = useRef<HTMLDivElement>(null);

  const [address, setAddress] = useState(initialValues);
  const { createClient } = createApolloClient();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<Inputs>({
    initialValues,
    mode: "onChange",
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    const getUserAddress = async () => {
      const client = await createClient();
      const response = await client.query({
        query: GET_PROPERTY,
      });

      const {
        address1: street,
        city,
        state,
        zip5: zip_code,
        id,
      } = response?.data?.properties[0] || {};

      setAddress({
        street,
        city,
        state,
        zip_code,
        id,
      });

      setValue("street", street || "");
      setValue("city", city || "");
      setValue("state", state || "");
      setValue("zip_code", zip_code || null);
    };

    getUserAddress();
  }, []);

  const { createAddress } = useCreateAddress();

  const { updateAddress } = useUpdateAddress();

  const handleButtonClick = () => {
    setOpen(!open);
  };

  const randomId = Math.floor(Math.random() * 9999);

  const onSubmit = async (data: Inputs) => {
    let addressId = null;

    if (address.id) {
      addressId = await updateAddress(address.id, data);
    } else {
      addressId = await createAddress(data);
    }

    if (addressId) {
      setAddress({
        street: data.street,
        city: data.city,
        state: data.state,
        zip_code: data.zip_code,
        id: addressId,
      });
    }

    setOpen(!open);
  };

  return (
    <div className="relative dropdown">
      <div className="py-7 px-6">
        <div className="neue text-darkgreen text-lg font-bold leading-5">
          <Breadcrumbs breadcrumbs={breadcrumbs} />
        </div>
        <div className="pr-4 pt-2 gap-4 mt-4 flex">
          <ReactSVG src="/icons/myhouse.svg" />
          <div className="flex flex-col items-baseline">
            <div className="flex">
              <p className="text-base leading-4 text-darkgreen mt-3.5 font-medium">
                My Home
              </p>
              <button
                className="flex ml-2 mt-2"
                ref={buttonRef}
                onClick={handleButtonClick}
              >
                <ReactSVG src="/icons/edit.svg" width={20} height={21} />
              </button>
            </div>
            <p className="text-1.5xl font-medium text-darkgreen">
              {address.street
                ? `${address.street}, ${address.city}, ${address.state} ${address.zip_code}`
                : "Street, City, State 00000"}
            </p>
          </div>
        </div>
      </div>
      {open && (
        <div
          className={`dropdown-menu z-10 py-7 px-8 flex fixed flex-col rounded-xl bg-white text-darkgreen w-80 ml-20 `}
          role="menu"
          aria-orientation="vertical"
          aria-labelledby={`menu-button-${randomId}`}
          ref={dropdownMenuRef}
        >
          <form
            className="flex flex-col gap-3"
            onSubmit={handleSubmit(onSubmit)}
            method="POST"
          >
            <div>
              <label
                htmlFor="street"
                className="text-base text-darkgreen font-medium leading-6 items-start flex"
              >
                Street
              </label>
              <div className="relative mt-2 shadow-sm">
                <input
                  {...register("street")}
                  placeholder="Enter Street"
                  className={`block w-full rounded-xl border bg-cream-light text-lg text-darkgreen py-3 px-4 placeholder:text-darkgreen focus:border-sage focus:bg-white `}
                />
              </div>
              {errors.street && (
                <p className="text-xs font-medium text-red-500 mt-1">
                  {errors.street.message}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="street"
                className="text-base text-darkgreen font-medium leading-6 items-start flex"
              >
                City
              </label>
              <div className="relative mt-2 shadow-sm">
                <input
                  {...register("city")}
                  placeholder="Enter City"
                  className={`block w-full rounded-xl border bg-cream-light text-lg text-darkgreen py-3 px-4 placeholder:text-darkgreen focus:border-sage focus:bg-white `}
                />
              </div>
              {errors.city && (
                <p className="text-xs font-medium text-red-500 mt-1">
                  {errors.city.message}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="state"
                className="text-base text-darkgreen font-medium leading-6 items-start flex"
              >
                State
              </label>
              <div className="relative mt-2 shadow-sm">
                <input
                  {...register("state")}
                  placeholder="Enter State"
                  className={`block w-full rounded-xl border bg-cream-light text-lg text-darkgreen py-3 px-4 placeholder:text-darkgreen focus:border-sage focus:bg-white `}
                />
              </div>
              {errors.state && (
                <p className="text-xs font-medium text-red-500 mt-1">
                  {errors.state.message}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="zip_code"
                className="text-base text-darkgreen font-medium leading-6 items-start flex"
              >
                Zip Code
              </label>
              <div className="relative mt-2 shadow-sm">
                <input
                  {...register("zip_code")}
                  placeholder="Enter Zip Code"
                  className={`block w-full rounded-xl border bg-cream-light text-lg text-darkgreen py-3 px-4 placeholder:text-darkgreen focus:border-sage focus:bg-white `}
                />
              </div>
              {errors.zip_code && (
                <p className="text-xs font-medium text-red-500 mt-1">
                  {errors.zip_code.message}
                </p>
              )}
            </div>

            <button className="bg-darkgreen rounded-xl text-white py-4 px-3 font-medium mt-8">
              Submit
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default EditAddressForm;

import React, { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useCreateAddress } from "../../hooks/useCreateAddress";
import { useUpdateAddress } from "../../hooks/useUpdateAddress";

interface Inputs {
  street: string;
  city: string;
  state: string;
  zip_code: number;
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

const EditAddressForm = ({ address }) => {
  const [loaded, setLoaded] = useState(false);
  const dropdownMenuRef = useRef<HTMLDivElement>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<Inputs>({
    defaultValues: initialValues,
    mode: "onChange",
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    setValue("street", address?.address1 || "");
    setValue("city", address?.city || "");
    setValue("state", address?.state || "");
    setValue("zip_code", address?.zip5 || null);

    setTimeout(() => {
      setLoaded(true);
    }, 100);
  }, []);

  const { createAddress } = useCreateAddress();
  const { updateAddress } = useUpdateAddress();

  const randomId = Math.floor(Math.random() * 9999);

  const onSubmit = async (data: Inputs) => {
    let addressId = null;

    if (address?.id) {
      addressId = await updateAddress(address.id, data);
    } else {
      addressId = await createAddress(data);
    }

    if (addressId) {
      document.getElementById(
        "showAddress"
      ).innerHTML = `${data.street}, ${data.city}, ${data.state} ${data.zip_code}`;

      const editForm = document.getElementById("editForm");
      editForm.classList.remove("visible");
      editForm.classList.add("hidden");
    }
  };

  return (
    <div
      className="relative"
      style={{ visibility: loaded ? "visible" : "hidden" }}
    >
      <div
        id="editForm"
        className="absolute top-16 left-[-230px] z-[999] py-7 px-8 flex-col rounded-xl bg-white text-darkgreen w-80 ml-20 hidden shadow shadow-[#D9D9D9] dropdown-menu"
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
                className="block w-full rounded-xl border bg-cream-light text-lg text-darkgreen py-3 px-4 placeholder:text-darkgreen placeholder:font-medium focus:border-sage focus:bg-white"
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
              htmlFor="city"
              className="text-base text-darkgreen font-medium leading-6 items-start flex"
            >
              City
            </label>
            <div className="relative mt-2 shadow-sm">
              <input
                {...register("city")}
                placeholder="Enter City"
                className="block w-full rounded-xl border bg-cream-light text-lg text-darkgreen py-3 px-4 placeholder:text-darkgreen placeholder:font-medium focus:border-sage focus:bg-white"
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
                className="block w-full rounded-xl border bg-cream-light text-lg text-darkgreen py-3 px-4 placeholder:text-darkgreen placeholder:font-medium focus:border-sage focus:bg-white"
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
                className="block w-full rounded-xl border bg-cream-light text-lg text-darkgreen py-3 px-4 placeholder:text-darkgreen placeholder:font-medium focus:border-sage focus:bg-white"
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
    </div>
  );
};

export default EditAddressForm;

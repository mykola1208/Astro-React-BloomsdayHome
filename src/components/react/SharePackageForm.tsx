import React, { useState, useMemo } from "react";
import { ReactSVG } from "react-svg";
import Accordion from "./Accordion";
import Checkbox from "./Checkbox";

interface AccordionMenuItem {
  id: string;
  title: string;
  checked: boolean;
  type: string;
}

interface AccordionItem {
  title: string;
  items: AccordionMenuItem[];
}

const accordionItems: AccordionItem[] = [
  {
    title: "Assets",
    items: [
      {
        id: "bank_statement",
        title: "Bank Statement",
        checked: true,
        type: "PDF",
      },
      {
        id: "tax_returns",
        title: "2023 Tax Returns",
        checked: true,
        type: "PDF",
      },
      {
        id: "w_2_form",
        title: "2023 W-2 Form",
        checked: true,
        type: "PDF",
      },
    ],
  },
  {
    title: "Income",
    items: [
      {
        id: "pay_stubs",
        title: "Pay Stubs",
        checked: false,
        type: "PDF",
      },
      {
        id: "employment_letter",
        title: "Employment Letter",
        checked: true,
        type: "PDF",
      },
    ],
  },
  {
    title: "Debts",
    items: [
      {
        id: "pay_stubs1",
        title: "Pay Stubs",
        checked: false,
        type: "PDF",
      },
      {
        id: "employment_letter1",
        title: "Employment Letter",
        checked: true,
        type: "PDF",
      },
    ],
  },
  {
    title: "Reports",
    items: [
      {
        id: "pay_stubs2",
        title: "Pay Stubs",
        checked: false,
        type: "PDF",
      },
      {
        id: "employment_letter2",
        title: "Employment Letter",
        checked: true,
        type: "PDF",
      },
    ],
  },
];
const SharePackageForm = () => {
  const [isChecked, setIsChecked] = useState<{
    [key: string]: boolean;
  }>(
    accordionItems.reduce((result, { items }) => {
      items.map(({ id, checked }) => (result[id] = checked));
      return result;
    }, {})
  );

  const isCheckedAll = useMemo(() => {
    return Object.keys(isChecked).every((key) => isChecked[key] === true);
  }, [isChecked]);

  return (
    <div>
      <div className="flex flex-row gap-7">
        <div className="flex flex-col flex-1 gap-3">
          <div className="flex flex-col gap-1">
            <label
              htmlFor="to"
              className="text-base text-darkgreen font-medium leading-6 items-start flex"
            >
              To:
            </label>
            <input
              name="to"
              className="block w-full rounded-xl border bg-cream-light text-lg text-darkgreen py-3 px-4 placeholder:text-darkgreen border-sage focus:bg-white"
            />
          </div>
          <div className="flex flex-col gap-1">
            <label
              htmlFor="subject"
              className="text-base text-darkgreen font-medium leading-6 items-start flex"
            >
              Subject
            </label>
            <input
              name="subject"
              className="block w-full rounded-xl border bg-cream-light text-lg text-darkgreen py-3 px-4 placeholder:text-darkgreen border-sage focus:bg-white"
            />
          </div>
        </div>

        <div className="flex flex-1 flex-col gap-1">
          <label
            htmlFor="message"
            className="text-base text-darkgreen font-medium leading-6 items-start flex"
          >
            Message:
          </label>
          <textarea
            name="message"
            className="flex-1 flex  w-full rounded-xl border bg-cream-light text-lg text-darkgreen py-3 px-4 placeholder:text-darkgreen border-sage focus:bg-white"
          />
        </div>
      </div>
      <div className="flex flex-col mt-4 mb-5 max-h-102 overflow-auto">
        <div className="flex items-center justify-between border border-sage h-12 pt-5 pb-4 pl-3 pr-20 text-sm text-darkgreen">
          <div className="flex items-center">
            <Checkbox
              label="Select All"
              checked={isCheckedAll}
              onChange={(v) =>
                setIsChecked((value) => {
                  const result = {};
                  for (let i in value) {
                    result[i] = v;
                  }
                  return result;
                })
              }
            />
          </div>
          <div>
            <p className="font-medium text-center">File Type</p>
          </div>
        </div>
        <div>
          {accordionItems.map((accordion, index) => (
            <Accordion title={accordion.title} key={index}>
              <ul>
                {accordion.items.map((item, itemIndex) => (
                  <li
                    key={itemIndex}
                    className="py-4 pl-3 pr-22.5 bg-white border-t border-sage"
                  >
                    <div className="flex items-center justify-between text-sm text-darkgreen font-normal">
                      <Checkbox
                        checked={isChecked[item.id]}
                        label={item.title}
                        onChange={(value) =>
                          setIsChecked((v) => ({ ...v, [item.id]: value }))
                        }
                      />
                      <p>{item.type}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </Accordion>
          ))}
        </div>
      </div>
      <div className="fixed right-11 bottom-8">
        <button
          className="flex justify-end gap-4 bg-darkgreen rounded-lg py-3 pr-4 pl-7"
          id="share-package-button"
        >
          <span className="text-white">Share Package</span>
          <ReactSVG src="/icons/submit.svg" />
        </button>
      </div>
    </div>
  );
};

export default SharePackageForm;

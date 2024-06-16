import { useEffect, useState } from "react";
import { ReactSVG } from "react-svg";
import Describe from "./Describe";
import Location from "./Location";
import Last from "./Last";
import ColoredSVG from "../ColoredSVG";
import purchase_states from "states-us";
import scus from "state-counties-us";
import { createApolloClient } from "../../../apollo/client";
import { ANSWER_QUESTIONNAIRE } from "../../../apollo/mutations/answerQuestionnaire";

const OnBoarding = ({ currentUser }) => {
  const states = [
    ...purchase_states.map(({ abbreviation: value, name: label }) => ({
      value,
      label,
    })),
  ];

  const { createClient } = createApolloClient();

  const [stepIndex, setStepIndex] = useState(0);
  const [{ intention, state, county, source }, setInfo] = useState({
    intention: "",
    state: states[0].value,
    county: scus.getCountiesByState(states[0].value)[0],
    source: "",
  });
  const [checkedItems, setCheckedItems] = useState({});
  const [descriptions, setDescriptions] = useState([]);
  const [intentions, setIntentions] = useState([]);
  const [sources, setSources] = useState([]);
  const [counties, setCounties] = useState(
    scus.getCountiesByState(states[0].value)
  );

  const handleChange = (field, value) => {
    setInfo((prevInfo) => ({
      ...prevInfo,
      [field]: value,
    }));
  };

  const handleCheck = (event) => {
    setCheckedItems({
      ...checkedItems,
      [event.target.name]: event.target.checked,
    });
  };

  useEffect(() => {
    const fetchIntentions = async () => {
      try {
        const response = await fetch("/api/intentions.json", { method: "GET" }); // Replace with your actual API route path
        if (!response.ok) {
          throw new Error("Failed to fetch intentions");
        }
        const data = await response.json();
        setIntentions(data.intentions);
      } catch (error) {
        console.error("Error fetching intentions:", error);
      }
    };

    const fetchDescriptions = async () => {
      try {
        const response = await fetch("/api/descriptions.json"); // Replace with your actual API route path
        if (!response.ok) {
          throw new Error("Failed to fetch descriptions");
        }
        const data = await response.json();
        setDescriptions(data.descriptions);
      } catch (error) {
        console.error("Error fetching descriptions:", error);
      }
    };

    const fetchSources = async () => {
      try {
        const response = await fetch("/api/sources.json"); // Replace with your actual API route path
        if (!response.ok) {
          throw new Error("Failed to fetch sources");
        }
        const data = await response.json();
        setSources(data.sources);
      } catch (error) {
        console.error("Error fetching sources:", error);
      }
    };

    fetchIntentions();
    fetchDescriptions();
    fetchSources();
  }, []);

  useEffect(() => {
    setCounties(scus.getCountiesByState(state));
  }, [state]);

  const answerQuestionnaire = async (
    county: string,
    state: string,
    source: string,
    intention: string,
    description: string[]
  ) => {
    const client = await createClient();
    try {
      const { data } = await client.mutate({
        mutation: ANSWER_QUESTIONNAIRE,
        variables: {
          object: {
            purchase_county: county,
            purchase_state: state,
            referral_source: source,
            visit_intention: intention,
            user_description: description[0],
          },
        },
      });
      window.location.href = "/progress-tracker";
    } catch (error) {
      console.error("Error answering questionnaire:", error);
    }
  };

  const handleSubmit = (county, state, source, intention, description) => {
    answerQuestionnaire(county, state, source, intention, description);
  };
  return (
    <>
      <div className="min-h-[60%]">
        {stepIndex == 0 && (
          <Describe
            intention={intention}
            checkedItems={checkedItems}
            handleChange={handleChange}
            handleCheck={handleCheck}
            intentions={intentions}
            descriptions={descriptions}
          />
        )}
        {stepIndex == 1 && (
          <Location
            state={state}
            county={county}
            states={states}
            counties={counties}
            handleChange={handleChange}
          />
        )}
        {stepIndex == 2 && (
          <Last source={source} sources={sources} handleChange={handleChange} />
        )}
      </div>
      <div className="mt-5 flex justify-between">
        {stepIndex > 0 ? (
          <button
            className="flex justify-center rounded-lg p-4 border-2 border-darkgreen"
            onClick={() => setStepIndex(stepIndex - 1)}
          >
            <div className="rotate-180">
              <ColoredSVG src="/icons/submit.svg" color="#1C4835" mode="fill" />
            </div>
            <span className="px-4">Back</span>
          </button>
        ) : (
          <div></div>
        )}
        {stepIndex == 2 ? (
          <button
            className="flex justify-center bg-darkgreen rounded-lg p-4"
            onClick={() =>
              handleSubmit(county, state, source, intention, [
                Object.keys(checkedItems).filter(
                  (key) => checkedItems[key] === true
                ),
              ])
            }
          >
            <span className="text-white px-4">Submit</span>
            <ReactSVG src="/icons/submit.svg" />
          </button>
        ) : (
          <button
            className="flex justify-center bg-darkgreen rounded-lg p-4"
            onClick={() => setStepIndex(stepIndex + 1)}
          >
            <span className="text-white px-4">Continue</span>
            <ReactSVG src="/icons/submit.svg" />
          </button>
        )}
      </div>
    </>
  );
};

export default OnBoarding;

import { Radio, RadioGroup } from "../radio";

const Last = ({ source, sources, handleChange }) => {
  return (
    <>
      <div className="flex flex-col gap-5 mt-14">
        <div className="flex flex-col gap-7">
          <p className="text-3xl font-normal">
            One last question, how did you hear about us
          </p>
          <div className="flex gap-3 flex-wrap">
            <RadioGroup
              name="sources"
              value={source}
              onChange={(event) => handleChange("source", event.target.value)}
            >
              {sources.map((source, index) => (
                <Radio key={index} value={source}>
                  {source}
                </Radio>
              ))}
            </RadioGroup>
          </div>
        </div>
      </div>
    </>
  );
};

export default Last;

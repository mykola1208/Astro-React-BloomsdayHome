import { Radio, RadioGroup } from "../radio";
import Checkbox from "../check/Checkbox";

const Describe = ({
  intention,
  checkedItems,
  handleChange,
  handleCheck,
  intentions,
  descriptions,
}) => {
  return (
    <>
      <div className="flex flex-col gap-5 mt-14">
        <p className="text-3xl font-normal">What brings you here today?</p>
        <div className="flex gap-3 flex-wrap">
          <RadioGroup
            name="intentions"
            value={intention}
            onChange={(event) => handleChange("intention", event.target.value)}
          >
            {intentions.map((intention, index) => (
              <Radio key={index} value={intention}>
                {intention}
              </Radio>
            ))}
          </RadioGroup>
        </div>
      </div>
      <div className="flex flex-col gap-5 mt-14">
        <p className="text-3xl font-normal">What best describes you?</p>
        <p className="text-sm font-normal">Choose all that apply.</p>
        <div className="flex gap-3 flex-wrap">
          {descriptions.map((description, index) => (
            <Checkbox
              key={`desc-${index}`}
              name={description}
              checked={checkedItems[description]}
              onChange={handleCheck}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default Describe;

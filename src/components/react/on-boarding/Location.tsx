const Location = ({ state, county, states, counties, handleChange }) => {
  return (
    <>
      <div className="flex flex-col gap-5 mt-14">
        <div className="flex flex-col gap-1">
          <p className="text-3xl font-normal">Where are you buying?</p>
          <p className="text-sm font-normal">
            We just need a few more details to get you started
          </p>
        </div>
        <div className="flex flex-col gap-1">
          <label
            htmlFor="state"
            className="mb-2 text-base font-medium text-darkgreen"
          >
            What state are you purchasing in?
          </label>
          <select
            id="state"
            className="border border-sage w-full px-4 py-3 text-base text-darkgreen rounded-lg bg-cream-light"
            onChange={(event) => handleChange("state", event.target.value)}
            value={state}
          >
            {states.map((state, index) => (
              <option key={`state-${index}`} value={state.value}>
                {state.label}
              </option>
            ))}
          </select>
        </div>
        <div className="flex flex-col gap-1">
          <label
            htmlFor="county"
            className="mb-2 text-base font-medium text-darkgreen"
          >
            What county are you purchasing in?
          </label>
          <select
            id="county"
            className="border border-sage w-full px-4 py-3 text-base text-darkgreen rounded-lg bg-cream-light"
            onChange={(event) => handleChange("county", event.target.value)}
            value={county}
          >
            {counties.map((county, index) => (
              <option key={`county-${index}`} value={county}>
                {county}
              </option>
            ))}
          </select>
        </div>
      </div>
    </>
  );
};

export default Location;

import { Global, css } from "@emotion/react";
import { useEffect, useState } from "react";
import BarChart from "./components/BarChart";
import CountryList from "./components/CountryList";
import GlobalInfo from "./components/GlobalInfo";
import { Country, ResponseData } from "./types";

const App: React.FC = () => {
  const [data, setData] = useState<ResponseData | undefined>(undefined);
  const [activeCountries, setActiveCountires] = useState<Country[]>([]);

  const fetchData = async () => {
    const result = await fetch("https://api.covid19api.com/summary");
    const data: ResponseData = await result.json();

    setData(data);
    console.log(data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const onItemClick = (country: Country) => {
    const countryIndex = activeCountries.findIndex(
      (activeCountry) => activeCountry.ID === country.ID
    );

    if (countryIndex > -1) {
      const newActiveCountires = [...activeCountries];
      newActiveCountires.splice(countryIndex, 1);

      setActiveCountires(newActiveCountires);
    } else {
      setActiveCountires([...activeCountries, country]);
    }
  };

  return (
    <div>
      <Global
        styles={css`
          body {
            background-color: #f1f1f1;
            color: #7d7d7d;
          }
        `}
      />
      <hr />

      {data ? (
        <>
          <GlobalInfo
            newConfirmed={data?.Global.NewConfirmed}
            newDeaths={data?.Global.NewDeaths}
            newRecovered={data?.Global.NewRecovered}
          />
          
          {activeCountries.length ? (
            <BarChart countries={activeCountries} />
          ) : null}

          <CountryList countries={data.Countries} onItemClick={onItemClick} />
        </>
      ) : (
        "Loading..."
      )}
    </div>
  );
};

export default App;

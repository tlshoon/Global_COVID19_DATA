import { Country } from "../types";
import styled from "@emotion/styled";
import CountryItem from "./CountryItem";

interface Props {
  countries: Country[];
  onItemClick: (country: Country) => void;
}

const ListWrapper = styled.ul`
  padding: 0;
  display: flex;
  flex-wrap: wrap;
`;


const CountryList: React.FC<Props> = ({ countries, onItemClick }) => {
  return (
    <ListWrapper>
      {countries.map((country) => (
        <CountryItem country={country} onItemClick={onItemClick}/>
      ))}
    </ListWrapper>
  );
};

export default CountryList;

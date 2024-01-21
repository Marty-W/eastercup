import "/node_modules/flag-icons/css/flag-icons.min.css";

interface Props {
  countries: string[];
}

export default function CountryFlags({ countries }: Props) {
  return (
    <div className="space-x-1 space-y-1">
      {countries.map((countryCode) => {
        return (
          <span
            key={countryCode}
            className={`fi fi-${countryCode.toLowerCase()} text-xl md:text-2xl lg:text-4xl`}
          ></span>
        );
      })}
    </div>
  );
}

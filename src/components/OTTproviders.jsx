import StreamSection from "./StreamSection";

const OTTproviders = ({ flatrate, rent, buy, link }) => {
  return (
    <div className="w-full">
      <div className="flex flex-col gap-3">
        {flatrate?.length > 0 && (
          <StreamSection data={flatrate} title="Available to Stream" link={link} />
        )}

        {rent?.length > 0 && (
          <StreamSection data={rent} title="Available to Rent" link={link}/>
        )}

        {buy?.length > 0 && (
          <StreamSection data={buy} title="Available to Buy" link={link}/>
        )}
      </div>
    </div>
  );
};

export default OTTproviders;

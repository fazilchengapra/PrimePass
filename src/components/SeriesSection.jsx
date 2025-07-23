import { Box, Button, Tabs, Text } from "@radix-ui/themes";
import React, { useEffect, useState } from "react";
import { IoIosArrowForward } from "react-icons/io";
import { useSelector } from "react-redux";
import Episodes from "./Episodes";

const tabs = ["Seasons", "Similar Shows"];

const SeriesSection = () => {
  const { selectedMovie: showDetails } = useSelector((state) => state?.movie);
  const [selectedTab, setSelectedTab] = useState("Seasons");
  const [selectedSeason, setSelectedSeason] = useState(null);

  // Set the default selected season when showDetails is available
  useEffect(() => {
    if (showDetails?.seasons?.length > 0) {
      setSelectedSeason(showDetails.seasons[0]);
    }
  }, [showDetails]);

  if (!showDetails) {
    // Handle loading or empty state
    return <Text>Loading...</Text>;
  }

  return (
    <section className="flex flex-col gap-3">
      {/* tab buttons */}
      <div className="flex flex-row gap-4">
        {tabs.map((tab) => (
          <Button
            key={tab}
            color={selectedTab === tab ? "blue" : "gray"}
            onClick={() => setSelectedTab(tab)}
            variant="outline"
            className="px-4 py-4 rounded-full"
          >
            {tab}
          </Button>
        ))}
      </div>

      {selectedTab === "Seasons" && (
        <Tabs.Root
          value={selectedSeason?.id.toString()}
          onValueChange={(value) => {
            const seasonToSelect = showDetails.seasons.find(
              (s) => s.id.toString() === value
            );
            if (seasonToSelect) {
              setSelectedSeason(seasonToSelect);
            }
          }}
        >
          <Tabs.List className="w-full overflow-x-auto">
            {showDetails.seasons.map((season) => (
              <Tabs.Trigger key={season.id} value={season.id.toString()}>
                S
                {season.season_number > 9
                  ? season.season_number
                  : `0${season.season_number}`}
              </Tabs.Trigger>
            ))}
          </Tabs.List>

          <Box pt="3">
            {/* The content should be dynamic based on the selected season */}
            {selectedSeason && (
              <Tabs.Content value={selectedSeason.id.toString()}>
                <div className="w-full flex flex-col gap-5">
                  <div className="flex flex-col gap-2 text-center">
                    <Text as="h3" size="4" weight="bold">
                      {selectedSeason.name}
                    </Text>
                    {selectedSeason.episode_count && (
                      <Text as="p" size="2" color="gray">
                        Total Episode: {selectedSeason.episode_count}
                      </Text>
                    )}
                  </div>

                  {/* Dynamically map through episodes of the selected season */}
                  <Episodes SeasonNumber={selectedSeason.season_number} showId={showDetails?.id}/>
                </div>
              </Tabs.Content>
            )}
          </Box>
        </Tabs.Root>
      )}

      {selectedTab === "Similar Shows" && (
        <div className="text-center p-8">
          <Text size="5" color="gray">
            Similar shows content goes here.
          </Text>
        </div>
      )}
    </section>
  );
};

export default SeriesSection;

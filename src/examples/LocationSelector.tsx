import { useSUP } from "data";
import { useMediaQuery } from "hooks";
import { Flex, FlexItem, Section } from "layout";
import { Button, Image, Text, TextHeading, TextSubheading } from "primitives";
import "./LocationSelector.css";

export function LocationSelector() {
  const { isMobile, isTablet } = useMediaQuery();
  const { locations, selectedLocation, setSelectedLocation } = useSUP();
  const sectionPadding = isMobile ? "600" : "1600";
  const flexGap = isMobile ? "600" : "1200";

  return (
    <Section padding={sectionPadding} variant="stroke">
      <Flex container wrap gap={flexGap} direction="column">
        <FlexItem>
          <TextHeading>Choose Your Location</TextHeading>
          <Text>
            Select a location to see available SUP boards at that location.
          </Text>
        </FlexItem>
        <Flex type="third" wrap gap={flexGap}>
          {locations.map((location) => (
            <FlexItem key={location.id} size={isTablet ? "half" : "minor"}>
              <div
                className={`location-card ${
                  selectedLocation?.id === location.id ? "selected" : ""
                }`}
              >
                <Image
                  src={location.imageUrl}
                  alt={location.name}
                  aspectRatio="16-9"
                />
                <Flex direction="column" gap="400" padding="600">
                  <TextHeading>{location.name}</TextHeading>
                  <TextSubheading>
                    {location.city}, {location.region}
                  </TextSubheading>
                  <Text>{location.description}</Text>
                  <Text>
                    <strong>Hours:</strong> {location.operatingHours.open} -{" "}
                    {location.operatingHours.close}
                  </Text>
                  <Button
                    variant={
                      selectedLocation?.id === location.id
                        ? "primary"
                        : "subtle"
                    }
                    onPress={() =>
                      setSelectedLocation(
                        selectedLocation?.id === location.id ? null : location,
                      )
                    }
                  >
                    {selectedLocation?.id === location.id
                      ? "Selected"
                      : "Select Location"}
                  </Button>
                </Flex>
              </div>
            </FlexItem>
          ))}
        </Flex>
      </Flex>
    </Section>
  );
}


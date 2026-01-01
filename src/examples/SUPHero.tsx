import { useMediaQuery } from "hooks";
import { Flex, Section } from "layout";
import { Button, Form, Input, TextContentTitle } from "primitives";
import { useSUP } from "data";

export function SUPHero() {
  const { isMobile } = useMediaQuery();
  const { locations, selectedLocation, setSelectedLocation } = useSUP();
  const sectionPadding = isMobile ? "600" : "1600";
  const flexGap = isMobile ? "600" : "1200";

  return (
    <Section padding={sectionPadding} variant="stroke">
      <Flex
        container
        wrap
        gap={flexGap}
        direction="column"
        alignPrimary="center"
        alignSecondary="center"
        type="third"
      >
        <TextContentTitle
          align="center"
          title="SUP Rental Switzerland"
          subtitle={
            <>
              Explore the stunning lakes of Switzerland on a stand-up
              paddleboard. Book your perfect board today.
            </>
          }
        />
        <Form singleLine>
          <Input
            aria-label="Search locations"
            placeholder="Search by location..."
          />
          <Button onPress={() => {}} variant="neutral">
            Find Boards
          </Button>
        </Form>
        {locations.length > 0 && (
          <Flex gap="200" wrap alignPrimary="center">
            {locations.map((location) => (
              <Button
                key={location.id}
                variant={
                  selectedLocation?.id === location.id ? "primary" : "subtle"
                }
                size="small"
                onPress={() =>
                  setSelectedLocation(
                    selectedLocation?.id === location.id ? null : location,
                  )
                }
              >
                {location.name}
              </Button>
            ))}
          </Flex>
        )}
      </Flex>
    </Section>
  );
}


import { useSUP } from "data";
import { useMediaQuery } from "hooks";
import { Flex, FlexItem, Section } from "layout";
import {
  Button,
  Fieldset,
  Form,
  Input,
  Label,
  Select,
  SelectItem,
  Text,
  TextHeading,
} from "primitives";
import { useState } from "react";

export function BookingForm() {
  const { isMobile } = useMediaQuery();
  const { boards, locations, selectedLocation, createBooking, isLoading } =
    useSUP();
  const sectionPadding = isMobile ? "600" : "1600";
  const [selectedBoardId, setSelectedBoardId] = useState<string>("");
  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");
  const [duration, setDuration] = useState<"hour" | "day" | "multi-day">(
    "hour",
  );
  const [bookingSuccess, setBookingSuccess] = useState(false);

  const availableBoards = selectedLocation
    ? boards.filter(
        (board) =>
          board.locationId === selectedLocation.id && board.available,
      )
    : boards.filter((board) => board.available);

  const handleSubmit = async () => {
    if (!selectedBoardId || !startDate || !endDate || !selectedLocation) {
      return;
    }

    try {
      await createBooking({
          boardId: selectedBoardId,
          locationId: selectedLocation.id,
          startDate,
          endDate,
          duration,
        });
      setBookingSuccess(true);
      setSelectedBoardId("");
      setStartDate("");
      setEndDate("");
      setTimeout(() => setBookingSuccess(false), 5000);
    } catch (error) {
      console.error("Booking failed:", error);
    }
  };

  return (
    <Section padding={sectionPadding} variant="stroke">
      <Flex container wrap gap="1200" direction="column">
        <FlexItem>
          <TextHeading>Book Your SUP Board</TextHeading>
          <Text>
            Select a board, location, and dates to make your reservation.
          </Text>
        </FlexItem>
        {!selectedLocation ? (
          <Text>Please select a location first to see available boards.</Text>
        ) : (
          <Form>
            <Fieldset>
              <Label htmlFor="location">Location</Label>
              <Input
                id="location"
                value={selectedLocation.name}
                isReadOnly
                aria-label="Selected location"
              />
            </Fieldset>
            <Fieldset>
              <Label htmlFor="board">Select Board</Label>
              <Select
                id="board"
                selectedKey={selectedBoardId}
                onSelectionChange={(key) =>
                  setSelectedBoardId(key as string)
                }
                placeholder="Choose a board..."
              >
                {availableBoards.map((board) => (
                  <SelectItem key={board.id} id={board.id}>
                    {board.name} - {board.currency}
                    {duration === "hour"
                      ? board.pricePerHour
                      : board.pricePerDay}
                    /{duration === "hour" ? "hour" : "day"}
                  </SelectItem>
                ))}
              </Select>
            </Fieldset>
            <Fieldset>
              <Label htmlFor="duration">Rental Duration</Label>
              <Select
                id="duration"
                selectedKey={duration}
                onSelectionChange={(key) =>
                  setDuration(key as "hour" | "day" | "multi-day")
                }
              >
                <SelectItem id="hour">Per Hour</SelectItem>
                <SelectItem id="day">Per Day</SelectItem>
                <SelectItem id="multi-day">Multi-Day</SelectItem>
              </Select>
            </Fieldset>
            <Fieldset>
              <Label htmlFor="start-date">Start Date & Time</Label>
              <input
                id="start-date"
                type="datetime-local"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="input"
                style={{ width: "100%" }}
              />
            </Fieldset>
            <Fieldset>
              <Label htmlFor="end-date">End Date & Time</Label>
              <input
                id="end-date"
                type="datetime-local"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="input"
                style={{ width: "100%" }}
              />
            </Fieldset>
            {bookingSuccess && (
              <Text style={{ color: "var(--color-success-default)" }}>
                Booking confirmed! Check your bookings for details.
              </Text>
            )}
            <Button
              onPress={handleSubmit}
              variant="primary"
              isDisabled={
                !selectedBoardId || !startDate || !endDate || isLoading
              }
            >
              {isLoading ? "Processing..." : "Book Now"}
            </Button>
          </Form>
        )}
      </Flex>
    </Section>
  );
}


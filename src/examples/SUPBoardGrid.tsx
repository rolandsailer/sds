import {
  ProductInfoCard,
  ProductInfoCardSkeleton,
  productToProductInfoCardProps,
} from "compositions";
import { useSUP, type SUPBoard } from "data";
import { useMediaQuery } from "hooks";
import { IconChevronDown, IconChevronUp } from "icons";
import { Flex, FlexItem, Section } from "layout";
import { Search, TagButton } from "primitives";
import { useEffect, useState } from "react";

export function SUPBoardGrid() {
  const { isMobile, isTablet } = useMediaQuery();
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [sortPrice, setSortPrice] = useState<-1 | 0 | 1>(0);
  const [filterCategory, setFilterCategory] = useState<string | null>(null);
  const [duration, setDuration] = useState<"hour" | "day">("hour");
  const flexGap = isMobile ? "600" : "1200";
  const sectionPadding = isMobile ? "600" : "1600";
  const { filteredBoards, isLoading, search, setFilters } = useSUP();
  const [displayBoards, setDisplayBoards] = useState<SUPBoard[]>([]);

  useEffect(() => {
    if (searchTerm) {
      search(searchTerm);
    }
    const initialBoards = filteredBoards.filter(
      (board) => !filterCategory || board.category === filterCategory,
    );
    setDisplayBoards(initialBoards);
  }, [searchTerm, filterCategory, filteredBoards, search]);

  const sortedBoards = displayBoards.sort((a, b) => {
    if (sortPrice !== 0) {
      const priceA = duration === "hour" ? a.pricePerHour : a.pricePerDay;
      const priceB = duration === "hour" ? b.pricePerHour : b.pricePerDay;
      return priceA > priceB ? sortPrice : -sortPrice;
    }
    return 0;
  });

  const categories = [
    "all-around",
    "touring",
    "racing",
    "yoga",
    "inflatable",
  ] as const;

  return (
    <Section padding={sectionPadding} variant="stroke">
      <Flex container wrap gap={flexGap} alignPrimary="stretch">
        <Flex direction="column" gap="1200" alignSecondary="stretch">
          <Flex
            alignPrimary="space-between"
            alignSecondary="center"
            type="third"
            wrap
            gap="400"
          >
            <FlexItem size="minor">
              <Flex alignPrimary="stretch">
                <Search
                  placeholder="Search boards..."
                  value={searchTerm}
                  onInput={(e) => setSearchTerm(e.currentTarget.value)}
                />
              </Flex>
            </FlexItem>
            <FlexItem>
              <Flex gap="200" wrap>
                <TagButton
                  id="duration-hour"
                  variant={duration === "hour" ? "primary" : "secondary"}
                  onPress={() => {
                    setDuration("hour");
                    setFilters({ duration: "hour" });
                  }}
                >
                  Per Hour
                </TagButton>
                <TagButton
                  id="duration-day"
                  variant={duration === "day" ? "primary" : "secondary"}
                  onPress={() => {
                    setDuration("day");
                    setFilters({ duration: "day" });
                  }}
                >
                  Per Day
                </TagButton>
                <TagButton
                  id="sort-price"
                  variant={sortPrice === 0 ? "secondary" : "primary"}
                  onPress={() => {
                    setSortPrice((prev) => {
                      if (prev === 0) return -1;
                      if (prev === -1) return 1;
                      return 0;
                    });
                  }}
                >
                  Price{" "}
                  {sortPrice === 0 || sortPrice === -1 ? (
                    <IconChevronDown />
                  ) : (
                    <IconChevronUp />
                  )}
                </TagButton>
              </Flex>
            </FlexItem>
          </Flex>
          <Flex gap="200" wrap>
            <TagButton
              id="filter-all"
              variant={filterCategory === null ? "primary" : "secondary"}
              onPress={() => setFilterCategory(null)}
            >
              All Categories
            </TagButton>
            {categories.map((category) => (
              <TagButton
                key={category}
                id={`filter-${category}`}
                variant={
                  filterCategory === category ? "primary" : "secondary"
                }
                onPress={() =>
                  setFilterCategory(
                    filterCategory === category ? null : category,
                  )
                }
              >
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </TagButton>
            ))}
          </Flex>
          <Flex type="third" wrap gap="600">
            {isLoading ? (
              <>
                <ProductInfoCardSkeleton />
                <ProductInfoCardSkeleton />
                <ProductInfoCardSkeleton />
                <ProductInfoCardSkeleton />
              </>
            ) : sortedBoards.length === 0 ? (
              <FlexItem size="major">
                <Flex alignPrimary="center" alignSecondary="center">
                  <p>No boards found. Try adjusting your filters.</p>
                </Flex>
              </FlexItem>
            ) : (
              sortedBoards.map((board) => {
                const price =
                  duration === "hour" ? board.pricePerHour : board.pricePerDay;
                const product = {
                  id: board.id,
                  name: board.name,
                  description: board.description,
                  price: price,
                  currency: board.currency,
                  rating: board.rating,
                  imageUrl: board.imageUrl,
                  category: board.category,
                  inStock: board.available,
                  tags: board.features,
                };
                return (
                  <FlexItem key={board.id} size={isTablet ? "half" : "minor"}>
                    <ProductInfoCard
                      {...productToProductInfoCardProps(product)}
                    />
                  </FlexItem>
                );
              })
            )}
          </Flex>
        </Flex>
      </Flex>
    </Section>
  );
}


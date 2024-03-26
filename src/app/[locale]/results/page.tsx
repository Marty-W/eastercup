"use client";
import { CategoryResults } from "@/components/categoryResults";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { TEAM_CATEGORIRES } from "@/lib/conts";
import { type TeamCategory } from "@/lib/types";
import { api } from "@/trpc/react";
import React, { useState, useMemo } from "react";
import { getISODay } from "date-fns";
import { Separator } from "@/components/ui/separator";
import { MixedResults } from "@/components/mixedResults";

const RESULT_CATEGORIES = ["all", ...TEAM_CATEGORIRES];

export default function Results() {
  const matches = api.match.getAllMatches.useQuery();

  const [selectedCategory, setSelectedCategory] = useState<
    TeamCategory | "all"
  >("all");

  //ISO days of the week 3 = Wednesday, 7 = Sunday
  const [selectedDayIdx, setSelectedDayIdx] = useState<3 | 4 | 5 | 6 | 7>(
    () => {
      const currentDay = getISODay(new Date());

      if (currentDay < 3) {
        return 3;
      } else {
        return currentDay as 3 | 4 | 5 | 6 | 7;
      }
    },
  );

  const filteredMatches = useMemo(() => {
    if (!matches.data) return [];

    return matches.data.filter((match) => {
      const isCategoryMatch =
        selectedCategory === "all" || match.category === selectedCategory;
      const isDayMatch = selectedDayIdx === match.dayIdx;

      return isCategoryMatch && isDayMatch;
    });
  }, [matches.data, selectedCategory, selectedDayIdx]);

  const onDayChange = (dayIdx: 3 | 4 | 5 | 6 | 7) => {
    setSelectedDayIdx(dayIdx);
  };

  return (
    <div className="min-h-[600px] py-4 font-display">
      <Tabs
        onValueChange={(value) => setSelectedCategory(value as TeamCategory)}
        value={selectedCategory}
      >
        <div className="rounded-md bg-brand-blue shadow-brand-blue md:flex md:justify-center">
          <TabsList className="mx-auto grid h-fit max-w-md grid-cols-4 grid-rows-[40px_10px_40px] bg-brand-blue">
            {RESULT_CATEGORIES.map((category, index) => {
              if (index === 3) {
                return (
                  <React.Fragment key={category}>
                    <TabsTrigger value={category}>{category}</TabsTrigger>
                    <Separator className="col-span-6" />
                  </React.Fragment>
                );
              }
              return (
                <TabsTrigger value={category} key={category}>
                  {category}
                </TabsTrigger>
              );
            })}
          </TabsList>
        </div>
        {RESULT_CATEGORIES.map((category) => {
          if (category === "all") {
            return (
              <TabsContent value={category} key={category}>
                <MixedResults
                  matchesLoading={matches.isLoading}
                  matches={filteredMatches}
                  category={category}
                  selectedDayIdx={selectedDayIdx}
                  onDayChange={onDayChange}
                />
              </TabsContent>
            );
          }
          return (
            <TabsContent value={category} key={category}>
              <CategoryResults
                matchesLoading={matches.isLoading}
                matches={filteredMatches}
                category={category}
                selectedDayIdx={selectedDayIdx}
                onDayChange={onDayChange}
              />
            </TabsContent>
          );
        })}
      </Tabs>
    </div>
  );
}

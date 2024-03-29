"use client";
import { TEAM_CATEGORIRES } from "@/lib/conts";
import { type TeamCategory } from "@/lib/types";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import React from "react";
import { useState } from "react";
import { GroupStandingsWrapper } from "@/components/groupStandingsWrapper";

export default function Standings() {
  const [selectedCategory, setSelectedCategory] =
    useState<TeamCategory>("U11 MIX");

  return (
    <div className="min-h-[600px] py-4 font-display">
      <Tabs
        onValueChange={(value) => setSelectedCategory(value as TeamCategory)}
        value={selectedCategory}
      >
        <div className="rounded-md bg-brand-blue shadow-brand-blue md:flex md:justify-center">
          <TabsList className="border-lg mx-auto flex h-fit w-full max-w-md flex-col space-y-1 rounded-t-md bg-brand-blue text-white">
            <div className="grid grid-cols-4 grid-rows-[40px]">
              {TEAM_CATEGORIRES.slice(0, 4).map((category) => {
                return (
                  <TabsTrigger
                    value={category}
                    key={category}
                    className="px-2 py-1"
                  >
                    {category}
                  </TabsTrigger>
                );
              })}
            </div>
            <Separator />
            <div className="grid grid-cols-3 grid-rows-[40px]">
              {TEAM_CATEGORIRES.slice(4, TEAM_CATEGORIRES.length).map(
                (category) => {
                  return (
                    <TabsTrigger value={category} key={category}>
                      {category}
                    </TabsTrigger>
                  );
                },
              )}
            </div>
          </TabsList>
        </div>
        {TEAM_CATEGORIRES.map((category) => {
          return (
            <TabsContent value={category} key={category}>
              <GroupStandingsWrapper selectedCategory={category} />
            </TabsContent>
          );
        })}
      </Tabs>
    </div>
  );
}

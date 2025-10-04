"use client";

import React from "react";
import {  CardContent } from "@/components/ui/card";
import { StatCardData } from "@/types/customer";
import Image, { StaticImageData } from "next/image";
import { Images } from "@/public/assets";

export const StatCard: React.FC<StatCardData> = ({
  icon: Icon,
  label,
  value,
  trend,
  avatars,
}) => (

    <CardContent className="p-6">
      <div className="flex items-start gap-4">
      
        <div className="p-4 ">
          <Image src={Icon} alt="icon" width={84} height={84} />
        </div>

  
        <div className="flex flex-col items-start">
          <p className="text-sm text-gray-500 mb-1">{label}</p>
          <h3 className="text-3xl font-bold">{value}</h3>

          {trend && (
            <p
              className={`text-sm mt-1 flex items-center gap-1 ${
                trend.isPositive ? "text-[#00AC4F]" : "text-[#D0004B]"
              }`}
            >
              <Image
                src={trend.isPositive ? Images.arrow_up : Images.arrow_down}
                alt={trend.isPositive ? "Up" : "Down"}
                width={16}
                height={16}
              />
              {trend.value} this month
            </p>
          )}


          {avatars && avatars.length > 0 && (
            <div className="flex mt-3 -space-x-3">
              {avatars
                .slice(0, 5)
                .map((img: string | StaticImageData, i: number) => (
                  <div
                    key={i}
                    className="relative w-8 h-8 rounded-full border-2 border-white overflow-hidden shadow-sm"
                  >
                    <Image
                      src={img}
                      alt={`avatar-${i}`}
                      fill
                      className="object-cover"
                      sizes="32px"
                    />
                  </div>
                ))}
            </div>
          )}
        </div>
      </div>
    </CardContent>
  
);

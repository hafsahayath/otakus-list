"use client";

import { updateWatchStatus } from "@/lib/server/actions";
import { WatchStatus } from "@prisma/client";
import { useState, useTransition } from "react";

const ClientWatchStatusEnum = {
  IN_PROGRESS: "In Progress",
  NOT_STARTED: "Not Started",
  COMPLETED: "Completed",
} as const;

type ClientWatchStatusValues =
  (typeof ClientWatchStatusEnum)[keyof typeof ClientWatchStatusEnum];

const Select = ({ status, id }: { status: WatchStatus; id: string }) => {
  
  const getWatchStatusValue = (status: WatchStatus) => {
    return ClientWatchStatusEnum[status];
  };
  
  const [watchStatus, setWatchStatus] = useState<ClientWatchStatusValues>(
    getWatchStatusValue(status)
  );
  let [_, startTransition] = useTransition();

  const sendAppropriateStatus = (status: ClientWatchStatusValues) => {
    const entry = Object.entries(ClientWatchStatusEnum).find(
      ([_, value]) => value === status
    );
    return entry![0] as keyof typeof ClientWatchStatusEnum;
  };

  return (
    <select
      value={watchStatus}
      onChange={(e) => {
        const statusValue = e.target.value as ClientWatchStatusValues;
        setWatchStatus(statusValue);
        startTransition(() =>
          updateWatchStatus(id, sendAppropriateStatus(statusValue))
        );
      }}
      className="select select-sm w-full max-w-sm"
    >
      <option>Not Started</option>
      <option>In Progress</option>
      <option>Completed</option>
    </select>
  );
};

export default Select;

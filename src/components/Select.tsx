"use client";

import { updateWatchStatus } from "@/lib/server/actions";
import {
  ClientWatchStatusValues,
  getWatchStatusValue,
  sendAppropriateStatus,
} from "@/lib/utils";
import { WatchStatus } from "@prisma/client";
import { useState, useTransition } from "react";

const Select = ({ status, id }: { status: WatchStatus; id: string }) => {
  const [watchStatus, setWatchStatus] = useState<ClientWatchStatusValues>(
    getWatchStatusValue(status)
  );
  let [_, startTransition] = useTransition();

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

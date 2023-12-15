"use client";

import { updateWatchStatus } from "@/lib/server/actions";
import {
  ClientWatchStatusValues,
  getWatchStatusValue,
  sendAppropriateStatus,
} from "@/lib/utils";
import { WatchStatus } from "@prisma/client";
import { useRef, useState, useTransition } from "react";

const Select = ({ status, id }: { status: WatchStatus; id: string }) => {
  const selectRef = useRef<HTMLSelectElement>(null);

  const [watchStatus, setWatchStatus] = useState<ClientWatchStatusValues>(
    getWatchStatusValue(status)
  );
  let [_, startTransition] = useTransition();

  return (
    <select
      ref={selectRef}
      value={watchStatus}
      onChange={(e) => {
        const statusValue = e.target.value as ClientWatchStatusValues;
        setWatchStatus(statusValue);
        startTransition(() =>
          updateWatchStatus(id, sendAppropriateStatus(statusValue))
        );
        selectRef.current && selectRef.current.blur();
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

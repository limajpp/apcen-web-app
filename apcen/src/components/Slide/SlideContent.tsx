import { useState } from "react";

import useAuth from "@/hooks/useAuth";

import SlideActiveSession from "./SlideActiveSession";
import SlideSessionResults from "./SlideSessionResults";
import OpenedConflict from "./Conflitct/OpenedConflict";
import type { ConflictCardProps } from "./Conflitct/ConflictCard";

export default function SlideContent() {
  const { user } = useAuth();
  const [isFinished] = useState<boolean>(false);
  const [hasConflict] = useState<boolean>(false);

  const [openedConflict, setOpenedConflict] =
    useState<ConflictCardProps | null>(null);

  if (isFinished) {
    if (openedConflict) {
      return (
        <OpenedConflict
          userName={openedConflict.userName}
          answers={openedConflict.answers}
          onClose={() => setOpenedConflict(null)}
        />
      );
    }

    return (
      <SlideSessionResults
        hasConflict={hasConflict}
        onOpenConflict={(conflictData) => setOpenedConflict(conflictData)}
      />
    );
  }

  return <SlideActiveSession user={user} />;
}

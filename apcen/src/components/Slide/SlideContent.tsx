import { useState } from "react";

import useAuth from "@/hooks/useAuth";

import SlideActiveSession from "./SlideActiveSession";
import SlideSessionResults from "./SlideSessionResults";

export default function SlideContent() {
  const { user } = useAuth();
  const [isFinished] = useState<boolean>(true);
  const [hasConflict] = useState<boolean>(true);

  if (isFinished) {
    return <SlideSessionResults hasConflict={hasConflict} />;
  }

  return <SlideActiveSession user={user} />;
}

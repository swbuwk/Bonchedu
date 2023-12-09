import { FC } from "react";
import { ProgressBarWrapper, ProgressTooltip, ProgressedZone } from "./styles";

interface ProgressBarProps {
  progress: number;
  full: number;
}

export const ProgressBar: FC<ProgressBarProps> = ({ progress, full }) => {
  return (
    <ProgressBarWrapper>
      {full ? (
        <ProgressTooltip>
          {progress} / {full}
        </ProgressTooltip>
      ) : (
        <></>
      )}
      <ProgressedZone width={full ? progress / full : 0} />
    </ProgressBarWrapper>
  );
};

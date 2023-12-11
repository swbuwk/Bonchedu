import { FC } from "react";
import { ProgressBarLine, ProgressBarWrapper, ProgressTooltip, ProgressedZone } from "./styles";

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
      <ProgressBarLine>
        <ProgressedZone width={full ? progress / full : 0} />
      </ProgressBarLine>
    </ProgressBarWrapper>
  );
};

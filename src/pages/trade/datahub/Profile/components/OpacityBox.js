import DotIcon from "@components/DotIcon";
import React from "react";
import ProgressBar from "../../components/ProgressBar";
import { OpacityBoxHistoryWrapper } from "../styled";


function OpacityBox({ dataId, owner, expiredDate, activity,dotStatus }) {
  return (
    <OpacityBoxHistoryWrapper>
      <div className="history">
        <div className="history-left">
            <div className="history-left-date">
                <p>Expired date</p>
                <p>{expiredDate}</p>
            </div>
            <div className="history-left-dataId">
                {dataId}
            </div>
            <div className="history-left-status">
                <DotIcon color={dotStatus.color} />
                <span>{dotStatus.name}</span>
            </div>
        </div>
        <div className="history-right">
            <div className="history-right-activity">
                <ProgressBar data={activity} total={3} />
            </div>
            <div className="history-right-owner">
                <p>Owner</p>
                <p>{owner}</p>
            </div>
        </div>
      </div>
    </OpacityBoxHistoryWrapper>
  );
}

export default OpacityBox;

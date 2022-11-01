import { Button, Table } from "antd";
import React, { useEffect } from "react";
import { connect } from "react-redux";
import readXlsxFile from "read-excel-file";
import { VestingToolWrapper } from "./styled";

const VestingTool = ({
  investors,
  init,
  addInvestor,
  release,
  setTimesAndRate,
  start,
  reStart,
}) => {
  useEffect(() => {
    init();
  }, []);

  const handleupload = (e) => {
    readXlsxFile(e.target.files[0]).then((rows) => {
      let investorAddresses = rows.map((item) => item[0]).slice(0, 900);
      let amounts = rows.map((item) => item[1]).slice(0, 900);
      addInvestor({ investorAddresses, amounts });
    });
  };
  const columns = [
    {
      title: "Stt",
      dataIndex: "stt",
      key: "stt",
      render: (_, __, index) => index + 1,
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
    },
  ];
  return (
    <VestingToolWrapper>
      <input type="file" id="file" onChange={handleupload} />
      <Button
        color="primary"
        onClick={() => {
          setTimesAndRate({
            times: 3,
            rates: [20, 50, 30],
            listTime: [20, 20, 20],
          });
        }}
      >
        SetTime
      </Button>
      <Button
        color="primary"
        onClick={() => {
          release();
        }}
      >
        release
      </Button>
      <Button
        color="primary"
        onClick={() => {
          start();
        }}
      >
        start
      </Button>{" "}
      <Button
        color="primary"
        onClick={() => {
          reStart();
        }}
      >
        restart
      </Button>
      <Table
        columns={columns}
        dataSource={investors}
        rowKey={(record) => record.key}
      />
    </VestingToolWrapper>
  );
};

const mapStateToProps = ({ vesting: { timeLockWithSigner, investors } }) => ({
  timeLockWithSigner,
  investors,
});

const mapDispatchToProps = ({
  vesting: { init, addInvestor, release, setTimesAndRate, start, reStart },
}) => ({
  init,
  addInvestor,
  release,
  setTimesAndRate,
  start,
  reStart,
});
export default connect(mapStateToProps, mapDispatchToProps)(VestingTool);

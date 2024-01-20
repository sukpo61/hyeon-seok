import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import PartySituation from "./PartySituation";
import styled from "@emotion/styled";
import PartyRequestList from "./PartyRequestList";
import { useState, SyntheticEvent } from "react";

const TabContainer = styled.div`
  position: sticky;
  top: 0;
  background-color: white;
  z-index: 99;
`;

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box>{children}</Box>}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function ProfileTab() {
  const [value, setValue] = useState(0);

  const handleChange = (_: SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: "100%" }}>
      <TabContainer>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="basic tabs example"
          >
            <Tab label="파티현황" {...a11yProps(0)} />
            <Tab label="초대요청" {...a11yProps(1)} />
          </Tabs>
        </Box>
      </TabContainer>
      <CustomTabPanel value={value} index={0}>
        <PartySituation />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        <PartyRequestList />
      </CustomTabPanel>
    </Box>
  );
}

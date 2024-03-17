import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import PartySituation from "./PartySituation";
import styled from "@emotion/styled";
import PartyRequestList from "./PartyRequestList";
import { useState, SyntheticEvent } from "react";
import { useRouter } from "next/router";
import ProfileTabPanel from "./ProfileTabPanel";

const TabContainer = styled.div`
  position: sticky;
  top: 0;
  background-color: white;
  z-index: 99;
`;

const a11yProps = (index: number) => {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
};

const categorylist = [
  { id: "partysituation", label: "파티현황", component: <PartySituation /> },
  { id: "partyrequest", label: "초대요청", component: <PartyRequestList /> },
];

export default function ProfileTab() {
  const router = useRouter();
  const category = router.query.category as string;

  if (!category) {
    return null;
  }

  const currentTab = categorylist.findIndex((item) => item.id === category);
  const [value, setValue] = useState(currentTab);

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
            {categorylist.map(({ id, label }, index) => (
              <Tab
                key={id}
                label={label}
                {...a11yProps(index)}
                onClick={() => {
                  router.push({
                    query: {
                      ...router.query,
                      category: id,
                    },
                  });
                }}
              />
            ))}
          </Tabs>
        </Box>
      </TabContainer>
      {categorylist.map(({ id, component }, index) => (
        <ProfileTabPanel key={id} value={value} index={index}>
          {component}
        </ProfileTabPanel>
      ))}
    </Box>
  );
}

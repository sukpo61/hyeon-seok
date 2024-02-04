import Box from "@mui/material/Box";
import QuerySuspenseErrorBoundary from "@components/hoc/QuerySuspenseErrorBoundary";
import ProfileError from "./ProfileError";
import ProfileLoading from "./ProfileLoading";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

const ProfileTabPanel = (props: TabPanelProps) => {
  const { children, value, index, ...other } = props;

  return (
    <QuerySuspenseErrorBoundary
      errorFallback={ProfileError}
      suspenseFallback={<ProfileLoading />}
    >
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && <Box>{children}</Box>}
      </div>
    </QuerySuspenseErrorBoundary>
  );
};

export default ProfileTabPanel;

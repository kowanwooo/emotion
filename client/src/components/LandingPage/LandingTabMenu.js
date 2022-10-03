import * as React from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { useTheme } from "@mui/material/styles";

const styles = {
  tab: {
    color: "#a6a6a6",
  },
  TabPanel: {
    color: "#a6a6a6",
  },
};

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function BasicTabs(props) {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ borderBottom: 1 }}>
        <Tabs
          value={value}
          onChange={handleChange}
          style={styles.tab}
          indicatorColor="primary"
          textColor="info"
          variant="fullWidth"
          aria-label="full width tabs example"
        >
          <Tab label="주요정보" {...a11yProps(0)} />
          <Tab label="영상/포토" {...a11yProps(1)} />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0} style={styles.TabPanel}>
        {props.summary}
      </TabPanel>
      <TabPanel value={value} index={1} style={styles.TabPanel}>
        {props.photo}
      </TabPanel>
    </Box>
  );
}

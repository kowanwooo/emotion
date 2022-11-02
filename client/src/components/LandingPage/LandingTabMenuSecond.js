import * as React from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { useTheme } from "@mui/material/styles";

function TabPanelSecond(props) {
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
        <Box sx={{ p: 2 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}



TabPanelSecond.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};



function a11yProps2(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function BasicTabsSecond(props) {

  const styles = {
    tab: {
      color: "#a6a6a6",
    },
    TabPanel: {
      color: "#a6a6a6",
    },
  };

  const [value2, setValue2] = React.useState(0);

  const handleChange2 = (event2, newValue2) => {
    setValue2(newValue2);
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ borderBottom: 1 }}>
        <Tabs
          value={value2}
          onChange={handleChange2}
          style={styles.tab}
          indicatorColor="secondary"
          textColor="info"
          variant="fullWidth"
          aria-label="full width tabs example"
        >
          <Tab label={props.label1} {...a11yProps2(0)} />
          <Tab label={props.label2} {...a11yProps2(1)} />
        </Tabs>
      </Box>
      <TabPanelSecond value={value2} index={0} style={styles.TabPanel}>
        {props.tab1}
      </TabPanelSecond>
      <TabPanelSecond value={value2} index={1} style={styles.TabPanel}>
        {props.tab2}
      </TabPanelSecond>
    </Box>
  );
}
////////////////////////////////1/////////////////////

import "@fontsource/raleway";
import "@fontsource/raleway/700.css";
import "@fontsource/material-icons";
import "./index.css";
import "./component/radio-menu.js";
import "./component/tabs-button.js";
import "./component/search-menu.js";
import "./component/app-bar.js";
import "./component/launch-item.js";
import "./component/crew-item.js";
import "./component/list-container.js";
import { getCrews, getLaunches } from "./api.js";

const appBar = document.getElementById("app-bar");
const listContainer = document.getElementById("list-container");

const sortFunctionMap = {
  dateAsc: (a, b) => {
    if (a.date.isSame(b.date)) return 0;
    if (a.date.isBefore(b.date)) return -1;
    return 1;
  },
  dateDesc: (a, b) => sortFunctionMap.dateAsc(a, b) * -1,
  nameAsc: (a, b) => a.name.localeCompare(b.name),
  nameDesc: (a, b) => sortFunctionMap.nameAsc(a, b) * -1,
};

appBar.onConfigureSortRadio = () => {
  const items = {
    nameAsc: "Name (Ascending)",
    nameDesc: "Name (Descending)",
  };
  if (appBar.selectedTab == "launches") {
    items["dateAsc"] = "Date (Ascending)";
    items["dateDesc"] = "Date (Descending)";
  }
  return {
    items,
    selected: "nameAsc",
  };
};

appBar.configureTab(
  {
    launches: "Launches",
    crews: "Crews",
  },
  "launches"
);
const createFilterFunction = () => {
  const filter = appBar.searchBy.toLowerCase();
  if (filter.length == 0) return () => true;
  return (data) => {
    if (data.name.toLowerCase().indexOf(filter) >= 0) return true;
    if (data.state.toLowerCase().indexOf(filter) >= 0) return true;
    if (data.details && data.details.toLowerCase().indexOf(filter) >= 0)
      return true;
    if (data.agency && data.agency.toLowerCase().indexOf(filter) >= 0)
      return true;
    return false;
  };
};

const refresh = async () => {
  try {
    const sortFuncton = sortFunctionMap[appBar.sortBy];
    if (appBar.selectedTab == "launches") {
      const launches = await getLaunches();
      listContainer.items = launches
        .sort(sortFuncton)
        .filter(createFilterFunction())
        .map((launch) => {
          const element = document.createElement("launch-item");
          element.launch = launch;
          return element;
        });
    } else {
      const crews = await getCrews();
      listContainer.items = crews
        .sort(sortFuncton)
        .filter(createFilterFunction())
        .map((crew) => {
          const element = document.createElement("crew-item");
          element.crew = crew;
          return element;
        });
    }
  } catch (e) {
    listContainer.error = e.toString();
  }
};

document.addEventListener("DOMContentLoaded", refresh);
appBar.addEventListener("refresh", refresh);

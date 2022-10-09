import axios from "axios";
import dayjs from "dayjs";

const instance = axios.create({
  baseURL: "https://api.spacexdata.com/",
});

export const getLaunches = async () => {
  const response = await instance.get("v5/launches");
  return response.data.map((item) => ({
    image: item.links.patch.small,
    name: item.name,
    state: item.upcoming ? "Upcoming" : item.success ? "Success" : "Failed",
    date: dayjs(item.date_utc),
    details: item.details,
  }));
};

export const getCrews = async () => {
  const response = await instance.get("v4/crew");
  return response.data.map((item) => ({
    image: item.image,
    name: item.name,
    agency: item.agency,
    state: item.status[0].toUpperCase() + item.status.substring(1),
  }));
};

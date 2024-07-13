import React, { useEffect, useState } from "react";
import axios from "axios";
import DailyVisitsChart from "../SingleComponents/DailyVisitsChart";
import CityVisitsChart from "../SingleComponents/CityVisitsChart";
import CountryVisitsChart from "../SingleComponents/CountryVisitsChart";

const Dashboard = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await axios.get("https://localhost:4411/api/track");
        console.log(result.data.$values); // Veriyi kontrol etmek için
        setData(result.data.$values);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const processData = () => {
    const cityCount = {};
    const countryCount = {};
    const dailyCount = {};

    data.forEach((entry) => {
      // Şehir ve ülke sayacı
      if (cityCount[entry.city]) {
        cityCount[entry.city]++;
      } else {
        cityCount[entry.city] = 1;
      }

      if (countryCount[entry.country]) {
        countryCount[entry.country]++;
      } else {
        countryCount[entry.country] = 1;
      }

      // Günlük giriş sayısı
      const date = new Date(entry.timestamp).toLocaleDateString();
      if (dailyCount[date]) {
        dailyCount[date]++;
      } else {
        dailyCount[date] = 1;
      }
    });

    return { cityCount, countryCount, dailyCount };
  };

  const { cityCount, countryCount, dailyCount } = processData();

  return (
    <div className="page-content dark-theme">
      <h1>Yönetim Paneli</h1>
      <div>
        <h2>Günlük Ziyaretçi Sayısı</h2>
        <DailyVisitsChart data={dailyCount} />
      </div>
      <div>
        <h2>Ziyaretçi Şehri</h2>
        <CityVisitsChart data={cityCount} />
      </div>
      <div>
        <h2 className="mt-5">Ziyaretçi Ülke</h2>
        <CountryVisitsChart data={countryCount} />
      </div>
    </div>
  );
};

export default Dashboard;

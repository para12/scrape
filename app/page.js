"use client";
import styles from "./page.module.css";

import { collection, getDocs, query, where } from "firebase/firestore";
import fireStore from "../firebase/firestore";

import { useEffect, useState } from "react";

const today = new Date();

const formatting = (date) => {
  let day = date.getDate();
  if (day < 10) {
    day = `0${day}`;
  }
  let month = date.getMonth() + 1;
  if (month < 10) {
    month = `0${month}`;
  }
  let year = date.getFullYear();
  const formatted_date = `${year}.${month}.${day}.`;
  return formatted_date;
};

const previous_day = (date) => {
  let day = new Date(date);
  day.setDate(day.getDate() - 1);
  return formatting(day);
};

const next_day = (date) => {
  let day = new Date(date);
  day.setDate(day.getDate() + 1);
  return formatting(day);
};

const admin_names = [
  { admin: "기획재정부", eng: "moef" },
  { admin: "금융위원회", eng: "fsc" },
  { admin: "산업자원부", eng: "motie" },
  { admin: "환경부", eng: "me" },
  { admin: "고용노동부", eng: "moel" },
  { admin: "보건복지부", eng: "mohw" },
  { admin: "국토교통부", eng: "molit" },
];

export default function Home() {
  const [list, setList] = useState();
  const [date, setDate] = useState(formatting(today));
  useEffect(() => {
    getDocs(
      query(collection(fireStore, "press_release"), where("date", "==", date))
    ).then((results) => {
      let tempList = [];
      results.forEach((doc) => {
        const data = doc.data();
        tempList.push(data);
      });
      setList(tempList);
    });
  }, [date]);
  return (
    <main className={styles.main}>
      <div>
        <span onClick={(e) => setDate(next_day(date))}> next </span>
        {date}
        <span onClick={(e) => setDate(previous_day(date))}> previous </span>
      </div>
      <div>
        {
          list && list.length > 0 ? (
            <>
              {admin_names.map((ad) => {
                let filtered_list = list.filter((e) => e.admin == ad.eng);
                return (
                  <div key={ad.eng}>
                    {filtered_list.length > 0 && (
                      <div>
                        <div>{ad.admin}</div>
                        <>
                          {filtered_list.map((e) => (
                            <div
                              style={{
                                display: "flex",
                                justifyContent: "space-between",
                              }}
                              key={e.title}
                            >
                              <a href={e.href} target={"_blank"}>
                                {e.title}
                              </a>
                              <span>{e.depart}</span>
                            </div>
                          ))}
                        </>
                        <br />
                      </div>
                    )}
                  </div>
                );
              })}
            </>
          ) : (
            <div>none </div>
          )

          // list.map((e) => {
          //   return (
          //     <div>
          //       <a href={e.href}>{e.title}</a>
          //       <span>{e.date}</span>
          //       <span>{e.depart}</span>
          //     </div>
          //   );
          // })
        }
      </div>
    </main>
  );
}

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

const iosFormatting = (date) =>
  date.replaceAll(".", "-").slice(0, 10) + " 00:00:00";

const previous_day = (date) => {
  let day = new Date(iosFormatting(date));
  day.setDate(day.getDate() - 1);
  return formatting(day);
};

const next_day = (date) => {
  let day = new Date(iosFormatting(date));
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
  { admin: "개인정보보호위원회", eng: "pipc" },
  { admin: "해양수산부", eng: "mof" },
  { admin: "농축산식품부", eng: "mafra" },
  { admin: "중소벤처기업부", eng: "mss" },
  { admin: "행정안전부", eng: "mois" },
  { admin: "국회회의록", eng: "assembly" },
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
        // if (data.admin == "mafra") {
        //   console.log(data);
        // }
        tempList.push(data);
      });
      // console.log(
      //   "tempList",
      //   tempList.filter((a) => a.admin == "mafra")
      // );
      setList(tempList);
    });
  }, [date, setDate]);
  // console.log("date", date);
  // if (list) {
  //   console.log(
  //     "list",
  //     list.filter((a) => a.admin == "mafra")
  //   );
  // }
  return (
    <main className={styles.main}>
      <div
        style={{
          marginBottom: "30px",
        }}
      >
        {formatting(today) !== date && (
          <span onClick={() => setDate(next_day(date))}> {`<-`} </span>
        )}
        {date}
        <span onClick={() => setDate(previous_day(date))}> {`->`} </span>
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
                        <p
                          style={{
                            fontWeight: "800",
                            marginBottom: "10px",
                          }}
                        >
                          {ad.admin}
                        </p>
                        <div>
                          {filtered_list.map((e) => {
                            console.log(e.title);
                            return (
                              <div
                                style={{
                                  display: "flex",
                                  justifyContent: "space-between",
                                }}
                                key={e.title}
                              >
                                <a href={e.href} target={"_blank"}>
                                  {"\u2022 "}
                                  {e.title}
                                </a>
                                {/* <span>{e.depart}</span> */}
                              </div>
                            );
                          })}
                        </div>
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

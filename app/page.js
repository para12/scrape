"use client";
import Image from "next/image";
import styles from "./page.module.css";

import { collection, getDocs } from "firebase/firestore";
import fireStore from "../firebase/firestore";

import { useEffect, useState } from "react";

export default function Home() {
  const [list, setList] = useState();
  useEffect(() => {
    getDocs(collection(fireStore, "기획재정부")).then((results) => {
      let tempList = [];
      results.forEach((doc) => {
        const data = doc.data();
        tempList.push(data);
      });
      setList(tempList);
    });
  }, []);

  return (
    <main className={styles.main}>
      <div>
        [기획재정부]
        {list &&
          list.map((e) => {
            return (
              <div>
                <a href={e.href}>{e.title}</a>
              </div>
            );
          })}
      </div>
    </main>
  );
}
